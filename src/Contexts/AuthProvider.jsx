import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../Firebase/FIrebase.config";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Create User
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // User Sign In
  const userSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Google Sign In
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

const logout = () => {
  return signOut(auth);
};

// User State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Auth Info
  const authInfo = {
    user,
    createUser,
    userSignIn,
    googleLogin,
    logout
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
