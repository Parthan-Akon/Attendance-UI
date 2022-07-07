import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import './App.css';
import Dashboard from './components/Dashboard';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-user' element ={<CreateUser />}/>
          <Route path='/user-list' element = {<UserList/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
