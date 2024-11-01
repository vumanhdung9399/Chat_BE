const http = require("http");
const WebSocket = require("ws");
const { Op } = require("sequelize");
const { User, UserContact, Contact } = require("@/models");
const redisClient = require("@/config/redis");

module.exports = async function (app) {
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });

  // Danh sách kết nối WebSocket
  const connectedUsers = new Map(); // Dùng để lưu userId và WebSocket

  wss.on("connection", (ws) => {
    // Lắng nghe sự kiện 'identify' khi client gửi userId
    ws.on("message", async (message) => {
      const data = JSON.parse(message);

      if (data.type === "identify") {
        const userId = data.userId;

        ws.userId = userId;
        connectedUsers.set(userId, ws); // Lưu WebSocket vào danh sách kết nối

        // Thêm user vào danh sách online trên Redis
        await redisClient.sadd("onlineUsers", userId);

        // Gửi danh sách contact online cho user
        const onlineContacts = await getOnlineContactsForUser(userId);

        ws.send(
          JSON.stringify({ type: "contactsStatus", contacts: onlineContacts })
        );

        // Thông báo trạng thái online của user cho các contact của họ
        notifyContactsStatus(userId, true);
      }

      // Ngắt kết nối và xóa user khỏi danh sách online
      ws.on("close", async () => {
        if (ws.userId) {
          await redisClient.srem("onlineUsers", ws.userId);
          connectedUsers.delete(ws.userId);
          notifyContactsStatus(ws.userId, false);
        }
      });
    });
  });

  // Hàm lấy danh sách contact online của user
  async function getOnlineContactsForUser(userId) {
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

  // Hàm lấy danh sách contact của user từ cơ sở dữ liệu
  async function getUserContacts(userId) {
    const filterContact = await UserContact.findAll({
      where: {
        users_id: userId,
      },
    });

    if (!filterContact.length) {
      let listContact = await Contact.findAll({
        attributes: ["id"],
        where: {
          users_id: userId,
        },
      });
      const listContactJSON = listContact.map((item) => {
        return item.toJSON().id;
      });
      const users = await UserContact.findAll({
        attributes: ["users_id", "contact_id"],
        where: {
          contact_id: {
            [Op.in]: listContactJSON,
          },
        },
      });

      return users.map((item) => {
        return item.toJSON().users_id;
      });
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

  // Gửi trạng thái online/offline đến các contact của user
  async function notifyContactsStatus(userId, isOnline) {
    const contacts = await getUserContacts(userId);

    contacts.forEach((contactId) => {
      const contactSocket = connectedUsers.get(contactId);
      if (contactSocket) {
        contactSocket.send(
          JSON.stringify({
            type: "contactStatusChange",
            contactId: userId,
            isOnline,
          })
        );
      }
    });
  }

  // Bắt đầu server
  server.listen(8080, () => {
    console.log("Server is listening on port 8080");
  });
};
