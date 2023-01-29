import { useState } from 'react'
import styles from './userForm.module.css'
import FormInput from '../../../components/Form/FormInput/FormInput'

const UserForm = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
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
      name: "phone",
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
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.userFormContainer}>
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
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UserForm
