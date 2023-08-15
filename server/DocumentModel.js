const { Schema, model } = require("mongoose");

const schema = new Schema({
  _id: String,
  data: Object,
});

const docModel = model("Document", schema);

module.exports = docModel;
