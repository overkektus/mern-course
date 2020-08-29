import { Schema, Types, model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  // links: 
}

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // links: [{ type: Types.ObjectId, ref: 'Link' }],
});

const UserModel = model<IUser>('User', schema);

export { UserModel, IUser };
