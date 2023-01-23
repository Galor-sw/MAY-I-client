import React from 'react';
import  { withSocket }  from './withSocket';

const DrinkButton = ({func, blur, socket}) => {
    const anotherFunc = () => {
        console.log('dor - this is the drink button')
        socket.emit('testing', "test worked here!")

    }

    const submit = () => {
        func('drink');
        blur('blur-md');
        anotherFunc();
    }
    return (
        <button className={'drink m-1 bg-contain bg-no-repeat w-10 h-10 place-self-center'} onClick={submit}></button>
    )
}

export default withSocket(DrinkButton);
