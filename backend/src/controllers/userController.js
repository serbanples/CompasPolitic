import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import passport from 'passport';

export const signupUser = async (req, res) => {
    
    try {
        const { email, password, username } = req.body;
        console.log(req.body);
        if(!(email && password && username)) {
            res.status(400).send("All input is required");
        }

        const userExists = await User.findOne({ email });
        if(userExists) {
            res.status(409).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, username });

        await newUser.save();
        const userResponse = { ...newUser.toObject() };
        delete userResponse.password;

        res.status(201).send(userResponse);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

export const loginUser = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send(info.message);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).send("Successfully authenticated");
        });
    })(req, res, next);
}

export const logoutUser = (req, res) => {
    req.logout();
    if(err) {
        return res.status(500).send("Internal server error");
    }
    res.status(200).send("Logged out successfully");
}

export const currentUser = (req, res) => {
    if(req.isAuthenticated()) {
        return res.status(200).send(req.user);
    }
    res.status(401).send("Not authenticated");
}

        