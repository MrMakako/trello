import "./signup_style.css";
import { useForm } from "react-hook-form";
//Todos los componente de react comienzan con letra mayúscula
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
                placeholder="Password"
              ></input>
              <input
                type="password"
                {...register("confirmpwd")}
                placeholder="Confirm password"
              ></input>
              <button className="btn">Sign in</button>
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
