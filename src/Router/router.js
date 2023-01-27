import {Route, Routes} from 'react-router-dom';
import App from "../App";
import Login from "../componnents/Login";
import QR from "../componnents/QR";
import Chat from "../componnents/Chat"

const ReactRouter = () => {

    return (
        <Routes>
            <Route exact path='/' element={<Login/>}></Route>
            <Route exact path='/home' element={<App/>}/>
            <Route exact path='/QR' element={<QR/>}/>
            <Route exact path='/chat' element={<Chat/>}/>
        </Routes>
    )
}

export default ReactRouter;
