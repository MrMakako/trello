import "./signup_style.css";
import { useForm } from "react-hook-form";
//todos los ocmponentes de ract comienzan con letra mayuscula
function SignUp() {
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
        <div className="register">
          <div className="col-1">
            <h2>Sign in</h2>
            <span>Que empieze lo bueno</span>
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
                placeholder="password"
              ></input>
              <input
                type="password"
                {...register("confirmpwd")}
                placeholder=" confirm password"
              ></input>
              <button className="btn">sign in</button>
            </form>
          </div>
          <div className="col-2">
            <img src="/sign_up/image2.jpg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
