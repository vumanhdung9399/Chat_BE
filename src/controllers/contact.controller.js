// const User = require("@/models/user");
const { User, UserContact, Contact, sequelize } = require("@/models");
const { error404, success200, error500 } = require("@/config/sendRes");
const { FRIEND } = require("@/helpers/constants");
const redisClient = require("@/config/redis");

const ListContact = async (req, res) => {
  try {
    const onlines = await getOnlineContactsForUser(req.user.id);
    
    const userContact = await User.findByPk(req.user.id, {
      attributes: ["id", "username"],
      include: [
        {
          model: Contact,
          attributes: ["id", "users_id", "fullName", "phone", "email", "avatar"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    let userContactJSON = userContact.toJSON().Contacts.map((item) => {
      let online = onlines.find((e) => e === item.users_id);
      
      return {...item, ...{isOnline: !!online}}
    })

    res.status(200).json(success200(userContactJSON, "Lay danh sach thanh cong"));
  } catch (err) {
    console.log(err);
    res.status(500).json(error500());
  }
};
const AddContact = async (req, res) => {
  const { users_id } = req.body;
  const transaction = await sequelize.transaction();
  const findUser = await User.findOne({
    where: {
      id: users_id,
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
        users_id: req.user.id,
        contact_id: contact.id,
      }, transaction
    })

    if (!findUserContact) {
      await UserContact.create({
        users_id: req.user.id,
        contact_id: contact.id,
        fullName: contact.fullName,
        friend: FRIEND.WAIT_CONF
      }, {transaction})
    }
    await transaction.commit();
    res.status(200).json(success200(contact, "Them lien he thanh cong"));
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    res.status(500).json(error500("Loi he thong, vui long thu lai"));
  }
};
const DeleteContact = async (req, res) => {
  const { contact_id } = req.body;
  const transaction = await sequelize.transaction();
  const findUserContact = await UserContact.findOne({
    where: {
      users_id: req.user.id,
      contact_id: contact_id,
    },
    transaction,
  });

  if (!findUserContact) {
    res.status(404).json(error404("Khong tim thay user"));
  }

  try {
    await UserContact.destroy({
      where: {
        users_id: req.user.id,
        contact_id: contact_id,
      },
      transaction,
    });
    await Contact.destroy({
      where: {
        id: contact_id,
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

const getOnlineContactsForUser = async (userId) => {
  const contacts = await getUserContacts(userId);

  const onlineContacts = [];
  for (let i = 0; i < contacts.length; i++) {
    await redisClient.sismember(
      "onlineUsers",
      contacts[i],
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
  const filterContact = await UserContact.findAll({
    where: {
      users_id: userId,
    },
  });

  if (!filterContact) {
    return [];
  }
  let arrUser = [];
  for (let i = 0; i < filterContact.length; i++) {
    const findContact = await Contact.findOne({
      where: {
        id: filterContact[i].contact_id,
      },
    });

    if (findContact) {
      const findUser = await User.findOne({
        where: {
          email: findContact.email,
        },
      });
      arrUser.push(findUser.id);
    }
  }
  return arrUser;
}

module.exports = {
  ListContact,
  AddContact,
  DeleteContact,
};
