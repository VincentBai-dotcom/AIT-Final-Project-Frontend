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
        .then(res => {setMsg(res.data.msg)})
        .catch(err => {console.log(err);})
    }
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    return(
        <div>
            <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Username" className="form-control block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/> <br/>
            <input placeholder="Password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className = "form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/><br/>
            <button onClick= {HandleLogIn} className = "inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Log in</button>
            <button onClick= {handleSignUP} className = "inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign up</button>
            {msg && (<div className="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
            </svg>
                {msg}
            </div>)}
        </div>
        
    );
}

export default Login;