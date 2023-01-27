const DrinkButton = ({communication, blur}) => {

    const openDrinkMenu = () => {
        communication('drink');
        blur('blur-md');
    }
    return (
        <button className={'drink m-1 bg-contain bg-no-repeat w-10 h-10 place-self-center'}
                onClick={openDrinkMenu}></button>
    )
}

export default DrinkButton;
