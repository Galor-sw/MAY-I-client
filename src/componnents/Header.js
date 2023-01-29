import LogOut from "../componnents/LogOut";

const Header = ({myId}) => {
    return(
        <>
            <div className="top bg-[#f6d2d6] border-b-2 border-black">
                <div className="max-w-[150px] ml-10 my-5">
                    <img alt="My Image" className="rounded-[30px] " src="https://res.cloudinary.com/dm2gqkilw/image/upload/v1675013435/users_profile/Love_Happy_Valentine_s_day_Logo_Gradient_Heart_2_byt9dy.png"/>
                </div>
                <LogOut myId={myId}/>
            </div>
        </>
    )
}

export default Header
