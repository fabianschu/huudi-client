import axios from 'axios'
import React, { useEffect } from 'react'

const hubs = () => {
  useEffect(() => {
    axios
      .get('http://localhost:5000/hubs')
      .then((r) => console.log(r))
      .catch((e) => console.log(e))
  }, [])

  return <div>hubs</div>
}

export default hubs
