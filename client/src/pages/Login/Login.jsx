import { useState } from 'react'
import styles from './login.module.css'
import FormInput from '../../components/Form/FormInput/FormInput'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

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

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const response = await axios.post('/signin', 
        JSON.stringify(values),
        {
          headers: { 'Content-Type': 'application/json'},
          //withCredentials: true
        })
      setValues({
        email: "",
        password: "",
      })

      window.alert("Login Successful!")

      navigate('/restaurant')
  
    }catch(error){
      window.alert("Error")
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.loginContainer}>
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
    </div>
  );
};

export default Login
