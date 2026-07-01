import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { loginThunk } from "../features/auth/auth-thunk";
import { loginSchema } from "../features/auth/auth-schema";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    const result = await dispatch(loginThunk(data));

    if (loginThunk.fulfilled.match(result)) {
      toast.success("Login successful");
      navigate("/home");
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <div className="authContainer">
      <div className="left-side">
        <img
          src="https://images.unsplash.com/photo-1495521821757-a1efb6729352"
          alt="Food"
        />
      </div>

      <div className="right-side">
        <div className="authBox">
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

            <button className="auth-btn" type="submit">
              Login
            </button>

            <div className="bottom-link">
              Don't have an account?
              <Link to="/signup"> Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
