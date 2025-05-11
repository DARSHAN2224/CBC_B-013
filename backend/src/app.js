import express from 'express';
import cors  from 'cors';
import cookieParser from 'cookie-parser';
import path  from 'path';

// import { handleCsrfErrors } from './middlewares/csrfMiddleware.js';
const app = express();
app.use(cors({ 
      origin: 'http://localhost:5173', // Replace with your front-end origin
      credentials: true, // Allows cookies to be sent
    }));
app.use(cookieParser());
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(express.static('public'))
// Middleware for parsing cookies into req.cookies
const __dirname = path.resolve();
// import doctorRouter from './routes/sellerRoutes.js';
import userRouter from './routes/userRoutes.js';

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
//routes declerations 
app.use("/api/users", userRouter);


export { app };

