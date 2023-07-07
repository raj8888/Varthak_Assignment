import express from 'express';
import dotenv from 'dotenv';
import { connection } from './config/db';
import userRoutes from './routes/user.route';
import bookRoutes from './routes/book.route';

dotenv.config();

const app = express();
app.use(express.json());


// Register and Login user routes
app.use('/users', userRoutes);

// Register book routes
app.use('/books', bookRoutes);


const port = process.env.PORT || 3000;

app.listen(port, async () => {
    try {
        await connection;
        console.log('Connected To The DB');
      } catch (error: any) {
        console.log(error.message);
      }
      console.log(`Port Is Listening On ${port}`);
});
