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
        <section>
          <h1>
            Free Kanban Board Project Management tool. Easy to use Sign Up now!
          </h1>
        </section>
        <div className="register">
          <div className="col-1">
            <h2>Sign Up</h2>
            <span>Start Now</span>
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
            <img src="/sign_up/image3.jpg" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
