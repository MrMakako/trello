import "./signup_style.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <header>
        <h1>Best Online Kanban Board</h1>
      </header>
      <body>
        <div className="App">
          <div className="register">
            <div>
              <img src="./welcome-page.jpg" alt="Welcome image" />
            </div>
            <div className="col-1">
              <div id="form" className="flex flex-col">
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
      </body>
    </div>
  );
}

export default Home;
