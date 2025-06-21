// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/auth/user`,
//           { withCredentials: true }
//         );
//         setUser(res.data.user);
//       } catch (error) {
//         console.log(error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const register = async (username, email, password) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/auth/register`,
//         { username, email, password },
//         { withCredentials: true }
//       );

//       setUser(res.data.user);
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || "Registration failed",
//       };
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/auth/login`,
//         { email, password },
//         { withCredentials: true }
//       );

//       setUser(res.data.user);
//       return { success: true };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || "Login failed",
//       };
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
//       setUser(null);
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, setUser, loading, register, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/user`,
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (error) {
        // Only log error if it's not a 401 (unauthorized)
        if (error.response?.status !== 401) {
          console.log("Auth error:", error);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const register = async (username, email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { username, email, password },
        { withCredentials: true }
      );

      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if logout fails on server, clear user locally
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
