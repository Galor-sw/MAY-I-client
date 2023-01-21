const QR = () => {


    return (
        <>
            <main>
                <div className="content">
                    <p>Please scan the QR code on your table</p>
                    <div id="reader"></div>
                    <div id="result"></div>
                </div>
            </main>
            <script crossOrigin="anonymous"
                    integrity="sha512-k/KAe4Yff9EUdYI5/IAHlwUswqeipP+Cp5qnrsUjTPCgl51La2/JhyyjNciztD7mWNKLSXci48m7cctATKfLlQ=="
                    referrerPolicy="no-referrer"
                    src="https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js">
            </script>
        </>
    )
}

export default QR;
