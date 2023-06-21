import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { loginUser } from "./requests/user.request";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [LoginError, setLoginError] = useState(false);

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password length should be at least 8 characters")
      .max(100, "Password cannot exceed more than 100 characters"),
    //////REACT FROM HOOK///
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: yupResolver(formSchema) });

  async function onSubmit(data) {
    try {
      const response = await loginUser(data.email, data.password).then(
        (response) => {
          if (!response.data.succes) {
            // guardar el token en localStorage
            localStorage.setItem("accessToken", response.data.data.accessToken);
            localStorage.setItem(
              "refreshToken",
              response.data.data.refreshToken
            );
            setLoginError(false);
            navigate("/dashboard", { replace: true });
          }
        }
      );
    } catch (error) {
      console.log(error);
      console.log("BAD-REQUEST ACCOUNT DOESNT EXIST");
      setLoginError(true);
    }
  }
  function LoginErrorMessage(props) {
    const isLoginFailed = props.isLoginFailed;

    if (isLoginFailed) {
      return (
        <p>
          Email or Password Wrong <Link to="../register">Register</Link>
        </p>
      );
    } else {
      return <></>;
    }
  }
  return (
    <div className="App">
      <section>
        <h1>Back To Work!</h1>
        <div className="register">
          <div className="col-1">
            <h2>Login</h2>
            <span>Welcome Back!</span>
            <form
              id="form"
              className="flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="email"
                required
                {...register("email")}
                placeholder="Email"
              ></input>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
              ></input>
              <p>{errors.password?.message}</p>
              <LoginErrorMessage isLoginFailed={LoginError} />
              <button className="btn">Login</button>
            </form>
          </div>
          <div className="col-3">
            <img src="/sign_up/image2.jpg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
