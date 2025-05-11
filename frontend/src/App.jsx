import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import ProfilePage from "./pages/Profile"
import { Navigate, Route, replace, Routes } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import SendEmailVerification from "./pages/SendEmailVerification"
import ContactUsPage from "./pages/ContactUsPage"
import AboutUs from "./pages/AboutUs"
import  Model from "./pages/Model"
// import PatientDetails from "./pages/PatientHistory"
const ProtectedRoute = ({ children }) => {

  const { isAuthenticated, user } = useAuthStore();
  console.log(user);

  if (!isAuthenticated) {
    toast.error("you do not have access")
    alert("error")
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


  if (isAuthenticated && user.is_verified ) {
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
        <Route path="/" element={
          <ProtectedRoute>
            < Home />
          </ProtectedRoute>
        } />
        <Route path="/model" element={
          <ProtectedRoute>
            < Model />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
        } />
       

       
        <Route path="/contactus" element={
          <ProtectedRoute>
            <ContactUsPage />
          </ProtectedRoute>
        } />

        <Route path="/aboutus" element={
          <ProtectedRoute>
            <AboutUs />
          </ProtectedRoute>
        } />

        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
            <Signup />
          </RedirectAuthenticatedUser>
        } />

        <Route path="/login" element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        } />
      


      

        <Route path="/verify" element={
          <RedirectAuthenticatedUser>
             <SendEmailVerification />
          </RedirectAuthenticatedUser>



        } />
        <Route path="/verify-email" element={
           <RedirectAuthenticatedUser>
              <EmailVerificationPage />
          </RedirectAuthenticatedUser >

          } />

        <Route path="/forgot-password" element={
          <RedirectAuthenticatedUser >
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser >

        } />

        <Route
          path='/reset-password/:token'
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