import express, { Request, Response } from 'express';
import authenticationMiddleware from '../middlewares/authentication.middleware';
import authorizationMiddleware from '../middlewares/authorization.middleware';
import Book from '../models/book.model'; // Import the Book type
import loggerMiddleware from '../middlewares/logger.middleware'; // Import the logger middleware

const router = express.Router();




// Apply authentication middleware to all routes in this file
router.use(authenticationMiddleware);

router.use(loggerMiddleware);

// Create a book (Authorization required: 'CREATOR' role)
router.post('/', authorizationMiddleware(['CREATOR']), async (req: Request, res: Response) => {
  try {
    const { userID, userName, bookName, publishingCompany, aboutBook, genre } = req.body;

    // Create a new book
    const book = new Book({ userID, userName, bookName, publishingCompany, aboutBook, genre });

    // Set the created date
    book.createdAt = new Date();

    // Save the book
    await book.save();

    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get books based on user role (Authorization required)
router.get('/', async (req: Request, res: Response) => {
    try {
      const userRoles = req.body.userRoles;
      const { old, new: isNew } = req.query;
      
      let books; // Update the type of books to IBook[]
  
      if (old === '1') {
        if (userRoles.includes('VIEW_ALL') ) {
          // Retrieve all books created 10 minutes ago and earlier
          const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
          books = await Book.find({ createdAt: { $lte: tenMinutesAgo } });
        } else if (userRoles.includes('VIEWER') ) {
          // Retrieve books created by the user 10 minutes ago and earlier
          const userID = req.body.userID;
          const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
          books = await Book.find({ userID: userID, createdAt: { $lte: tenMinutesAgo } });
        }else if(userRoles.includes('CREATOR')){
        // Retrieve books created by the user 10 minutes ago and earlier
        const userID = req.body.userID;
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        books = await Book.find({ userID: userID, createdAt: { $lte: tenMinutesAgo } });
        }
      } else if (isNew === '1') {
        if (userRoles.includes('VIEW_ALL')) {
          // Retrieve all books created less than 10 minutes ago
          const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
          books = await Book.find({ createdAt: { $gt: tenMinutesAgo } });
        } else if (userRoles.includes('VIEWER')) {
          // Retrieve books created by the user less than 10 minutes ago
          const userID = req.body.userID;
          const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
          books = await Book.find({ userID: userID, createdAt: { $gt: tenMinutesAgo } });
        }else if(userRoles.includes('CREATOR')){
           // Retrieve books created by the user less than 10 minutes ago
          const userID = req.body.userID;
          const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
          books = await Book.find({ userID: userID, createdAt: { $gt: tenMinutesAgo } });
        }
      } else {
        // No query parameter, retrieve books based on user roles
        if (userRoles.includes('CREATOR')) {
          // If user has 'CREATOR' role, retrieve books created by them
          const userID = req.body.userID;
          books = await Book.find({ userID: userID });
        } else if (userRoles.includes('VIEWER')) {
          // If user has 'VIEWER' role, retrieve books created by them
          const userID = req.body.userID;
          books = await Book.find({ userID: userID });
        } else if (userRoles.includes('VIEW_ALL')) {
          // If user has 'VIEW_ALL' role, retrieve all books
          books = await Book.find();
        } else {
          // User has no valid role for book retrieval
          return res.status(403).json({ message: 'Authorization failed. User does not have the required role' });
        }
      }
      
      res.status(201).json({ message:"Here are your books.",books });
    } catch (error) {
      console.error('Error retrieving books:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

export default router;
