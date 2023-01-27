const ChatButton = ({name}) => {
    return (
        <button className={`chat m-1 bg-contain bg-no-repeat w-10 h-10 place-self-center ${name}`}
                onClick={openChat}></button>
    )
}

export default ChatButton;
