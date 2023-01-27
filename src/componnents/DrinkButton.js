const DrinkButton = ({communication, blur}) => {

import React from 'react';
import  { withSocket }  from './withSocket';

const DrinkButton = ({func, blur, socket}) => {
    const anotherFunc = () => {
        console.log('dor - this is the drink button')
        socket.emit('testing', "test worked here!")

    }

    const openDrinkMenu = () => {
        communication('drink');
        blur('blur-md');
    }
    return (
        <button className={'drink m-1 bg-contain bg-no-repeat w-10 h-10 place-self-center'}
                onClick={openDrinkMenu}></button>
    )
}

export default withSocket(DrinkButton);
