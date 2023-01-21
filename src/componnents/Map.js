import MapPixel from "./mapPixel";
import axios from "axios";
import {useEffect, useState} from "react";


const Map = ({changeUser}) => {
    const [locationMap, setLocation] = useState([
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    const changeCard = ({number}) => {
        changeUser(number);
    }

    const setMap = (row, col) => {
        const updateMap = [...locationMap];
        updateMap[row][col] = 2;
        setLocation(updateMap);
    }

    useEffect(() => {
        // function to run only once on component load

        const bringData = async () => {
            try {
                console.log('mapping');
                await axios.get(`http://localhost:4020/connected/connectedUsers`)
                    .then(response => {
                            response.data.map((index, key) => {
                                console.log('@@@@@@@@@@@');
                                console.log(index.seat);
                                setMap(index.seat.row, index.seat.col);
                            })
                        }
                    );
            } catch (error) {
                console.log(error)
            }

        }
        bringData().then(r => console.log(r));
    }, []);

    return (
        <div>
            <div className="grid max-w-[900px] min-w-[500px]">
                {locationMap.map((row, key) => {
                        return (
                            <div key={key} className="grid grid-flow-col">
                                {row.map((index, key) =>
                                    <MapPixel key={key} number={index} changeCard={changeCard}/>)}
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}

export default Map;
