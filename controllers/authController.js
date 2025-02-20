const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const { signupSchema, loginSchema } = require('../utils/validators');

const signup = async (req,res) => {
    const { error } = signupSchema.validate(req.body);
    if(error) return res.status(400).json({error:error.details[0].message});

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        res.status(201).json({ id: user.id, name: user.name, email: user.email });
    }catch (err) {
        res.status(400).json({ error: 'Email already exists' });
        console.log(err);
    }
}

const login = async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
  
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
  
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  };
  
  module.exports = { signup, login };