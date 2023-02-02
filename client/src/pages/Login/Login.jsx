import { useState, useEffect } from 'react'
import styles from './login.module.css'
import FormInput from '../../components/Form/FormInput/FormInput'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useDispatch } from 'react-redux'
import { getUserOrRestaurantData } from '../../redux/actions/auth.action'
import Navbar from '../../components/Home/Navbar/Navbar'

const Login = () => {

  const cookies = new Cookies()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const isCookieExist = cookies.get('token')
    if(isCookieExist) navigate('/')
  }, [])

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
      const response = await axios.post('/auth/signin', 
        JSON.stringify(values),
        {
          headers: { 'Content-Type': 'application/json'},
        })
      setValues({
        email: "",
        password: "",
      })

      cookies.set('token', response.data.token, { path: '/' })

      dispatch(getUserOrRestaurantData(response.data))

      window.alert("Login Successful!")

      navigate('/')
  
    }catch(error){
      window.alert("Error")
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Navbar />
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
    </>
  )
};

export default Login
