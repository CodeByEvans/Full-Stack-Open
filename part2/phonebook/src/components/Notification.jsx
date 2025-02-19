const Notification = ({message, status}) => {
    if (message === null) {
        return null
    }

    const style = {
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    const errorStyle = {
        color: "red"
    }

    const successStyle = {
        color: "green"
    }

    return (
        <div style={
            status === "error"
            ? {...style, ...errorStyle}
            : {...style, ...successStyle}
        }>
            {message}
        </div>
    )
}

export default Notification