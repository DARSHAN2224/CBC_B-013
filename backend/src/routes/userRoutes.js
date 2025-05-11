import { Router } from 'express';
const userRouter =  Router();
import { loginUser, logoutUser,
     refreshAccessToken,
      registerUser,verifyEmail,
      forgotPassword,
      resetPassword,
      updateEditProfile, 
      loadHome,sendverification,
      checkAuth,contactUs, 
      predictHandler,
    storeAnswers,
    generateSuggestions,
    recommendPersonalHabits} from '../controllers/userController.js';
import {upload} from "../middlewares/multerMiddleware.js"
import {verifyJWT,onlyPatientAccess} from '../middlewares/authMiddleware.js';
import { registerValidator,loginValidator,resetPasswordValidator ,forgetPasswordValidator,updateUserValidator} from '../utils/validator.js'


userRouter.route("/signup").post(registerValidator,registerUser);
userRouter.route("/login").post(loginValidator,loginUser);
userRouter.route("/logout").post(verifyJWT,logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);
userRouter.route('/verify-email').post(verifyEmail);
userRouter.route('/verify').post(forgetPasswordValidator,sendverification);
userRouter.route('/forgot-password').post(forgetPasswordValidator,forgotPassword);
userRouter.route('/reset-password/:token').post(resetPasswordValidator,resetPassword);

userRouter.get("/check-auth",verifyJWT,checkAuth)
// userRouter.get("/viewProfile",verifyJWT,viewProfile)
// userRouter.get("/edit-profile",verifyJWT,loadEditProfile)
userRouter.post("/update-profile",verifyJWT, upload.single('image'),updateUserValidator,updateEditProfile)
// userRouter.post("/update-patientProblem",verifyJWT, upload.single('image'),PatientProblemsUpdate)
userRouter.post("/contactus",verifyJWT,contactUs)

userRouter.get('/home', verifyJWT,onlyPatientAccess,loadHome);
// userRouter.get("/search",verifyJWT,searchDoctor)
// userRouter.get('/patients',verifyJWT, getPatientsByDoctor);

// Routes for mental health prediction system
userRouter.post('/predict', verifyJWT, predictHandler);
userRouter.post('/store-answers', verifyJWT, storeAnswers);
userRouter.post('/generate-suggestions', verifyJWT, generateSuggestions);
userRouter.post('/recommend-personal-habits', verifyJWT, recommendPersonalHabits);
export default userRouter;

