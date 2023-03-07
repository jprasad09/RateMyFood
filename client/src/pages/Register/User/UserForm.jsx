import { useState } from "react";
import styles from "./userForm.module.css";
import FormInput from "../../../components/Form/FormInput/FormInput";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Home/Navbar/Navbar";
import ClipLoader from "react-spinners/ClipLoader";

const UserForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    phone_no: "",
    address: "",
    dob: "",
    profileImage: "",
    password: "",
    confirmPassword: "",
  });
  let [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username is required",
      label: "Username",
      required: true,
    },
    {
      id: 2,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage: "Name is required",
      label: "Name",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please enter a valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "phone_no",
      type: "text",
      placeholder: "Phone",
      errorMessage: "Please enter a valid 10 digit phone no.",
      label: "Phone No.",
      pattern: `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`,
      required: true,
    },
    {
      id: 5,
      name: "address",
      type: "text",
      placeholder: "Address",
      errorMessage: "Address is required",
      label: "Address",
      required: true,
    },
    {
      id: 6,
      name: "dob",
      type: "date",
      placeholder: "DOB",
      label: "DOB",
    },
    {
      id: 7,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 8,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post("/users", JSON.stringify(values), {
        headers: { "Content-Type": "application/json" },
      });
      setLoading(false);
      setValues({
        username: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        birthday: "",
        password: "",
        confirmPassword: "",
      });

      window.alert("Registration Successful!");

      navigate("/signin");
    } catch (error) {
      setLoading(false);
      window.alert("Error");
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setValues({ ...values, profileImage: reader.result });
    };
  };

  return (
    <>
      <Navbar />
      <div className={styles.userFormContainer}>
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
            <h1>Register</h1>
            <div>
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
              <div className={styles.imageFormInput}>
                <label>Add Profile Image</label>
                <input
                  name="profileImage"
                  onChange={handleImageChange}
                  type="file"
                  onBlur={() => setFocused(true)}
                  onFocus={() => setFocused(true)}
                  focused={focused.toString()}
                />
              </div>
            </div>
            <button>Submit</button>
          </form>
        )}
      </div>
    </>
  );
};

export default UserForm;
