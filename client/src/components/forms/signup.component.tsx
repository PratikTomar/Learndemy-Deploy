import React from "react";
import { UserModel } from "../../models/user.model";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../../saga/sagaActions";
import { Link } from "react-router-dom";
import eyeOpenImage from "../../assets/open-eye-image.png";
import eyeCloseImage from "../../assets/close-eye-image.png";
import "../forms/form.css";
import Header from "../common/header/header.component";
import { RootState } from "../../redux/store/store";
import Loader from "../common/loader/loader.component";
import { isPasswordVisible } from "../../redux/reducer/auth.reducer";

type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isPasswordShow = useSelector(
    (state: RootState) => state.auth.isPasswordVisible
  );
  const onSubmitHandler = (data: SignUpInput) => {
    const { email, name, password } = data;
    const user = new UserModel(email, password, name);
    dispatch({ type: sagaActions.ADD_NEW_USER, payload: user });
    navigate("/dashboard");
  };
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
        <h2 className="heading">Sign up and start Learning</h2>

        <form
          className="form-container"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <input
            type="text"
            placeholder="Full Name"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && <p style={{ color: "red" }}>Name is required !</p>}

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

          <button className="form-control-btn">Sign Up</button>
        </form>
        <p className="alert">
          Already have an account ? <Link to={"/login"}>Log In</Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;
