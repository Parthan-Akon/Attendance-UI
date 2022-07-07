import '../App.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    function updateInputValue(event) {
        setUsername(event.target.value);
        console.log(username);
        console.log("here");
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
        console.log(password);
    }

    const loginCheck = (event) => {
        event.preventDefault();
        console.log(username, ' ', password);

        axios.post('http://localhost:8082/api/users/login', { "username": username, "password": password })
            .then(res => {
                console.log(res.data)
                if (res.data.user.length > 0) {
                    if (res.data.user[0].password === password) {
                        console.log("Login successfull!")
                        localStorage.setItem('username', username);
                        localStorage.setItem('role', res.data.user[0].role)
                        localStorage.setItem('ID', res.data.user[0]._id)
                        localStorage.setItem('access_token',res.data.accesstoken)
                        localStorage.setItem('refresh_token',res.data.refreshtoken)
                        navigate("/dashboard")

                    }
                }
            })
            .catch(err => console.error(err))



    }



    return (

        <>

            <div className='flex items-center justify-center min-h-screen bg-gray-100'>
                <div className='px-8 py-6 mt-4 text-left bg-white shadow-lg w-[22rem]'>
                    <h3 className='text-2xl font-bold text-center'>Login to your account</h3>

                    <form onSubmit={loginCheck}>
                        <div className='mt-4'>
                            <div>
                                <label className='block'>Email</label>
                                <input type="text" value={username} onChange={evt => updateInputValue(evt)} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="Enter email" />
                            </div>
                            <div class="mt-4">
                                <label class="block">Password</label>
                                <input value={password} onChange={event => updatePassword(event)} type="password" id="pwd" placeholder="Enter password" name="pswd"
                                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                            <div class="flex items-baseline justify-between">
                                <button type="submit" class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                            </div>

                        </div>
                    </form>

                </div>

            </div>
            {/* <div className="container">
                <div className='col-md-12'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4' style={{ marginTop: "150px" }}>
                        <h2>Login</h2>

                        <form onSubmit={loginCheck}>
                            <div className="form-group">
                                <label >Email:</label>
                                <input type="text" value={username} onChange={evt => updateInputValue(evt)} className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password" value={password} onChange={event => updatePassword(event)} className="form-control" id="pwd" placeholder="Enter password" name="pswd" />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>


                        </form>
                    </div>
                    <div className='col-md-4'></div>
                </div>



            </div> */}

        </>

    )
}

export default Login;