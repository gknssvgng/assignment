import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar'
import SettingsPage from './Components/Settings';
import People from './Components/People'
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route exact path ="/" Component={Home}/>
    <Route exact path ="/people" Component={People}/>
    
    <Route exact path ="/settings" Component={SettingsPage}/>
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
