import React from 'react'
import {Spinner} from 'reactstrap'

const Loader = () => {
  return (
    <div>
        <Spinner
        color="primary"
        type="grow"
    >
  Loading...
</Spinner>
    </div>
  )
}

export default Loader