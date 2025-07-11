import { useState } from "react"

export const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue("")
  }

  const style = {
    margin: "5px 0px",
  }

  const attributes = {
    type,
    value,
    onChange,
    style,
  }

  return {
    type,
    value,
    onChange,
    reset,
    style,
    attributes,
  }
}
