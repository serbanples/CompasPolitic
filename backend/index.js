import connectDB from './src/config/database.js';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import initializePassport from './src/config/passportConfig.js';
import userRoutes from './src/routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;
const corsOptions = {
    origin: 'http://localhost:5173', // or your frontend origin
    credentials: true, // to allow cookies
  };
  
  app.use(cors(corsOptions));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'cheie',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            secure: false,
            httpOnly: true   
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

app.use('/public', express.static('public'));

// Routes
app.use('/api/users', userRoutes);

const startServer = async () => {
    await connectDB();  // Conectarea la baza de date
    app.listen(PORT, () => console.log(`Serverul rulează pe portul ${PORT}`));
  };
startServer();
