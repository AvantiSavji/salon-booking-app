import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";



function Auth() {
  const { login } = useContext(AuthContext);
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  role: "user",
});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? "https://glamstudio-ezax.onrender.com/api/auth/login"
        : "https://glamstudio-ezax.onrender.com/api/auth/register";

      const response = await axios.post(url, formData);

      if (isLogin) {
        login(response.data.user, response.data.token);
        alert("Login successful");
        navigate("/");
      } else {
        alert("Registered successfully. Please login.");
        setIsLogin(true);
      }
      } catch (error) {
    console.log(error.response);
    alert(error.response?.data?.message || "Something went wrong");
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Sign In" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-xl"
            />
          )}

            <select
            name="role"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <p className="text-center mt-6 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-600 ml-2 font-medium"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

      </div>
    </div>
  );
}

export default Auth;