import React from "react";
import { useDispatch } from "react-redux";
import { signupThunk } from "../features/auth/auth-thunk";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../features/auth/auth-schema";
const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const dispatch = useDispatch();

  const handleSignup = async (data) => {
    const result = await dispatch(signupThunk(data));

    if (signupThunk.fulfilled.match(result)) {
      toast.success("Signup successful");
      navigate("/login");
    } else {
      toast.error(result.payload || "Signup failed");
    }
  };
  return (
    <div className="authContainer">
      <div className="left-side">
        <img
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
          alt="Recipe"
        />
      </div>

      <div className="right-side">
        <div className="authBox">
          <form onSubmit={handleSubmit(handleSignup)}>
            <h1>Create Account</h1>

            <p>Join us today</p>

            <input type="text" placeholder="Name" {...register("name")} />

            {errors.name && <p className="error">{errors.name.message}</p>}

            <input type="email" placeholder="Email" {...register("email")} />

            {errors.email && <p className="error">{errors.email.message}</p>}

            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            <button className="auth-btn" type="submit">
              Sign Up
            </button>

            <div className="bottom-link">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
