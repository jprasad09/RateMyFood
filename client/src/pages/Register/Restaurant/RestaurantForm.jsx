import { useState } from 'react'
import styles from './restaurantForm.module.css'
import FormInput from '../../../components/Form/FormInput/FormInput'
import axios from '../../../api/axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../../components/Home/Navbar/Navbar'

const RestaurantForm = () => {

  const navigate = useNavigate()

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone_no: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage: "Name is required",
      label: "Name",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please enter a valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "phone_no",
      type: "text",
      placeholder: "Phone",
      errorMessage: "Please enter a valid 10 digit phone no.",
      label: "Phone No.",
      pattern: `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`,
      required: true,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Address",
      errorMessage: "Address is required",
      label: "Address",
      required: true,
    },
    {
      id: 5,
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
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const response = await axios.post('/restaurants', 
        JSON.stringify(values),
        {
          headers: { 'Content-Type': 'application/json'},
        })
      setValues({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
      })

      window.alert("Registration Successful!")

      navigate('/signin')
  
    }catch(error){
      window.alert("Error")
    }

  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className={styles.restaurantFormContainer}>
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
    </>
  )
};

export default RestaurantForm
