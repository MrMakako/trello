import "./signup_style.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="App">
      <div className="register">
        <div className="col-1">
          <div id="form" className="flex flex-col">
            <button className="btn">Register</button>
            <Link to="/register">
              <button className="btn">Register</button>
            </Link>
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
