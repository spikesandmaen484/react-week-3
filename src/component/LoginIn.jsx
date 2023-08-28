import { useState } from 'react';
import axios from 'axios';

const LoginIn = ({ setToken, url }) => {
    const [err, setErr] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[msg, setMsg] = useState('');

    const logIn = async() => {
        try {
            const response = await axios.post(`${url}/users/sign_in`, {
                email: email,
                password: password
            });
            setToken(response.data.token);
            setMsg('登入成功. Token: ' + response.data.token);
            setErr(false);
        } catch (error) {
            setMsg('登入失敗:' + error.message);
            setErr(true);
        }
    };

    return(<div id="loginPage">
        <div className="container">
            <div>
                <div className='table'>
                    <h2>登入</h2>
                    <label htmlFor="logInEmail">
                        Email
                    </label>
                    <input type="email" id="logInEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='請輸入 email' />
                    <br/>
                    <label htmlFor="logInPassword">
                        Password
                    </label>
                    <input type="password" id="logInPassword" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='請輸入 password' />
                    <br/>
                    <p className={`mt-1 ${err ? "error-text" : "success-text"}`}>
                        {msg}
                    </p>
                    <button type="submit" onClick={logIn}>
                        登入
                    </button>
                </div>
            </div>
        </div>
    </div>)
}

export default LoginIn;