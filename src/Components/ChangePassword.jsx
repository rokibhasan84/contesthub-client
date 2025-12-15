import React, { useState } from "react";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const user = auth.currentUser;

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!oldPass || !newPass || !confirmPass)
      return toast.error("All fields are required!");

    if (newPass.length < 6)
      return toast.error("New password must be at least 6 characters");

    if (newPass !== confirmPass)
      return toast.error("Passwords do not match");

    try {
      // Step 1: Re-authenticate
      const credential = EmailAuthProvider.credential(user.email, oldPass);
      await reauthenticateWithCredential(user, credential);

      // Step 2: Firebase Update Password
      await updatePassword(user, newPass);

      toast.success("Password changed successfully!");
      setOldPass("");
      setNewPass("");
      setConfirmPass("");

    } catch (error) {
      console.log(error);
      if (error.code === "auth/wrong-password") {
        toast.error("Old password is incorrect");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-25 mb-5 p-6 border rounded-xl shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-center text-[#cf0ae0]">Change Password</h2>

      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Old Password"
          className="w-full p-3 border rounded mb-3"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 border rounded mb-3"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full p-3 border rounded mb-3"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <button
          type="submit"
          className="w-full  hover:text-white p-3 rounded btn btn-outline btn2"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;