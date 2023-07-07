import mongoose, { Document, Schema } from 'mongoose';

enum UserRole {
  CREATOR = 'CREATOR',
  VIEWER = 'VIEWER',
  VIEW_ALL = 'VIEW_ALL',
}

export interface IUser extends Document {
  name: string;
  email: string;
  roles: UserRole[];
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roles: [{ type: String, enum: Object.values(UserRole), required: true }],
    password: { type: String, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<IUser>('User', userSchema);
