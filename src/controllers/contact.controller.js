// const User = require("@/models/user");
const { User, UserContact, Contact, sequelize } = require("@/models");
const { error404, success200, error500, error400 } = require("@/config/sendRes");
const { FRIEND } = require("@/helpers/constants");
const redisClient = require("@/config/redis");
const { Op } = require("sequelize");

const ListContact = async (req, res) => {
  try {
    const onlines = await getOnlineContactsForUser(req.user.id);
    
    const userContact = await getUserContacts(req.user.id);
    
    let userContactJSON = userContact.map((item) => {
      let online = onlines.find((e) => e.id === item.id);
      
      return {...item, ...{isOnline: !!online}}
    })

    res.status(200).json(success200(userContactJSON, "Lay danh sach thanh cong"));
  } catch (err) {
    console.log(err);
    res.status(500).json(error500());
  }
};

const ListContactWaitConf = async (req, res) => {
  try {
    const userContact = await getUserContactsWaitConf(req.user.id);

    res.status(200).json(success200(userContact, "Lay danh sach thanh cong"));
  } catch (err) {
    console.log(err);
    res.status(500).json(error500());
  }
};

const ListContactSend = async (req, res) => {
  try {
    const userContact = await getUserContactsSend(req.user.id);

    res.status(200).json(success200(userContact, "Lay danh sach thanh cong"));
  } catch (err) {
    console.log(err);
    res.status(500).json(error500());
  }
};

const AddContact = async (req, res) => {
  const { users_id, email } = req.body;
  const transaction = await sequelize.transaction();
  const findUser = await User.findOne({
    where: {
      [Op.or]: [
        { id: users_id },
        { email: email }
      ]
    },
    transaction,
  });
  if (!findUser) {
    return res.status(400).json({ message: "Khong tim thay user" });
  }

  try {
    let contact = await Contact.findOne({
      where: {
        email: findUser.email,
      },
      transaction,
    });
    if (!contact) {
      contact = await Contact.create(
        {
          users_id: findUser.id,
          fullName: findUser.fullName,
          email: findUser.email,
          phone: findUser.phone,
          avatar: findUser.avatar
        },
        { transaction }
      );
    }

    const findUserContact = await UserContact.findOne({
      where: {
        [Op.or]: [
          {
            users_id: req.user.id,
            users_id_two: findUser.id
          },
          {
            users_id: findUser.id,
            users_id_two: req.user.id,
          }
        ]
      }, transaction
    })
    if (!findUserContact) {
      await UserContact.create({
        users_id: req.user.id,
        users_id_two: findUser.id,
        contact_id: contact.id,
        fullName: contact.fullName,
        friend: FRIEND.WAIT_CONF
      }, {transaction})
      await transaction.commit();
      res.status(200).json(success200(contact, "Them lien he thanh cong"));
    } else {
      res.status(400).json(error400("Lien he da ton tai"));
    }
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    res.status(500).json(error500("Loi he thong, vui long thu lai"));
  }
};
const DeleteContact = async (req, res) => {
  const { users_id } = req.body;
  const transaction = await sequelize.transaction();
  const findUserContact = await UserContact.findOne({
    where: {
      [Op.or]: [
        {
          users_id: req.user.id,
          users_id_two: users_id,
        },
        {
          users_id: users_id,
          users_id_two: req.user.id,
        }
      ]
    },
    transaction,
  });

  if (!findUserContact) {
    res.status(404).json(error404("Khong tim thay user"));
  }

  try {
    await findUserContact.destroy({
      transaction,
    });
    await Contact.destroy({
      where: {
        id: findUserContact.contact_id,
      },
      transaction,
    });
    await transaction.commit();
    res.status(200).json(success200("Xoa lien he thanh cong"));
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    res.status(500).json(error500("He thong loi, vui long thu lai"));
  }
};

const ApproveContact = async (req, res) => {
  const { contact_id } = req.body;
  try {
    await UserContact.update(
      { friend: 'friend' },
      {
        where: {
          id: contact_id
        }
      }
    )

    res.status(200).json(success200());
  } catch (err) {
    console.log(err);
  }
}

const getOnlineContactsForUser = async (userId) => {
  const contacts = await getUserContacts(userId);

  const onlineContacts = [];
  for (let i = 0; i < contacts.length; i++) {
    await redisClient.sismember(
      "onlineUsers",
      contacts[i].id,
      (err, isMember) => {
        if (err) {
          console.log(err);
        } else if (isMember) {
          onlineContacts.push(contacts[i]);
        }
      }
    );
  }
  return onlineContacts;
}

const getUserContacts = async (userId) => {
  const [results] = await sequelize.query(
    `SELECT u.id, u.username, u.email, u.phone, u.fullName, u.avatar, uc.id as contact_id
    FROM users u, user_contact uc 
    WHERE 
    CASE 
    WHEN uc.users_id = ${userId}
    THEN uc.users_id_two = u.id
    WHEN uc.users_id_two = ${userId}
    THEN uc.users_id = u.id 
    END
    AND 
    uc.friend = "friend"
    `
  )
  
  if (!results) {
    return [];
  }
  return results;
}

const getUserContactsWaitConf = async (userId) => {
  const [results] = await sequelize.query(
    `SELECT u.id, u.username, u.email, u.phone, u.fullName, u.avatar, uc.id as contact_id
    FROM users u, user_contact uc 
    WHERE 
    CASE 
    WHEN uc.users_id = u.id
    THEN uc.users_id_two = ${userId}
    END
    AND 
    uc.friend = "wait_conf"
    `
  )
  
  if (!results) {
    return [];
  }
  return results;
}

const getUserContactsSend = async (userId) => {
  const [results] = await sequelize.query(
    `SELECT u.id, u.username, u.email, u.phone, u.fullName, u.avatar, uc.id as contact_id
    FROM users u, user_contact uc 
    WHERE 
    CASE 
    WHEN uc.users_id = ${userId}
    THEN uc.users_id_two = u.id
    END
    AND 
    uc.friend = "wait_conf"
    `
  )
  
  if (!results) {
    return [];
  }
  return results;
}

module.exports = {
  ListContact,
  ListContactWaitConf,
  ListContactSend,
  AddContact,
  DeleteContact,
  getUserContacts,
  getOnlineContactsForUser,
  ApproveContact
};
