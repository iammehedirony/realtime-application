import { generateToken } from "../config/generateToken.js";
import TryCatch from "../config/TryCatch.js";
import { redisClient } from "../index.js";
import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import { User } from "../models/User.js";

export const loginUser = TryCatch(async (req, res) => {
    const { email } = req.body;

    const rateLimitKey = `login:ratelimit:${email}`;
    const rateLimit = await redisClient.get(rateLimitKey);
    if (rateLimit) {
        res.status(429).json({
            message:
                "Too may requests. Please wait before requesting a new login",
        });
        return;
    }

    await redisClient.set(rateLimitKey, "true", {
        EX: 60,
    });

    let user = await User.findOne({ email });

    if (!user) {
        res.status(404).json({
            message: "User not found. Please register first",
        });
        return;
    }

    const token = generateToken(user);

    res.json({
        message: "User Logged in successfully",
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
