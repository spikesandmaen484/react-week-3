import { useState } from "react";
import axios from 'axios';

const SignUp = ({ url }) => {
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const signUp = async() => {
        try {
            const response = await axios.post(`${url}/users/sign_up`, {
                email: email,
                password: password,
                nickname: nickname
            });
            setMsg('註冊成功. UID: ' + response.data.uid);
            setErr(false);
        } catch(error)  {
            setMsg('註冊失敗:' + error.message);
            setErr(true);
        }
    };
    
    return(<div id="signUpPage">
        <div className="container">
            <div>
                <div className="table">
                    <h2>註冊</h2>
                    <label htmlFor="signUpEmail">
                        Email
                    </label>
                    <input type="email" id="signUpEmail" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='請輸入 email' />
                    <br/>
                    <label htmlFor="signUpPassword">
                        Password
                    </label>
                    <input type="password" id="signUpPassword" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='請輸入 password' />
                    <br/>
                    <label htmlFor="signUpNickname">
                        Nickname
                    </label>
                    <input type="text" id="signUpNickname" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder='請輸入您的 nickname' />
                    <br/>
                    <p className={`mt-1 ${err ? "error-text" : "success-text"}`}>
                        {msg}
                    </p>
                    <button type="submit" onClick={signUp}>
                        註冊
                    </button>
                </div>
            </div>
        </div>
    </div>);
}

export default SignUp;