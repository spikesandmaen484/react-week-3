import { useState } from 'react';
import axios from 'axios';

const CheckOut = ({ url }) => {
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState(false);
    const[token, setToken] = useState('');

    const checkOut = async() => {
        // 將 Token 儲存，到期日為明天
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.cookie = `hexschoolTodo=${token}; expires=${tomorrow.toUTCString()}`;
        
        try {
            const response = await axios.get(`${url}/users/checkout`, {
                headers: {
                    Authorization: token
                }
            });
            setMsg('驗證成功. UID: ' + response.data.uid);
            setErr(false);
        } catch (error) {
            setMsg('驗證失敗:' + error.message);
            setErr(true);
        }
    };
    
    return(<div id="checkOutPage">
        <div className="container">
            <div>
                <h2>驗證</h2>
                <input type="text" id="checkout" value={token} onChange={(e) => setToken(e.target.value)} placeholder='請輸入 token' />
                <br/>
                <p className={`mt-1 ${err ? "error-text" : "success-text"}`}>
                    {msg}
                </p>
                <button type="submit" onClick={checkOut}>
                    驗證
                </button>
            </div>
        </div>
    </div>)
}

export default CheckOut;