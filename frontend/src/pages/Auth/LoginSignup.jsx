import React from 'react';
import { useState, useContext } from 'react';
import './Auth.css'
import bill from '../../assets/bill.jpg'
import money from '../../assets/money.jpg'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from '../../Context/AuthContext';
import { useEffect } from 'react';


const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login, signup } = useContext(AuthContext);


  //checking if the entered email is in correct format or not
  const validateEmail = (value) => {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const result = regex.test(value);
    return result;
  };

  //password must contain 8 charaters and captial,small,digits and special combination
  function validatePassword(val) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
    const isCorrectPass = passwordRegex.test(val);
    return isCorrectPass;

  }

  //passwords and emial should not be empty, then calling the validateEmail and validatePassword functions to check.
  function validateForm() {
    if (!email) {
      toast.error("please enter email.")
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("enter a valid email.");
      return false;
    }
    if (!password) {
      toast.error("please enter password.")
      return false;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be 8+ characters with uppercase, lowercase, number, and special character.");
      return false;
    }

    return true;

  }

  //function for login dealing with password and email only.
  async function loginHandler(e) {
    e.preventDefault();// preventing the default behaviour of submit button
    const isValid = validateForm();
    //if is valid is true navigate to home page with a toast message saying "Login Successfull".
    if (isValid) {
      const obj = {
        email: email,
        password: password,
      }
      const result = await login(obj);// calling the login function in AuthContext and change isLogged in value to true
      if (result.success) {
        toast.success("Login Successfull!")
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
      else {
        toast.error(result.message);
      }

    }
    else {
      return
    }
  }

  async function signupHandler(e) {
    e.preventDefault();//prevent default behaviour of submit button
    if (!name.trim()) {//remove extra white spaces from name 
      toast.error("Please enter name");//if name empty send toast of error
      return;
    }
    if (password !== confirmPassword) {//checking if both password and confirmed password are same or not
      toast.error("Password do not match.")
      return;
    }
    const isValid = validateForm();
    if (isValid) {
      const obj = {
        email: email,
        password: password,
        name: name,
      }
      console.log("Sending this to signup API -> ", obj);
      const result = await signup(obj);
      if (result.success) {
        toast.success("SignUp Successfull!")// everything works fine a toast for successfull signup
        setIsLogin(true);
        toast.info("Please Login.");
      }
      else {
        toast.error(result.message);
      }
    }
    else {
      return;
    }


  }
  return (
    <div className='wrapper'>
      <div className='left-side'>
        <div className='formContainer'>
          <div className='buttons'>
            <button className={isLogin ? 'active' : " "} onClick={() => setIsLogin(true)}>Login</button>
            <button className={!isLogin ? 'active' : " "} onClick={() => setIsLogin(false)}>Signup</button>
          </div>
          {isLogin ?
            (
              <form action="" onSubmit={loginHandler} noValidate>
                <input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='passwordField'>
                  <input type={!showPassword ? "password" : "text"} placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  <span className='eyeIcon' onClick={() => setShowPassword(!showPassword)}> {showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
                <a href='#'>Forgot Passoword?</a>
                <button className='submitBtn' type='submit'>Login</button>
                <a href='#'>New user? Please - <span onClick={() => setIsLogin(false)}>SignUp</span></a>

              </form>
            ) : " "}

          {!isLogin ?
            (
              <form action="" onSubmit={signupHandler} noValidate>
                <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className='passwordField'>
                  <input type={showPassword ? 'text' : 'password'} placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  <span className='eyeIcon' onClick={() => setShowPassword(!showPassword)}> {showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
                <div className='passwordField'>
                  <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  <span className='eyeIcon' onClick={() => setShowConfirmPassword(!showConfirmPassword)}> {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
                <button className='submitBtn' type='submit'>SignUp</button>
                <a href='#'>Already a user? Please - <span onClick={() => setIsLogin(true)}>Login</span></a>
              </form>
            )
            : ""}
        </div>
      </div>

      <div className='imageSide'>
        <div className="right-side-text">
          <h2>Welcome Back to ExpenseTracker</h2>
          <p>Manage your finances with simplicity and precision.</p>
        </div>
        {/* Images are now part of the content, but the text is added below */}
        <div className="imagesGroup">
          <img src={bill} alt="Bill management" className="billImg" />
          <img src={money} alt="Money and POS" className="mmoneyImg" />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default LoginSignup;