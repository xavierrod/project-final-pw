import { NavLink } from 'react-router-dom';

// Custom Hooks
import useAuth from '../hooks/useAuth';

// Styles
import styles from './Navbar.module.css';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav>
      <NavLink to='/' className={styles.nav__home}>
        Home
      </NavLink>

      {isAuthenticated && (
        <NavLink to='/upload' className={styles.nav__upload}>
          Upload
        </NavLink>
      )}


      <div className={styles.nav__auth}>
        {isAuthenticated ? (
          <NavLink to='/' onClick={logout}>
            Logout
          </NavLink>
        ) : (
          <>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
