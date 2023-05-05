import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from './Navbar.module.css';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <NavLink to='/' className={styles.nav__home}>
        Inicio
      </NavLink>

    {isAuthenticated &&
      (<NavLink to='/myentries' className={styles.nav__home}>
        Mis publicaciones
      </NavLink>)
    }

      {isAuthenticated && (
        <NavLink to='/upload' className={styles.nav__upload}>
          Post
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
