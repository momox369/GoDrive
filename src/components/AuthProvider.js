import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({ email: "", username: "" });

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("http://localhost:3001/current-user", {
        withCredentials: true,
      });
      setCurrentUser((prev) => ({
        ...prev,
        email: response.data.email,
        username: response.data.username,
      }));
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const verifyEmail = async (email) => {
    try {
      const response = await axios.post("http://localhost:3001/login/email", {
        email,
      });
      getCurrentUser();
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const verifyPassword = async (password) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/login/password",
        { password }
      );
      setUser(response.data); // Assuming the response includes user details

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  // Logout function
  const register = async (email, username, password) => {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        email,
        username,
        password,
      });
      setUser(response.data); // Assuming the server sends back the user data
      return response.data; // Navigate or do other actions on successful registration
    } catch (error) {
      if (error.response) {
        // Client received an error response (5xx, 4xx)
        throw new Error(error.response.data.message || "Failed to register");
      } else if (error.request) {
        // Client never received a response, or request never left
        throw new Error("No response from server");
      } else {
        // Anything else
        throw new Error("Registration failed due to an error");
      }
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  const logout = () => {
    setUser(null);
    setCurrentUser({ email: "", username: "" });
  };

  const value = useMemo(
    () => ({
      user,
      currentUser,
      verifyEmail,
      verifyPassword,
      register,
      logout,
    }),
    [user, currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
