import mongoose, { Document, Schema } from 'mongoose';

// 1. TypeScript interface
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// 2. Define Schema
const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true },
  },
  { timestamps: true }
);

// 3. Avoid model overwrite errors in dev
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
