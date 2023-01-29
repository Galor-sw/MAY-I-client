import ChatButton from "./ChatButton";
import DrinkButton from "./DrinkButton";

const Card = ({myId, user,communicationDrink, communicationChat, blur, socket}) => {
    console.log('Card User: ', user);
    console.log('My socket: ', socket);
    let pic;
    if (user.type === 2) {
        pic = 'man ';
    } else if (user.type === 3) {
        pic = 'woman ';
    }
    return (
        <div className="min-w-[250px] max-w-[250px] bg-emerald-100 place-self-center rounded-lg gap-2 m-2">
            <div className={`p-2 rounded-lg`}>
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
                <div className="mail grid">
                </div>
                <div className={`grid border-t-2 border-black`}>
                    <div className={`m-2 ml-8`}>
                        <div> Age:
                        </div>
                        {user.user_id.age}
                        <div> About me:
                        </div>
                        {user.user_id.description}
                    </div>
                </div>
                { myId != user.user_id._id && <div className="grid place-center grid-flow-col gap-1 border-t-2 border-black">
                    <DrinkButton communication={communicationDrink} userId={user.user_id._id} blur={blur} socket={socket}/>
                    <ChatButton myId={myId} communication={communicationChat} userId={user.user_id._id} socket={socket}/>
                </div>}
            </div>
        </div>
    )
}

export default Card;
