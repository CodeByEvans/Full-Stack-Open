const Notification = ({message, type}) => {
    if (!message) return null

    const notificationStyle = {
        color: type === 'error' ? 'red' : 'green', 
        background: 'lightgray',
        fontSize: '20px',
        border: '2px solid red',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px'
    }

    return (
        <div className="notification" style={notificationStyle}>
          {message}
        </div>
      )
}
export default Notification