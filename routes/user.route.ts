import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

const userRouter = express.Router();

userRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const { name, email, roles, password } = req.body;
    
        // Check if user already exists with the provided email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already registered with this email' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user
        const user: IUser = new User({ name, email, roles, password: hashedPassword });
        let newUser=await user.save();
        if(newUser){
            res.status(201).json({ message: `${name} registered successfully`});
        }else{
            res.status(400).json({ message: 'Please Enter Valid Information' });
        }
        
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
});

userRouter.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists with the provided email
      const user: IUser | null = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare the provided password with the stored password using bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate a JSON Web Token (JWT) with user data and roles
      const token = jwt.sign({ id: user._id, roles: user.roles, name:user.name }, process.env.JWT_SECRET as string);
  
      res.status(200).json({ message: 'User login successful', token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

export default userRouter;
