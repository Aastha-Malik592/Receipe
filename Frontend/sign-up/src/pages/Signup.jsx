import React from 'react'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from '../layouts/AuthLayout';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../val/auth-schema";

const apiUrl = import.meta.env.VITE_API_URL;
const Signup = () => {

  const navigate = useNavigate();
  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(signupSchema),
});
const handleSignup = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/auth/signup`,
     data
    );

    console.log(response.data);

    navigate("/login");
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Signup failed");
  }
};
 return (
  <AuthLayout>
    <form onSubmit={handleSubmit(handleSignup)}>

      <h1>Create Account</h1>

      <p>Join us today</p>

      <input
        type="text"
        placeholder="Name"
        {...register("name")}
      />

      {errors.name && <p>{errors.name.message}</p>}


      <input
        type="email"
        placeholder="Email"
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
        Signup
      </button>


      <div className="bottom-link">
        Already have an account?{" "}
        <Link to="/login">
          Login
        </Link>
      </div>

    </form>
  </AuthLayout>
);
};

export default Signup
