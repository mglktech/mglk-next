import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({}, { timestamps: true, strict: false });

export default models.User || model('User', UserSchema);
