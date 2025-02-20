const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { checkAndCreateAdmin } = require('./utils/adminSetup');
const swaggerDocs = require('./utils/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
swaggerDocs(app); // Add Swagger documentation
app.use(errorHandler);

const startServer = async () => {
    try {
      // Check and create admin if necessary
      await checkAndCreateAdmin();
  
      // Start the server after admin setup is complete
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1); // Exit the process if something goes wrong
    }
};
  
startServer();