import {useState} from 'react'
import styles from '../styles/NewsHit.module.css'

export default function NewsHit({title, url, snippet}) {
  return (
    <div className={styles.wrapper}>
      <a href={url}>{title}</a>
      <p>{snippet}</p>
      <p>{url}</p>
    </div>
  )
}