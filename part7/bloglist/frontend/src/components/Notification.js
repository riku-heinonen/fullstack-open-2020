import { Message } from 'semantic-ui-react'
import React from 'react'
import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector((state) => state.notification)
  return (
    <>
      {notification &&
        (notification.type === 'success' ? (
          <Message success header={notification.message}></Message>
        ) : (
          <Message negative header={notification.message}></Message>
        ))}
    </>
  )
}

export default Notification
