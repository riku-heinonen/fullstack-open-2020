import React from 'react'

const baseStyle = {
	background: 'lightgrey',
	font: '20px',
	borderStyle: 'solid',
	borderRadius: '5px',
	padding: '10px',
	margin: '10px'
}

const errorStyle = {
	color: 'red',
	...baseStyle
}

const successStyle = {
	color: 'green',
	...baseStyle
}

const Notification = ({ message, type }) => {
	if (message === null) {
		return null
	}

	return <div style={type === 'success' ? successStyle : errorStyle}>{message}</div>
}

export default Notification
