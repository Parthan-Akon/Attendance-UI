
import { useState } from 'react';
import '../css/CreateUser.css';
import axios from 'axios';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

function CreateUser() {

    const navigate = useNavigate();

    const role = localStorage.getItem('role');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    var selected = 'Admin';
    var registerStr = 'Register';
    const roles = ['Admin', 'Manager', 'Employee'];
    const userrole = localStorage.getItem('role');

    if (localStorage.getItem('role') === 'Manager') {
        registerStr = 'Register an employee'
        selected = 'Manager';
        roles.shift();
    }




    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, password);


        axios.post('http://localhost:8082/api/users/', { username: email, password: password, role: selected })
            .then(res => {
                console.log(res)
                if (role === 'Admin') {
                    navigate('/user-list');
                } else {
                    axios.post('http://localhost:8082/api/manager/', { managerID: localStorage.getItem('ID'), managerName: localStorage.getItem('username'), name: email })
                        .then(data => {
                            console.log(data)
                            navigate('/user-list');
                        })
                        .catch(err => console.error(err))
                }

            })
            .catch(err => console.error(err))




    }

    const selectedRole = (data) => {
        selected = data.target.value;
        console.log(selected)
    }


    return (
        <>
            <NavBar />
            <div className="screen">
                <div className="screen__content">
                    <form onSubmit={handleSubmit}>
                        <div className="container2">
                            <h1>{registerStr}</h1>
                            <p>Please fill in this form to create an account.</p>
                            <hr />

                            <label ><b>Email</b></label>
                            <input type="text" placeholder="Enter Email" value={email} onChange={(event) => setEmail(event.target.value)} required />

                            <label ><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" value={password} onChange={(event) => setPassword(event.target.value)} required />

                            {
                                userrole === 'Admin' &&
                                <div>
                                    <label><b>Role</b></label>
                                    <div>
                                        <select className="form-select form-select-lg mb-3" onChange={(event) => { selectedRole(event) }}>
                                            {roles?.map((item, k) => {

                                                return <option value={item} key={k} >{item}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            }


                            <hr />
                            <p>By creating an account you agree to our <a>Terms & Privacy</a>.</p>

                            <button type="submit" className="registerbtn">Register</button>
                        </div>


                    </form>
                </div>
            </div>

        </>
    )
}

export default CreateUser;