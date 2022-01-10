import {useState} from 'react'
import styles from '../styles/OptionDropDown.module.css'



export default function OptionDropDown({ name, options, onChange }) {

  const [selected, setSelected] = useState(0)
  function makeOnClick(i) {
    function onClick() {
      setSelected(i)
      onChange(options[i].id)
    }
    return onClick
  }
  return (
    <div className={styles.dropdown}>
      <a>{name}：{options[selected].display} ▼</a>
      <div className={styles.dropdownContent}>
        <ul>
          {options.map((e, i) => {
            if (i !== selected) {
              return <li key={options[i].id} onClick={makeOnClick(i)}>{options[i].display}</li>
            } else {
              return <li className={styles.selected} key={options[i].id} onClick={makeOnClick(i)}>{options[i].display}</li>
            }
          })}
        </ul>
      </div>
    </div>
  )
}