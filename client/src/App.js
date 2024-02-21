import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Register from './components/Register';
import Userlogin from './components/Userlogin';
import Adminlogin from './components/Adminlogin';
import Userpg from './components/Userpg';
import Adminpg from './components/Adminpg';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Userlogin' element={<Userlogin/>}/>
        <Route path='/Adminlogin' element={<Adminlogin/>}/>
        <Route path='/Userpg' element={<Userpg/>}/>
        <Route path='/Adminpg' element={<Adminpg/>}/>
      </Routes>
    </Router>
  );
}

export default App;
