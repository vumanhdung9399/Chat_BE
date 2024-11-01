const { Contact } = require("@/models");
const userContacts = new Map();
const indentify = async (socket) => {
  socket.userId = userId;
  await redisClient.sAdd("onlineUsers", userId); // Thêm user vào danh sách online trong Redis

  // Lấy danh sách contact của user từ cơ sở dữ liệu
  const contacts = await Contact.findAll({ where: { userId } });
  userContacts.set(
    userId,
    contacts.map((contact) => contact.contactId)
  );

  // Phát sự kiện online đến các contact
  userContacts.get(userId).forEach((contactId) => {
    const contactSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => s.userId === contactId
    );
    if (contactSocket) {
      contactSocket.emit("contactStatusChange", { userId, isOnline: true });
    }
  });
};

const disconnectContact = async (socket) => {
  if (!socket.userId) return;

  await redisClient.sRem("onlineUsers", socket.userId); // Xóa user khỏi danh sách online trong Redis

  // Phát sự kiện offline đến các contact
  userContacts.get(socket.userId).forEach((contactId) => {
    const contactSocket = Array.from(io.sockets.sockets.values()).find(
      (s) => s.userId === contactId
    );
    if (contactSocket) {
      contactSocket.emit("contactStatusChange", {
        userId: socket.userId,
        isOnline: false,
      });
    }
  });
  userContacts.delete(socket.userId);
};

module.exports = {
  indentify,
  disconnectContact,
};
