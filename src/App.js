import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Reset from './pages/reset/Reset';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import Tool from './pages/Tool/Tool';
import { Container } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Spinner from './components/Spinner/Spinner';
import Profile from './pages/profile/Profile';
import Weather from './pages/dashboard/Weather/Weather';
import CheckList from './pages/Tool/components/CheckList/CheckList';
import Notes from './pages/Tool/components/Notes/Notes';
import NewsFeed from './pages/dashboard/News/News';
import Recipes from './pages/dashboard/Recipes/Recipes';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <Router>

    <div className="app">
      {loading ? 
        <Spinner />
        :
          
          (<div className='wrapper'>
            {user ?
            <Sidebar user={user} />
            :<div></div>
            }
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/reset" element={<Reset />} />
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/users" element={<Users />} />
              <Route exact path='/tools' element={<Tool />} />
              <Route exact path='/news' element={<NewsFeed />} />
              <Route exact path='/weather' element={<Weather />} />
              <Route exact path='/checklist' element={<CheckList />} />
              <Route exact path='/notes' element={<Notes />} />
              <Route exact path='/recipes' element={<Recipes />} />
              
            </Routes>
          </div>)
      }
    </div>
    </Router>
  );
}
export default App;
