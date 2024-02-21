import React, { useEffect } from "react";
import { UserModel } from "../../models/user.model";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../../saga/sagaActions";
import { Link } from "react-router-dom";
import "../forms/form.css";
import Google from "../../assets/google.png";
import Apple from "../../assets/apple.png";
import eyeOpenImage from "../../assets/open-eye-image.png";
import eyeCloseImage from "../../assets/close-eye-image.png";
import Facebook from "../../assets/facebook.png";
import { RootState } from "../../redux/store/store";
import Header from "../common/header/header.component";
import Loader from "../common/loader/loader.component";
import { isPasswordVisible } from "../../redux/reducer/auth.reducer";

type LoginInput = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector((state: RootState) => {
    return state.auth.isUserAuthenticated;
  });
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isPasswordShow = useSelector(
    (state: RootState) => state.auth.isPasswordVisible
  );

  const onSubmitHandler = (data: LoginInput) => {
    const { email, password } = data;
    const user = new UserModel(email, password);

    dispatch({ type: sagaActions.AUTHENTICATE_USER, payload: user });
  };
  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/dashboard");
    }
  }, [isUserAuthenticated]);
  const passwordShowHandler = () => {
    dispatch(isPasswordVisible(!isPasswordShow));
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <div className="wrapper">
        <h2 className="heading"> Log into your LearnDemy account </h2>
        <div className="social-media-buttons">
          <button className="social-media-btn">
            <img alt="google-logo" src={Google} />
            <span>Continue with Google</span>
          </button>
          <button className="social-media-btn">
            <img alt="facebook-Logo" src={Facebook} />
            <span>Continue with Facebook</span>
          </button>
          <button className="social-media-btn">
            <img alt="apple-Logo" src={Apple} />
            <span>Continue with Apple</span>
          </button>
        </div>
        <form
          className="form-container"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>Email Id is required !</p>
          )}
          <div className="password-input-container">
            <input
              type={isPasswordShow ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: true,
                maxLength: 20,
                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
              })}
            />

            <img
              className="eye-image"
              src={isPasswordShow ? eyeOpenImage : eyeCloseImage}
              alt={isPasswordShow ? `Open eye image` : `Close eye image`}
              onClick={passwordShowHandler}
            />
          </div>
          {errors.password && (
            <p style={{ color: "red" }}>
              {errors.password.type === "required"
                ? "Password is required!"
                : errors.password.type === "maxLength"
                ? "The password should have at most 20 characters"
                : "The password you have entered should have minimum length 8, 1 capital letter, 1 numeric and 1 alphanumeric"}
            </p>
          )}

          <br />
          <button type="submit" className="form-control-btn">
            Log In
          </button>
        </form>
        <p className="no-account-text">
          Don't have an account ? <Link to={"/signup"}>Sign up</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
