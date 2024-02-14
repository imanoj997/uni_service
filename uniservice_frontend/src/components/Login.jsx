import React from 'react'
import axios from 'axios'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

import API from '../Data/api.json'

const Login = () => {
    const navigate = useNavigate();

    const loginUrl = API[1].url;

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    // const [authenticated, setauthenticated] = useState(
    //     localStorage.getItem(localStorage.getItem("authenticated") || false)
    //   );

    const handleUserName = (e) => {
        console.log(e.target.value)
        setUserName(e.target.value)
    }

    const handlePassword =(e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("blah blah submitted!!!!!!")
        axios.post(loginUrl,{
            username: userName,
            password: password
        }).then((res)=>{
            // alert('successful')
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            console.log("Token "+localStorage.getItem('token'))
            localStorage.setItem("username",userName)
            navigate("/home")
        }).catch((err)=>{
            console.log(err.response)
            alert(err.response.data.error.message)
        })
    }


    
    return (
  
        <>
            <section className="login_main">
                <div className="login_left_container">
                    <img src="images/group-art.jpg" alt="" />
                </div>

                <div className="login_right_container">
                    <div className="inner_container">
                        <img src="images/logo.png" alt="logo" />

                        <h1>Welcome Back</h1>
                        <h2>Please enter your details</h2>
                        <div className="textfields">
                            <input type="text" placeholder='Username' name='userName' onChange={handleUserName} required value={userName}/>
                            <input type='password' placeholder='Password' name='password' onChange={handlePassword} required value={password}/>
                        </div>
                        <h5 className="forgot_pwd">Forgot Password?</h5>

                        <button type='submit' onClick={handleSubmit} className="login_btn">Sign in</button>

                        <h3 className="create-acc-link">Wanna be one of our members! <a href="/register">Sign up</a></h3>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Login