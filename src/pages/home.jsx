import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="App">
      <section>
        <h1>
          Free Kanban Board Project Management tool. Easy to use Sign Up now!
        </h1>
        <div className="register">
          <div className="col-1">
            <div id="form" className="flex flex-col">
              <Link className="btn" to="./register">
                Register
              </Link>
              <Link className="btn" to="./login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  ); //
}

export default Home;
