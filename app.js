



 
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import bookingRouter from './routes/booking.routes.js';
import nextRouter from './routes/next.routes.js';
import homepg from './routes/Home.routes.js';
import contactRoutes from './routes/contact.routes.js';
import contactHome from './routes/contacthome.routes.js';
import stayroom from './routes/stayview.routes.js';
import adminRouter from './routes/adminlog.routes.js'; 
import dotenv from 'dotenv';
import connectToDB from './config/db.js';
import uploadRouter from './routes/upload.routes.js';


dotenv.config();

// Database connection
connectToDB();

const app = express();   

// View engine setup
app.set('view engine', 'ejs');

// Middleware
app.use(cookieParser());
app.use(session({
    secret: 'yourSecretKey',  // Change this to a strong secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // HTTPS-only cookies in production
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/', uploadRouter);
app.use('/book', bookingRouter);
app.use('/user', userRouter);
app.use(nextRouter);
app.use('/', contactRoutes);
app.use('/', contactHome);
app.use('/', homepg);
app.use('/', stayroom);
app.use('/admin', adminRouter);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
