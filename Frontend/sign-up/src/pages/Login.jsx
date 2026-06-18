import React from 'react'

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
const apiUrl = import.meta.env.VITE_API_URL;
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../val/auth-schema";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/auth-slice";
import toast from "react-hot-toast";
const Login = () => {
  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(loginSchema),
});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
     `${apiUrl}/api/auth/login`,
        data
      );

 

console.log(response.data);

if (response.data.token) {
  dispatch(loginSuccess(response.data.token));
  toast.success("Login successful");
  navigate("/home");
} else {
  toast.error("Login failed");
}

} catch (error) {
  toast.error(
    error.response?.data?.message || "Login failed"
  );
}

 }; 
 return (
  <AuthLayout>
    <form onSubmit={handleSubmit(handleLogin)}>

      <h1>Welcome Back</h1>

      <p>Login to continue</p>

      <input
        type="email"
        placeholder="Email Address"
        {...register("email")}
      />

      {errors.email && <p>{errors.email.message}</p>}


      <input
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      {errors.password && <p>{errors.password.message}</p>}


      <button
        className="auth-btn"
        type="submit"
      >
        Login
      </button>


      <div className="bottom-link">
        Don't have an account?{" "}
        <Link to="/signup">
          Sign Up
        </Link>
      </div>

    </form>
  </AuthLayout>
);
};

export default Login