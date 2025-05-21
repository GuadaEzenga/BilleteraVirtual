const express = require('express');
const router = express.Router();
const Transfer = require('../models/Transfer');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const transfers = await Transfer.find({ userId: req.user.id });
  res.json(transfers);
});

router.post('/', auth, async (req, res) => {
  const { amount, recipient } = req.body;
  if (amount <= 0) return res.status(400).json({ error: 'Monto inválido' });
  const recipientUser = await User.findOne({ username: recipient });
  if (!recipientUser) return res.status(400).json({ error: 'Destinatario no encontrado' });
  const transfer = new Transfer({ userId: req.user.id, amount, recipient });
  await transfer.save();
  res.json(transfer);
});

router.get('/:id', auth, async (req, res) => {
  const transfer = await Transfer.findOne({ _id: req.params.id, userId: req.user.id });
  if (!transfer) return res.status(404).json({ error: 'Transferencia no encontrada' });
  res.json(transfer);
});

module.exports = router;