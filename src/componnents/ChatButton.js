import  { withSocket }  from './withSocket';

const ChatButton = ({name, socket}) => {

    const submit = () => {
        console.log(name)
        socket.emit('testing', name)
    }

    return (
        <button className='chat m-1 bg-contain bg-no-repeat w-10 h-10 place-self-center' onClick={submit}></button>
    )
}

export default withSocket(ChatButton);
