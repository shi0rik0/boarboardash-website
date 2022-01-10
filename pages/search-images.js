import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react'
import styles from '../styles/search-images.module.css'
import NewsHit from "../components/NewsHit";
import config from "../config";
import axios from "axios";

function getBase64(file, callback) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    let data = reader.result
    let i = data.indexOf('base64') + 7
    callback(data.slice(i))
  }
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}



export default function SearchImages() {
  const [file, setFile] = useState(null)
  const [urls, setUrls] = useState([])
  function callback(result) {
    // console.log(result.slice(0, 100))
    // console.log(result.slice(result.length - 100, result.length))
    axios.post(config.searchImagesApiUrl, {
      data: result,
      max_num_hits: 100,
    }).then(res => {
      setUrls(res.data.hits)
    }).catch(console.log)
  }
  function onSubmit(e) {
    e.preventDefault()
    getBase64(file, callback)
  }
  function onFileChange(e) {
    let files = e.target.files
    setFile(files ? files[0] : null)
  }
  return (
    <div>
      <Head>
        <title>图片搜索 - BoarBoarDash</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="" width={50} height={50} />
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <input className={styles.fileInput} type="file" onChange={onFileChange} />
            <input className={styles.fileSubmit} type="submit" value="图片搜索" />
          </form>
        </div>
      </header>
      <main>
        {urls.map(i => (
          <a className={styles.image} key={i} href={i}>
            <img src={i} alt="" />
          </a>
        ))}
      </main>
    </div>
  )
}