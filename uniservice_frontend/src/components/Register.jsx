import React from 'react'
import './register.css'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import API from '../Data/api.json'

const Register = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const registerUrl = API[0].url;

    const handleUserName = (e) => {
        console.log(e.target.value)
        setUserName(e.target.value)
    }

    const handleEmail = (e) => {
        console.log(e.target.value)
        setEmail(e.target.value)
    }
    const handleName = (e) => {
        console.log(e.target.value)
        setName(e.target.value)
    }

    const handlePassword =(e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("blah blah submitted!!!!!!")
        axios.post(registerUrl,{
            username: userName,
            email : email,
            password: password,
            // name : name
        }).then((res)=>{
            // alert('successful')
            console.log(res.data)
            localStorage.setItem("username",res.data.username)
            // alert(res.data.username)
            navigate("/")
        }).catch((err)=>{
            console.log(err.response)
            alert(err.response.data.error.message)
        })

    }


    
    return (

        
        <>
            <section className="register_main">
                <div className="register_left_container">
                    <img src="images/group-art.jpg" alt="" />
                </div>

                <div className="register_right_container">
                    <div className="inner_container">
                        <img src="images/logo.png" alt="logo" />

                        <h1>Be one of us!</h1>
                        <h2>Please enter your details</h2>
                        <div className="textfields">
                            <input type="text" placeholder='Username' onChange={handleUserName} value={userName} required/>
                            <input type="email" placeholder='Email' onChange={handleEmail} value={email} required/>
                            <input type='password' placeholder='Password' onChange={handlePassword} value={password} required />
                            <div className="phone_name_input" >
                            <input type='text' placeholder='Student Id' onChange={handleName} value={name} required/>
                            {/* <input type='phone' placeholder='Phone' /> */}
                            </div>
                        </div>


                        <button onClick={handleSubmit} type='submit' className="register_btn">Sign Up</button>

                        <h3 className="create-acc-link">Already a member! <a href="/">Sign in</a></h3>

                        
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register