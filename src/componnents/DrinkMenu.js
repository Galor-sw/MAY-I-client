import {useState} from "react";

const drinks = [
    {name: 'Rum and Coke', price: 8.00},
    {name: 'Gin and Tonic', price: 9.00},
    {name: 'Vodka Martini', price: 11.00},
    {name: 'Whiskey Sour', price: 10.00},
    {name: 'Margarita', price: 12.00},
    {name: 'Mojito', price: 9.00},
    {name: 'Sex on the Beach', price: 12.00},
];

const DrinkMenu = ({sender, socket, setCommunication, blur, communication}) => {

    const closeWindow = () => {

        setCommunication('');
        blur('');
    }

    const sendDrink = () => {

        //move to chat (with roomId)
        socket.emit('drinkInvite', {
            sender: sender,
            userId: communication,
            drink: selectedDrinks
        })

        setCommunication('');
        blur('');
    }

    const [selectedDrinks, setSelectedDrinks] = useState([]);

    const handleChange = (event) => {
        if (event.target.checked) {
            setSelectedDrinks([event.target.value]);
        } else {
            setSelectedDrinks(selectedDrinks.filter((drink) => drink !== event.target.value));
        }
    };

    return (
        <div className="popUp absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center backdrop-blur-lg ">
            <div className="popUpBox min-w-[280px] max-w-[280px] min-h-[300px] bg-red-200 drop-shadow-lg text-lg rounded-lg">
                <h1 className="mt-8 font-[Helvetica Neue]">Drinks Menu</h1>
                <form className="flex flex-col mt-5 mb-5">
                    {drinks.map((drink) => (
                        <label key={drink.name} className=" mt-2 font-[Helvetica Neue]">
                            <input  className=" mr-2"
                                type="checkbox"
                                value={drink.name}
                                onChange={handleChange}
                                checked={selectedDrinks.includes(drink.name)}
                            />
                            {drink.name} - ${drink.price}
                        </label>
                    ))}
                </form>
                {selectedDrinks.length > 0 && (
                    <button className='mt-3 mb-8 mx-5 approveButton font-[Helvetica Neue]' onClick={sendDrink}>
                        {selectedDrinks}
                    </button>
                )}
            </div>
            <button className='absolute top-4 right-4' onClick={closeWindow}>X</button>
        </div>


    )
}

export default DrinkMenu;
