import { Alert } from "react-bootstrap"
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification.message) {
    return null
  }

    return (
        <div className="notification">
          {(notification &&
            <Alert variant={notification.type} transition={true} dismissible>
              {notification.message}
            </Alert>
          )}
        </div>
      )
}
export default Notification