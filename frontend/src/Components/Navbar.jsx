import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            
           
            <ul className="navbar-nav">
                <li><Link to="/people">People</Link></li>
               
                <li><Link to="/settings">Settings</Link></li>
            </ul>
            
        </nav>
    );
}
