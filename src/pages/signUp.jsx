import "./signup_style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import userRegister from "./requests/user.request";
//Todos los componente de react comienzan con letra mayúscula
function SignUp() {
  let password;
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password length should be at least 8 characters")
      .max(100, "Password cannot exceed more than 100 characters"),
    confirmpwd: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    //////REACT FROM HOOK///
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onTouched", resolver: yupResolver(formSchema) });
  //enviar
  const onSubmit = (data) => {
    console.log(data);
    userRegister(data.email, data.password);
  };

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
                type="email"
                {...register("email")}
                placeholder="Email"
                required
              ></input>
              <input
                type="password"
                {...register("password")}
                placeholder="password"
                required
              ></input>
              <p>{errors.password?.message}</p>
              <input
                type="password"
                {...register("confirmpwd")}
                placeholder="Confirm password"
              ></input>
              <p>{errors.confirmpwd?.message}</p>

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
