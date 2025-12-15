import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Please enter your email");

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset email sent! Check inbox or spam folder.");
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-25 p-6 border rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center text-[#cf0ae0]">Forgot Password</h2>

      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full  hover:text-white p-3 rounded btn btn-outline btn2">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgetPassword;





