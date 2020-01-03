import React from "react"
import styles from "./Input.module.css"

const Input = props => {
  return (
    <div className={`${styles.wrap} ${props.className}`}>
      <label htmlFor={`input-${props.id}`} className={styles.label}>
        {props.label}
      </label>
      <input
        type="text"
        id={`input-${props.id}`}
        placeholder={props.placeholder}
        className={styles.input}
      />
    </div>
  )
}

Input.defaultProps = {
  className: null,
  id: "0",
  placeholder: "Placeholder",
  label: "Label",
  secondary: false
}

export default Input
