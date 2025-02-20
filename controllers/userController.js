const prisma = require('../config/db');
const { userSchema } = require('../utils/validators');

const createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, email, role } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email, role } });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
};

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });
  res.json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: { id: true, name: true, email: true, role: true },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };