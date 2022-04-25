import { useState } from 'react';
import api from './api';

function Login(){
        
    function logIn(){
        api.post('login/',{
            password: password,
            username: username
        })
        .then((res) =>{
            console.log(res);
            localStorage.setItem('token', res['data']['token']);
            localStorage.setItem('username', username);
        })
        .catch((err)=>{console.log(err)});
    };
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function get(){
        api.get('test/')
        .then((res)=>{
        console.log(res);
        })
    }
    return(
        <div>
        <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} />
        <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
        <button onClick= {logIn}>Login</button>
    
        <button onClick = {get}>get</button>
        </div>
        
    );
}

export default Login;