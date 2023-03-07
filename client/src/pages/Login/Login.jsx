import { useState, useEffect } from "react";
import styles from "./login.module.css";
import FormInput from "../../components/Form/FormInput/FormInput";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { getUserOrRestaurantData } from "../../redux/actions/auth.action";
import Navbar from "../../components/Home/Navbar/Navbar";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const isCookieExist = cookies.get("token");
    if (isCookieExist) navigate("/");
  }, []);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  let [loading, setLoading] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please enter a valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password is required",
      label: "Password",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "/auth/signin",
        JSON.stringify(values),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setLoading(false);

      setValues({
        email: "",
        password: "",
      });

      cookies.set("token", response.data.token, { path: "/" });

      dispatch(getUserOrRestaurantData(response.data));

      window.alert("Login Successful!");

      if (response.data.user) {
        navigate("/");
      } else if (response.data.restaurant) {
        navigate("/restaurantprofile");
      }
    } catch (error) {
      setLoading(false);
      window.alert("Error");
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className={styles.loginContainer}>
        {loading ? (
          <ClipLoader
            color="#36d7b7"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button>Submit</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Login;
