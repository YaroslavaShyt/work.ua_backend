module.exports = {
  sendChatNotification: (io, chat, employerId) => {
    const room = chat._id;

    // Отримання id роботодавця та його сокета за допомогою userId
    const employerSocketId = io.sockets.adapter.rooms
      .get(employerId)
      ?.values()
      .next().value;
    console.log(employerId);
    if (employerSocketId) {
      // Відправлення сповіщення конкретному роботодавцеві
      io.to(employerSocketId).emit("chat_created", {
        chatId: chat._id,
        userId: employerId,
      });
    }
  },
};
