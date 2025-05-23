import { useState } from "react"
import Button from "./Button"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button text={props.showLabel} onClick={toggleVisibility} />
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button text={props.hideLabel} onClick={toggleVisibility} />
      </div>
    </div>
  )
}

export default Togglable