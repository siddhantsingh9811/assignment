const { PrismaClient } = require('@prisma/client');
const readline = require('readline');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const checkAndCreateAdmin = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if any admin exists
      const admin = await prisma.user.findFirst({
        where: { role: 'ADMIN' },
      });

      if (!admin) {
        console.log('No admin account found. Please create an admin account.');

        rl.question('Enter email: ', async (email) => {
          rl.question('Enter password: ', async (password) => {
            const hashedPassword = await bcrypt.hash(password, 10);

            await prisma.user.create({
              data: {
                name: 'Admin',
                email,
                password: hashedPassword,
                role: 'ADMIN',
              },
            });

            console.log('Admin account created successfully!');
            rl.close();
            await prisma.$disconnect(); 
            resolve(); 
          });
        });
      } else {
        console.log('Admin account already exists.');
        rl.close();
        await prisma.$disconnect(); 
        resolve(); 
      }
    } catch (error) {
      console.error('Error checking or creating admin account:', error);
      rl.close();
      await prisma.$disconnect(); // Disconnect Prisma client
      reject(error); // Reject the promise if there's an error
    }
  });
};

module.exports = { checkAndCreateAdmin };