const { Server } = require("socket.io");
const Chat = require("./models/chat.model");

function setupWebSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("mensaje", (data) => {
      try {
        Chat.create({
          idCell: data.idCell,
          idUser: data.idUser,
          nameUser: data.nameUser,
          message: data.message,
          date: data.date,
          typeMessage: data.typeMessage,
        })
          .then((chat) => {
            //quiero enviar una alerta a todos los usuarios que esten en la sala
            io.emit("mensaje-confirmado", chat);

            console.log("Mensaje nuevo enviado a la sala desde server socket:", data.idCell);
          })
          .catch((err) => {
            console.error(
              "Error al guardar el mensaje en la base de datos:",
              err
            );
            socket.emit("mensaje-error", {
              error: "Error al guardar el mensaje en la base de datos",
            });
          });
      } catch (error) {
        console.error("Error al procesar el mensaje:", error);
        // En caso de un error en el procesamiento del mensaje, emite una respuesta de error al cliente
        socket.emit("mensaje-error", {
          error: "Error en el procesamiento del mensaje",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });
  });
}

module.exports = setupWebSocketServer;
