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

    {isAuthenticated &&
      (<NavLink to='/myentries' className={styles.nav__home}>
        My Entries
      </NavLink>)
    }

     {/*  <div className={styles.nav__home}>
        {isAuthenticated ? (
          <NavLink to='/home' >
            Home
          </NavLink>
        ) : (
          <>
            <NavLink to='/'>Home</NavLink>
            
          </>
        )}
      </div> */}

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
