const mongoose = require('mongoose');
const TransferSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  recipient: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Transfer', TransferSchema);