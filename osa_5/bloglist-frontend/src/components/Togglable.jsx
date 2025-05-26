import { useState } from "react"
import Button from "./Button"
import PropTypes from "prop-types"

const Togglable = (props) => {
  const buttonStyle = {
    color: "white",
    backgroundColor: "#4C5C68",
    margin: "5px"
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button text={props.showLabel} onClick={toggleVisibility} style={buttonStyle}/>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button text={props.hideLabel} onClick={toggleVisibility} style={buttonStyle} />
      </div>
    </div>
  )
}

Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
  
}

export default Togglable