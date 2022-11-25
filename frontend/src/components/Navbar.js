import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>My Workout</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span className='user-email-information'>{user.email}</span>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}

                    {!user && (
                        <div>
                            <Link to='/login'>Login</Link>
                            <Link to='/register'>Register</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
