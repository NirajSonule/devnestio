import axios from "axios";
import { createContext, useContext } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { setUser } = useAuth();

  const submitProfile = async (
    profile_image,
    bio,
    location,
    tech_stack,
    links,
    experience,
    education,
    githubUsername
  ) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/user/profile-form`,
        {
          profile_image,
          bio,
          location,
          tech_stack,
          links,
          experience,
          education,
          githubUsername,
        },
        { withCredentials: true }
      );

      setUser(res.data.updatedUser);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update profile",
      };
    }
  };

  return (
    <UserContext.Provider value={{ submitProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
