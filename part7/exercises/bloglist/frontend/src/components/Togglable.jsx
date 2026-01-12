import { useState, useImperativeHandle } from 'react'

import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <Button variant="dark" className="mb-2" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}{' '}
        <Button
          variant="outline-danger"
          className="mb-2"
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </>
  )
}

export default Togglable
