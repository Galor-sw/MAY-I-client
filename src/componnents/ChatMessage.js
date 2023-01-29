const ChatMessage = ({message}) => {
    return (
        <div className="message">
            <h4>{message.username}, {message.time}</h4>
            <p className="text">{message.text}</p>
        </div>
    )
}

export default ChatMessage;
