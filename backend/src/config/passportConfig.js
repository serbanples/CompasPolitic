
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user.js';
import passport from 'passport';

export default function initializePassport(passport) {
    console.log('passport initialized');
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
            try {
            
                const isEmail = username.includes('@');
                const query = isEmail ? { email: username } : { username: username };

                const user = await User.findOne(query);
                if (!user) {
                    return done(null, false, { message: 'No user found with that email or username' });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {

                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            } catch (err) {
                console.log(err);
            }
            
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);  // Assuming `User` is your Mongoose model
          //  console.log(user); 
            done(null, user);  // `user` will be attached to `req.user` in routes
        } catch (err) {
            done(err);  // Pass any errors to Passport
        }
    });
    
 
      
    

}