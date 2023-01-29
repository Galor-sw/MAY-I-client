import MapPixel from "./mapPixel";
import {useEffect, useState} from "react";


const Map = ({changeUser, users}) => {
    const [locationMap, setLocation] = useState([
        [
            {gender: 1, user_id: ''}, {gender: 1, user_id: ''}, {gender: 1, user_id: ''}, {gender: 1, user_id: ''},
            {gender: 1, user_id: ''}, {gender: 1, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}],
        [
            {gender: 1, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 1, user_id: ''}, {gender: 1, user_id: ''},
            {gender: 1, user_id: ''}, {gender: 1, user_id: ''}, {gender: 0, user_id: ''}],
        [
            {gender: 1, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}],
        [
            {gender: 1, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}],
        [
            {gender: 1, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 1, user_id: ''},
            {gender: 1, user_id: ''}, {gender: 1, user_id: ''}, {gender: 1, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 1, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 1, user_id: ''}, {gender: 0, user_id: ''}],
        [
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 1, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 1, user_id: ''}, {gender: 0, user_id: ''}],
        [
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 1, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 1, user_id: ''}, {gender: 0, user_id: ''}],
        [
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 1, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 1, user_id: ''}, {gender: 0, user_id: ''}],
        [
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 1, user_id: ''},
            {gender: 1, user_id: ''}, {gender: 1, user_id: ''}, {gender: 1, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}],
        [
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 1, user_id: ''},
            {gender: 1, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}],
        [
            {gender: 1, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''}, {gender: 0, user_id: ''},
            {gender: 0, user_id: ''}, {gender: 0, user_id: ''}],
    ]);

    const changeCard = (user) => {
        changeUser(user);
    }

    const setMap = (user, row, col) => {
        const updateMap = [...locationMap];
        const gender = user.gender === 'male' ? 2 : 3;
        updateMap[row][col] = {gender: gender, user: user._id};
        setLocation(updateMap);
    };
    const [usersSeted, setUsersSeted] = useState(false);

    useEffect(() => {
        const updateMap = [...locationMap];
        users.map((index, key) => {
            setMap(index.user_id, index.seat.row, index.seat.col);
        })
        setUsersSeted(true);
    }, []);

    return (
        <div className="border-2 border-black">
            {usersSeted && <div className="grid max-w-[390px] md:max-w-[900px] md:min-w-[400px]">
                {locationMap.map((row, key) => {
                        return (
                            <div key={key} className="grid grid-flow-col">
                                {row.map((index, key) =>
                                    <MapPixel key={key} user={index} changeCard={changeCard}/>)}
                            </div>
                        )
                    }
                )}
            </div>}
        </div>
    )
}

export default Map;
