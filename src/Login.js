import { useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

function Login(){
    const history = useNavigate();

    const [msg, setMsg] = useState("");
    function HandleLogIn(){
        api.post('login/',{
            password: password,
            username: username
        })
        .then((res) =>{
            console.log(res);
            localStorage.setItem('token', res['data']['token']);
            localStorage.setItem('username', username);
            history('/');
            window.location.reload(false);
        })
        .catch((err)=>{setMsg(err.response.data.msg)});
    };

    function handleSignUP(){
        api.post('signup/', {
            username: username,
            password: password
        })
        .then(res => {console.log(res); setMsg(res.data.msg)})
        .catch(err => {console.log(err);})
    }
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    return(
        <div>
        <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} /> <br/>
        <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} /><br/>
        <button onClick= {HandleLogIn}>Log in</button>
        <button onClick= {handleSignUP}>Sign up</button>
        <p>{msg}</p>
        </div>
        
    );
}

export default Login;