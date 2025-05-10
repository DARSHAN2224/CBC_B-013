import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import ProfilePage from "./pages/Profile"
import { Navigate, Route, replace, Routes } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner"
// import DashboardPage from "./pages/DashboardPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ForgotPasswordPagePatient from "./pages/ForgotPasswordPagePatient"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import EmailVerificationPagePatient from "./pages/EmailVerificationPagePatient"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import ResetPasswordPagePatient from "./pages/ResetPasswordPage"
import SendEmailVerification from "./pages/SendEmailVerification"
import SendEmailVerificationPatient from "./pages/SendEmailVerificationPatient"
import SignupPatient from "./pages/SignupPatient"
import LoginPatient from "./pages/LoginPatient"
import HomePagePatient from "./pages/PatientHome"
import ProfilePagePatient from "./pages/ProfilePagePatient"
import ContactUsPagePatient from "./pages/ContactUsPagePatient"

import PatientDetails from "./pages/PatientHistory"
const ProtectedRoute = ({ children }) => {

  const { isAuthenticated, user } = useAuthStore();
  console.log(user);

  if (!isAuthenticated||user.role != 1) {
    toast.error("you do not have access")
    alert("error")
    return <Navigate to='/doctor/login' replace />;
  }

  if (!user.is_verified && !user.verificationToken) {
    toast.error("Verify the email first!");

    return <Navigate to='/doctor/verify' replace />;
  }


  if (!user.is_verified) {

    return <Navigate to='/doctor/verify-email' replace />;
  }


  return children;
};


const ProtectedRoutePatient = ({ children }) => {

  const { isAuthenticated, user } = useAuthStore();
  console.log(user);

  if (!isAuthenticated || user.role != 0) {
    toast.error("you do not have access")
    return <Navigate to='/login' replace />;
  }

  if (!user.is_verified && !user.verificationToken) {
    toast.error("Verify the email first!");

    return <Navigate to='/verify' replace />;
  }


  if (!user.is_verified) {

    return <Navigate to='/verify-email' replace />;
  }


  return children;
};




// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();


  if (isAuthenticated && user.is_verified && user.role == 1) {
    return <Navigate to='/doctor' replace />;
  }

  return children;
};



const RedirectAuthenticatedUserPatient = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();


  if (isAuthenticated && user.is_verified && user.role == 0) {
    return <Navigate to='/' replace />;
  }

  return children;
};



function App() {

  const { isCheckingAuth, checkAuth } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  if (isCheckingAuth) return <LoadingSpinner />

  return (
    <div className=" text-white" >


      <Routes>
        <Route path="/doctor" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/doctor/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/" element={
          <ProtectedRoutePatient>
            < HomePagePatient />
          </ProtectedRoutePatient>
        } />

        <Route path="/profile" element={
          <ProtectedRoutePatient>
            <ProfilePagePatient />
          </ProtectedRoutePatient>
        } />
        <Route path="/history" element={
          <ProtectedRoutePatient>
            <PatientDetails />
          </ProtectedRoutePatient>
        } />

       
        <Route path="/contactus" element={
          <ProtectedRoutePatient>
            <ContactUsPagePatient />
          </ProtectedRoutePatient>
        } />

        <Route path="/signup" element={
          <RedirectAuthenticatedUserPatient>
            <SignupPatient />
          </RedirectAuthenticatedUserPatient>
        } />

        <Route path="/login" element={
          <RedirectAuthenticatedUserPatient>
            <LoginPatient />
          </RedirectAuthenticatedUserPatient>
        } />
        <Route path="/doctor/login" element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        } />


        <Route path="/doctor/signup" element={
          <RedirectAuthenticatedUser>
            < Signup />
          </RedirectAuthenticatedUser>
        } />

        <Route path="/verify" element={
          <RedirectAuthenticatedUserPatient>
             <SendEmailVerificationPatient />
          </RedirectAuthenticatedUserPatient>



        } />
        <Route path="/verify-email" element={
           <RedirectAuthenticatedUserPatient>
              <EmailVerificationPagePatient />
          </RedirectAuthenticatedUserPatient >

          } />

        <Route path="/forgot-password" element={
          <RedirectAuthenticatedUserPatient >
            <ForgotPasswordPagePatient />
          </RedirectAuthenticatedUserPatient >

        } />

        <Route
          path='/reset-password/:token'
          element={
            <RedirectAuthenticatedUserPatient>
              <ResetPasswordPagePatient />
             </RedirectAuthenticatedUserPatient>
          }
        />
        <Route path="/doctor/verify" element={
           <RedirectAuthenticatedUser>
               <SendEmailVerification />
          </RedirectAuthenticatedUser>


        } />
        <Route path="/doctor/verify-email" element={
          <RedirectAuthenticatedUser>
              <EmailVerificationPage />
          </RedirectAuthenticatedUser>
            } />

        <Route path="/doctor/forgot-password" element={
          <RedirectAuthenticatedUser >
             <ForgotPasswordPage />
          </RedirectAuthenticatedUser>

        } />

        <Route
          path='/doctor/reset-password/:token'
          element={
            <RedirectAuthenticatedUser>
               <ResetPasswordPage />
             </RedirectAuthenticatedUser>
          }
        />
        {/* catch all routes */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />
    </div>

  )
}

export default App