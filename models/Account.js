import { Schema, models, model } from 'mongoose';

const AccountSchema = new Schema({}, { timestamps: true, strict: false });

export default models.Account || model('Account', AccountSchema);
