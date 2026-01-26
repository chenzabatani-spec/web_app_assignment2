import mongoose from 'mongoose';

export interface IUser {
    email: string;
    password?: string;
    refreshTokens: string[];
}

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshTokens: {
        type: [String],
        default: []
    }
});

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
