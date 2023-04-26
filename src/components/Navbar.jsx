import { NavLink } from 'react-router-dom';

// Custom Hooks
import useAuth from '../hooks/useAuth';

// Styles
import styles from './Navbar.module.css';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.mainNav}>
      <NavLink to='/' className={styles.mainNav__a}>
        Inicio
      </NavLink>

      {isAuthenticated && (
        <NavLink to='/upload' className={styles.mainNav__a}>
          Upload
        </NavLink>
      )}

      {isAuthenticated ? (
        <NavLink to='/' className={styles.mainNav__a} onClick={logout}>
          logout
        </NavLink>
      ) : (
        <>
          <NavLink to='/login' className={styles.mainNav__a}>
            login
          </NavLink>
          <NavLink to='/signup' className={styles.mainNav__a}>
            Sign Up
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;
