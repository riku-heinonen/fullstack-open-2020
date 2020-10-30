import React from 'react'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red', marginBottom: 20 }}>{errorMessage}</div>
}

export default Notify
