import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp } from "../redux/features/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [genPassword, setGenPassword] = useState("*************");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const user = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // switch between signIn/signUp form
  const switchMode = () => {
    setIsSignUp(!isSignUp);
  };

  const generatePassword = () => {
    const randomPassword = Math.random().toString(36).slice(6);

    setGenPassword(randomPassword);
  };

  // declare variable for form data
  const signUpData = { firstName, lastName, email, genPassword };
  const signInData = { email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(signUpData));
    } else {
      dispatch(signIn(signInData));
      // setTimeout(() => navigate("/"), 1000);
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setGenPassword("*******");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mb-2 dark:text-white">
              {isSignUp ? "Create your account" : "Sign in to your account"}
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action=""
              onSubmit={handleSubmit}
            >
              {isSignUp && (
                <>
                  <div>
                    <label
                      htmlFor="First Name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      first name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="first name"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Last Name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="last name"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {!isSignUp && (
                <>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {isSignUp && (
                <>
                  <div>
                    <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {genPassword}
                    </div>
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="bg-gray-900 text-base rounded-md text-white p-3 mt-3"
                    >
                      Generate Password
                    </button>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full text-white bg-gray-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isSignUp ? "Create account" : "Sign in your account"}
              </button>

              <Link to="/" className="flex justify-end text-gray-800">
                Go To Home
              </Link>

              <button
                type="button"
                className="text-sm font-light text-gray-500 dark:text-gray-400"
                onClick={switchMode}
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
