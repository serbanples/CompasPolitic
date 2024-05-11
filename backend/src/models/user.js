import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    interested: {type: Array, required: false}
});

const User = mongoose.model('User', userSchema);

export default User;