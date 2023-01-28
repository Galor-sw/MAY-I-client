import React, {useState} from 'react';
import QrReader from 'react-qr-scanner'
import axios from 'axios';

const QRScanner = (props) => {
    const [result, setResult] = useState(null);

    const handleScan = (data) => {
        setResult(data);
        if (data) {
            const currentUrl = window.location.href;
            const userID = currentUrl.split('/')[4];
            const url = new URL(data.text);
            const searchParams = new URLSearchParams(url.search);
            const row = searchParams.get("row");
            const col = searchParams.get("col");
            const userData = {
                "user_id": userID,
                "seat": {
                    "row": row,
                    "col": col
                }
            }
            axios.post('http://localhost:4020/connected/user', userData)
                .then(res => {
                    if (res.status == 200) {
                        window.location.replace(`${url.href}&userId=${userID}`);
                    }
                })
                .catch(err => {
                    alert("chair already in use");
                    console.log(err);
                    window.location.href = 'http://localhost:4020';
                });
        }
    }

    const handleError = (err) => {
        console.error(err);
    }

    return (
        <div className={`grid place-items-center h-screen`}>
            <div className={`grid place-items-center`}>
                <p className={`font-[Helvetica Neue] text-4xl`}>Please scan the QR code on your chair</p>
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{width: '400px', height: '400px'}}
                />
                <div id="result">{result}</div>
            </div>
        </div>
    );
}

export default QRScanner;
