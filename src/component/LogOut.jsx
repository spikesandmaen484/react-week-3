import { useState } from 'react';
import axios from 'axios';

const LogOut = ({ token, setToken, url, setCheck }) => {
    const [err, setErr] = useState(false);
    const [msg, setMsg] = useState('');

    const logOut = async() => {
        
        try {
            const response = await axios.post(`${url}/users/sign_out`, {},{
                headers: {
                    Authorization: token
                }
            });

            //測試用
            console.log(response.data);

            setMsg('登出成功!');
            setToken("");
            setErr(false);
            setCheck(false);
        } catch (error) {
            setMsg('登出失敗:' + error.message);
            setErr(true);
            setCheck(true);
        }
    };
    
    return(<div id="logoutPage">
        <div className="container">
            <div>
                <div className='table'>
                    <h2>登出</h2>
                    <label htmlFor="logOutToken">
                        Token
                    </label>
                    <input type="text" id="logOutToken" value={token} onChange={(e) => setToken(e.target.value)} placeholder='請輸入 token' />
                    <br/>
                    <p className={`mt-1 ${err ? "error-text" : "success-text"}`}>
                        {msg}
                    </p>
                    <button type="submit" onClick={logOut}>
                        登出
                    </button>
                </div>
            </div>
        </div>
    </div>)
}

export default LogOut;