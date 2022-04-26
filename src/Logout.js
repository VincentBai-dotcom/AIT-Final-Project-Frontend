import { useNavigate } from 'react-router-dom';

function Logout(){
    const history = useNavigate();
    function handleLogOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        history('/');
    }
    return (
        <button onClick = {handleLogOut}>Log out</button>
    );
}

export default Logout;