import React, { useEffect, useState } from 'react'

import ReactDOM from 'react-dom'

const App = () => {
  if(false) {
    const [x, setX] = useState(1)
  }
  return <button onClick={() => setX(5)}>press</button>
}

ReactDOM.render(<App />, document.getElementById('root'))
