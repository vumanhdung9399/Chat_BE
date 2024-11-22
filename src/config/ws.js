const http = require("http");
const WebSocket = require("ws");
const { Op } = require("sequelize");
const { User, UserContact, Contact } = require("@/models");
const { getUserContacts, getOnlineContactsForUser } = require("@/controllers/contact.controller");
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

  // Gửi trạng thái online/offline đến các contact của user
  async function notifyContactsStatus(userId, isOnline) {
    const contacts = await getUserContacts(userId);
    
    contacts.forEach((contact) => {
      const contactSocket = connectedUsers.get(contact.id);
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
