import React, {useState} from 'react';
import QrReader from 'react-qr-scanner'
import axios from 'axios';
import Header from "./Header";

const QRScanner = () => {
    const [result, setResult] = useState(null);
    const [location, setLocation] = useState(window.location.origin);
    let clientURL;
    let serverURL
    if (location == 'http://localhost:3000') {
        clientURL = 'http://localhost:3000';
        serverURL = 'http://localhost:4020';
    } else {
        clientURL = 'https://may-i-client.onrender.com';
        serverURL = 'https://may-i.onrender.com';
    }
    const currentUrl = window.location.href;
    let userID = currentUrl.split('/')[4];

    const handleScan = (data) => {
        setResult(data);
        if (data) {
            const url = new URL(data.text);
            const searchParams = new URLSearchParams(url.search);
            const row = searchParams.get("row");
            const col = searchParams.get("col");
            // eslint-disable-next-line react-hooks/rules-of-hooks
            console.log('scanQR');
            // axios.defaults.headers.common['Access-Control-Allow-Origin'] = `${clientURL}`;
            const userData = {
                "user_id": userID,
                "seat": {
                    "row": row,
                    "col": col
                }
            }
            axios.post(`${serverURL}/connected/user`, userData)
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        console.log(`${clientURL}&userId=${userID}`);
                        window.location.replace(`${clientURL}/home/?myId=${userID}`);
                    }
                })
                .catch(err => {
                    alert("chair already in use");
                    console.log(err);
                    window.location.href = `${clientURL}`;
                });
        }
    }

    const handleError = (err) => {
        console.error(err);
    }

    return !userID ? null : (
        <>
            <Header myId={userID}/>
            <div className={`grid place-items-center h-screen`}>
                <div className={`grid place-items-center`}>
                    <p className={`font-[Helvetica Neue] text-xl md:text-4xl`}>Please scan the QR code on your chair</p>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{width: '400px', height: '400px'}}
                    />
                    <div id="result">{result}</div>
                </div>
            </div>
        </>
    );
}

export default QRScanner;
