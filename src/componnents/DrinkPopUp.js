const DrinkPopUp = ({setCommunication, blur, communication}) => {

    const closeWindow = () => {
        setCommunication('');
        blur('');
    }

    return (
        <div className="popUp absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center backdrop-blur-lg ">
            <div className="popUpBox min-w-[250px] max-w-[400px] min-h-[300px] bg-red-200 drop-shadow-lg text-lg rounded-lg">
                <div className="communicationText ">{communication}</div>
            </div>
            <button className='absolute top-4 right-4' onClick={closeWindow}>X</button>
        </div>
    )
}

export default DrinkPopUp;
