require("dotenv").config();
const Document = require("./DocumentModel");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const { data } = await findOrCreateId(documentId);
    socket.join(documentId); //joining rooms
    socket.emit("load-document", data); //giving back data to client

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

const defaultVal = "";
async function findOrCreateId(id) {
  if (id == null || id == undefined) return;

  const document = await Document.findById(id);
  if (document) return document;
  else {
    return await Document.create({ _id: id, data: defaultVal });
  }
}
