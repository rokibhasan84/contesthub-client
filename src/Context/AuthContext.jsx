
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "../Api/axiosInstance";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // firebase user
  const [loading, setLoading] = useState(true); // indicates auth init
  const [role, setRole] = useState("user");     // role from backend

  // register (email/password)
  const registerUser = async (email, password, name, photoURL) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // update display name / photo
    await updateProfile(result.user, { displayName: name || "", photoURL: photoURL || "" });
    // backend save & fetch token done in onAuthStateChanged
    setLoading(false);
    return result.user;
  };

  // login (email/password)
  const loginUser = async (email, password) => {
    setLoading(true);
    const res = await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
    return res.user;
  };

  // google login
  const googleLogin = async () => {
    setLoading(true);
    const res = await signInWithPopup(auth, googleProvider);
    // user saved via onAuthStateChanged
    setLoading(false);
    return res.user;
  };

  // logout
  const logoutUser = async () => {
    setLoading(true);
    localStorage.removeItem("token");
    await signOut(auth);
    setUser(null);
    setRole("user");
    setLoading(false);
  };

  // Observe auth change -> save user to backend and fetch token+role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);

      if (currentUser?.email) {
        try {
          // upsert user to backend
          await axios.post("/users", {
            email: currentUser.email,
            name: currentUser.displayName || "",
            photoURL: currentUser.photoURL || ""
          });

          // get role + token
          const resp = await axios.get(`/users/${encodeURIComponent(currentUser.email)}`);
          if (resp?.data?.token) {
            localStorage.setItem("access-token", resp.data.token);
          }
          setRole(resp?.data?.role || "user");
        } catch (err) {
          console.error("AuthContext: save/get user error", err);
        }
      } else {
        localStorage.removeItem("access-token");
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    role,
    registerUser,
    loginUser,
    googleLogin,
    logoutUser,
    setRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}