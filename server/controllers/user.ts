import { generateToken } from "../config/generateToken.js";
import TryCatch from "../config/TryCatch.js";
import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import { User } from "../models/User.js";

export const loginUser = TryCatch(async (req, res) => {
    const { email, name } = req.body;

    if (!email) {
        res.status(400).json({
            message: "Email is required",
        });
        return;
    }

    let user = await User.findOne({ email });

    if (!user) {
        if (!name) {
            res.status(400).json({
                message: "Name is required for new users",
            });
            return;
        }
        user = await User.create({ email, name });
    }

    const token = generateToken(user);

    res.json({
        message: "User logged in successfully",
        user,
        token,
    });
});

export const myProfile = TryCatch(async (req: AuthenticatedRequest, res) => {
    const user = req.user;

    res.json(user);
});

export const updateName = TryCatch(async (req: AuthenticatedRequest, res) => {
    const user = await User.findById(req.user?._id);

    if (!user) {
        res.status(404).json({
            message: "Please login",
        });
        return;
    }

    user.name = req.body.name;

    await user.save();

    const token = generateToken(user);

    res.json({
        message: "User Updated",
        user,
        token,
    });
});

export const getAllUsers = TryCatch(async (req: AuthenticatedRequest, res) => {
    const users = await User.find();

    res.json(users);
});

export const getAUser = TryCatch(async (req, res) => {
    const user = await User.findById(req.params.id);

    res.json(user);
});
