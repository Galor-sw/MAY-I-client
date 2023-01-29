import {Route, Routes} from 'react-router-dom';
import App from "../App";
import Login from "../componnents/Login";
import Chat from "../componnents/Chat"
import QRScanner from "../componnents/QR";


const ReactRouter = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Login/>}></Route>
            <Route exact path='/home' element={<App/>}/>
            <Route exact path='/QR/:id' element={<QRScanner/>}/>
            <Route exact path='/chat' element={<Chat/>}/>
        </Routes>
    )
}

export default ReactRouter;
