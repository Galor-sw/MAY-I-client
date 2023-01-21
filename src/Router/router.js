import {Route, Routes} from 'react-router-dom';
import App from "../App";
import Login from "../componnents/Login";
import QR from "../componnents/QR";

const ReactRouter = () => {

    return (
        <Routes>
            <Route exact path='/' element={<Login/>}></Route>
            <Route exact path='/home' element={<App/>}/>
            <Route exact path='/QR' element={<QR/>}/>
        </Routes>
    )
}

export default ReactRouter;
