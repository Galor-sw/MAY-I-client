import React from 'react';

const DrinkButton = ({communication, blur, userId, socket}) => {

    const openDrinkMenu = () => {
        communication(userId);
        blur('blur-md');
    }

    return (
        <button className={'drink m-4 bg-contain bg-no-repeat w-10 h-10 place-self-center'}
                onClick={openDrinkMenu}></button>
    )
}

export default DrinkButton;
