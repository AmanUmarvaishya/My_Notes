import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Notes from './components/Notes';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from './components/GoogleLogin';

export default function App() {
 const GoogleAuthWrapper = () => {
   return (
      <GoogleOAuthProvider clientId="32712112537-1ef5ime2mvpohhrfdp0ar2u0jtskgv18.apps.googleusercontent.com">
        <div className="bgColor">
          <Login/>
          <GoogleLogin/>
        </div>
      </GoogleOAuthProvider>
    );
  };
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<GoogleAuthWrapper  />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={
          
            <Notes />
         
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
