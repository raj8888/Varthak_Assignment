import mongoose, { Document, Schema } from 'mongoose';

interface IBook extends Document {
  userID: mongoose.Types.ObjectId;
  userName: string;
  bookName: string;
  publishingCompany: string;
  aboutBook: string;
  genre: string;
  createdAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    bookName: { type: String, required: true },
    publishingCompany: { type: String, required: true },
    aboutBook: { type: String, required: true },
    genre: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model<IBook>('Book', bookSchema);
