import ChatButton from "./ChatButton";
import DrinkButton from "./DrinkButton";

const Card = ({user, func, blur}) => {
    console.log('Card User: ', user);
    let pic;
    if (user.type === 2) {
        pic = 'man ';
    } else if (user.type === 3) {
        pic = 'woman ';
    }
    return (
        <div className="min-w-[250px] max-w-[400px] bg-red-200 place-self-center rounded-xl gap-2 m-2">
            <div className={`bg-emerald-100 p-2`}>
                <div className="userName grid grid-flow-row place-items-center">
                    <div className="relative w-40 h-40">
                        <img className="rounded-full shadow-sm"
                             src={user.user_id.image.ImageUrl}
                             alt="user image"/>
                    </div>
                </div>
            </div>
            <div className={`bg-white`}>
                <div className={`text-xl place-items-center grid`}>
                    {user.user_id.firstname[0].toUpperCase() + user.user_id.firstname.substring(1).toLowerCase()} {user.user_id.lastname[0].toUpperCase() + user.user_id.lastname.substring(1).toLowerCase()}
                </div>
                <div className="mail grid border-b-2 border-black">
                </div>
                <div className={`grid border-b-2 border-black`}>
                    <div className={`m-2 ml-8`}>
                        <div> About me:
                        </div>
                        {user.user_id.description}
                    </div>
                </div>
                <div className="grid place-center grid-flow-col gap-1">
                    <DrinkButton func={func} blur={blur}/>
                    <ChatButton func={func}/>
                </div>
            </div>
        </div>
    )
}

export default Card;
