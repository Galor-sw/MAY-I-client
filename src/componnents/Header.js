import LogOut from "../componnents/LogOut";

const Header = ({myId}) => {
    console.log(myId)
    return(
        <>
            <div className={'top'}>
                <img alt="My Image" className="my-image" src="https://res.cloudinary.com/dm2gqkilw/image/upload/v1674659084/users_profile/may-i_orgnc7.png"/>
                <LogOut myId={myId}/>
            </div>
        </>
    )
}

export default Header
