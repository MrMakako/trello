import "./signup_style.css";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
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
                type="text"
                {...register("username")}
                placeholder="Username"
              ></input>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
              ></input>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
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
