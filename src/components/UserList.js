import '../App.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';

function UserList() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
      

    useEffect(() => {
        if (role === 'Admin') {
            loadUsers();
        } else {
            loadEmployees();
        }


    }, []);

    const loadUsers = () => {
        axios.get('http://localhost:8082/api/users/list',{headers: headers}).then(
            res => {
                console.log(res.data);
                setUsers(res.data)
            }
        ).catch(err => console.error(err))
    }

    const loadEmployees = () => {
        axios.get('http://localhost:8082/api/manager/emplist/' + localStorage.getItem('ID')).then(
            res => {
                console.log(res.data);
                setUsers(res.data)
            }
        )
    }

    const deleteUser = (data) => {
        console.log(data)
        if (role === 'Employee') {
            axios.delete('http://localhost:8082/api/manager/emp/' + data._id).then(
                re => {
                    console.log(re.data);
                    loadEmployees();
                }
            ).catch(err => console.error(err))
        } else {
            axios.delete('http://localhost:8082/api/users/' + data._id).then(
                res => {
                    console.log(res.data);
                    loadUsers();
                }
            ).catch(err => console.error(err))
        }

    }

    return (
        <>
            <NavBar />
            <div className='col-md-12 mx-8 float-right mt-[22px] mb-[12px]'>
                <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ' onClick={() => {
                    navigate('/create-user')
                }}>Create User</button>
            </div>


            <div className='col-md-12 mx-8'>
                {
                    role === 'Admin' &&
                    <table className='table-auto w-full border-2'>

                        <thead className='bg-slate-600 text-white rounded'>
                            <tr>
                                <th className='tab-header border border-slate-100'>User name</th>
                                <th className='tab-header border border-slate-100'>Role</th>
                                <th className='tab-header border border-slate-100'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((item, k) => {
                                return (
                                    <tr key={k} className="border-2 h-12">
                                        <td className="px-2 border">{item.username}</td>
                                        <td className="px-2 border">{item.role}</td>
                                        <td className="px-2 border">
                                            <button className='bg-red-600 text-sm hover:bg-red-400 text-white py-2 px-4 border-red-700 border-b-4 border-r-4 hover:border-red-400 rounded' onClick={() => deleteUser(item)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>

                    </table>
                }
                {role === 'Manager' &&
                    <table className='table-auto w-full rounded border-2'>

                        <thead className='bg-slate-600 text-white rounded'>
                            <tr>
                                <th className='tab-header border border-slate-100'>User name</th>
                                <th className='tab-header border border-slate-100'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((item, k) => {
                                return (
                                    <tr key={k} className="border-2 h-12">
                                        <td className="px-2 border">{item.name}</td>
                                        <td className="px-2 border">
                                            <button className='bg-red-600 hover:bg-red-400 text-white py-2 px-4 active:translate-y-1 border-red-700 border-b-4 border-r-4 hover:border-red-400 rounded' onClick={() => deleteUser(item)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>

                    </table>
                }

            </div>

        </>
    )
}

export default UserList;


