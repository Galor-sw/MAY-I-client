import {Route, Routes} from 'react-router-dom';
import App from "../App";
import Login from "../componnents/Login";

const ReactRouter = () => {

    return (
        <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/home' element={<App/>}/>
            <Route exact path='/xyz' element={<>xyz</>}/>
        </Routes>
    )
}

export default ReactRouter;
