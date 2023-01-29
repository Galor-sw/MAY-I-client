import ChatButton from "./ChatButton";
import DrinkButton from "./DrinkButton";

const Card = ({myId, user, communicationDrink, communicationChat, closeCard, blur, socket}) => {
    let pic;
    if (user.type === 2) {
        pic = 'man ';
    } else if (user.type === 3) {
        pic = 'woman ';
    }
    return (
        <div className="min-w-[250px] max-w-[250px] bg-emerald-100 place-self-center rounded-lg gap-2 m-2">
            <div className={`grid`}>
                <button className={`text-xl place-self-end pr-2`} onClick={() => closeCard('')}>x</button>
            </div>
            <div className={`px-2 pb-2 rounded-lg`}>
                <div className="userName grid grid-flow-row place-items-center">
                    <div className="relative w-40 h-40 my-2">
                        <img className="rounded-full shadow-sm"
                             src={user.user_id.image.ImageUrl}
                             alt="user image"/>
                    </div>
                </div>
            </div>
            <div className={`bg-white rounded-b-lg pt-2`}>
                <div className={`text-xl place-items-center grid mb-2`}>
                    {user.user_id.firstname[0].toUpperCase() + user.user_id.firstname.substring(1).toLowerCase()} {user.user_id.lastname[0].toUpperCase() + user.user_id.lastname.substring(1).toLowerCase()}
                </div>
                <div className="mail grid border-b-2 border-black">
                </div>
                <div className={`grid border-b-2 border-black`}>
                    <div className={`m-2 ml-8`}>
                        <div> Age:
                        </div>
                        {user.user_id.age}
                        <div> About me:
                        </div>
                        {user.user_id.description}
                    </div>
                </div>
                <div className="grid place-center grid-flow-col gap-1">
                    <DrinkButton communication={communicationDrink} userId={user.user_id._id} blur={blur}
                                 socket={socket}/>
                    <ChatButton myId={myId} communication={communicationChat} userId={user.user_id._id}
                                socket={socket}/>
                </div>
            </div>
        </div>
    )
}

export default Card;
