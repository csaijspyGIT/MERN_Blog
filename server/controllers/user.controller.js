import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";

export const getUser = (req, res) => {
    res.status(200).send("Test is working");
}

export const updateUser = async(req, res, next) => {
    const user = req.user;
    console.log(user.id);
    const { id } = req.params;
    console.log(id);

    if (user.id !== id) {
        return next(errorHandler(403, "You are not allowed to update this user"));
    }

    const { password, username, email, profilePicture } = req.body;
    let hashedPassword;

    if (password) {
        if (password.length < 6) {
            return next(errorHandler(400, "The length of the password must be greater than 6"));
        }
        hashedPassword = bcryptjs.hashSync(password, 10);
    }

    if (username) {
        if (username.length < 7 || username.length > 20) {
            return next(errorHandler(400, "Username must have between 7 and 20 characters"));
        }
        if (username.includes(' ')) {
            return next(errorHandler(400, "Username cannot contain space"));
        }
        if (!username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, "Username can only containe letters and numbers"));
        }
        if (username !== username.toLowerCase()) {
            return next(errorHandler(400, "Username must be in lowercaser letters"));
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(id, {
                $set: {
                    username: username,
                    email: email,
                    profilePicture: profilePicture,
                    password:hashedPassword
                }
            }, { new: true });
            const { password, ...rest } = updatedUser._doc;
            res.status(200).json(rest);
        } catch(err) {
            next(err);
        }

    }

    
}