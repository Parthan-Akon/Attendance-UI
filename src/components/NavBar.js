import { useNavigate } from "react-router-dom";


function NavBar() {

    const navigate = useNavigate()
    const username = localStorage.getItem('username');

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <ul className='nav-class-ui'>
            <li className='nav-class'><a href="/dashboard">Home</a></li>
            <li className='nav-class'><a href="/user-list">Users</a></li>
            <li className='nav-class' style={{ float: 'right' }}><a className="active" onClick={logout}>Log out</a></li>
            <li className="nav-class" style={{ float: 'right', color: 'white' }}><a>{username}</a></li>

        </ul>
    )

}

export default NavBar;