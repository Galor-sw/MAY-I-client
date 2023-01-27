const mapPixel = ({user, changeCard}) => {
    let color;
    if (user.gender === 1) {
        color = 'bg-black cursor-auto';
    } else if (user.gender === 2) {
        color = 'man';
    } else if (user.gender === 3) {
        color = 'woman';
    } else color = 'floor object-scale-down cursor-auto';


    const submit = () => {
        changeCard(user.user);
    }

    const nothing = () => {

    }

    return (
        <button className={color + ' w-10 h-10 bg-contain'}
                onClick={user.gender <= 1 ? nothing : submit}
                type="button"
        >
        </button>
    )
}

export default mapPixel;
