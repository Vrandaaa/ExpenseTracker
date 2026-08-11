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
  const { login, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);
  const validateEmail = (value) => {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const result = regex.test(value);
    return result;
  };

  function validatePassword(val) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
    const isCorrectPass = passwordRegex.test(val);
    return isCorrectPass;

  }

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

  function loginHandler(e) {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      login();
      toast.success("Login Successfull!")
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  }

  function signupHandler(e) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter name");
      return;
    }
    const isValid = validateForm();
    if (!isValid) return;
    if (password !== confirmPassword) {
      toast.error("Password do not match.")
      return;
    }

    toast.success("SignUp Successfull!")

    setTimeout(() => {
      login();
      navigate("/home");
    }, 1000);

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