import express from 'express';
import passport from 'passport';
import { signupUser, loginUser, logoutUser, currentUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/sign-up', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/current-user', currentUser);
// router.patch('/update-user', passport.authenticate('local', { session: false }), updateUser);

export default router;