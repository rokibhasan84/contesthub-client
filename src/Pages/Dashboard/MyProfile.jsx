import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { updateProfile} from "firebase/auth";
import { auth } from '../../firebase/firebase.config';
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdateProfile = async () => {
    
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      toast.success("✅ Profile updated successfully!");
    } catch (error) {
      toast.error("❌ Failed to update profile!");
      console.error(error);
    }
  };

 
  return (
    <div className="flex flex-col items-center justify-center md:mt-20">
      <Toaster />
      <div className="card bg-base-200 w-full max-w-md p-6 rounded-xl shadow-lg">
        <div className="flex flex-col items-center mb-5">
          <img
            src={user?.photoURL || "https://i.postimg.cc/T3R9zTny/avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-primary mb-3"
          />
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>

        {/* Update Profile */}
        <form onSubmit={handleUpdateProfile} className="space-y-3">
          <h3 className="text-lg font-semibold mb-2">Update Profile</h3>
          <input
            type="text"
            placeholder="New Name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-full">
            Save Changes
          </button>
        </form>

        {/* Password Reset */}
        <div className="mt-5 text-center">
          <h3 className="text-lg font-semibold mb-2">Forgot Password?</h3>
          
          <Link to='/change-password'
            className="btn btn-outline btn-secondary w-full"
          >
            Change Password
          </Link>
            
          

          
        </div>
      </div>
    </div>
  );
};

export default Profile;