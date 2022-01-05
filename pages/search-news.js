import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from "next/router";
import {useState, useEffect} from 'react'
import styles from '../styles/search-news.module.css'
import NewsHit from '../components/NewsHit'
import config from '../config'
import axios from "axios";


export default function SearchNews() {
  const {query} = useRouter()
  const [keyword, setKeyword] = useState('')
  const [hits, setHits] = useState([])
  function onSubmit(e) {
    e.preventDefault()
    axios.post(config.searchNewsApiUrl, {
      content: keyword,
      start: 0,
      end: 2,
    }).then(res => {
      let a = []
      for (let i of res.data.hits) {
        console.log(i)
        a.push({
          title: i.title,
          url: i.url,
          snippet: i.highlight,
        })
      }
      setHits(a)
    }).catch(console.log)
  }
  useEffect(() => {
    alert(query.keyword)
    if (query.keyword) {
      setKeyword(query.keyword)
    }
  }, [])
  return (
    <div>
      <Head>
        <title>搜索新闻</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/vercel.svg" alt="" width={50} height={50} />
        </div>
        <div className={styles.searchBar}>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="输入关键词" value={keyword} onChange={e => setKeyword(e.target.value)}/>
            <input type="submit" />
          </form>
        </div>
        <div className={styles.functions}>
          <ul>
            <li>新闻</li>
            <li>图片</li>
          </ul>
        </div>
      </header>
      <main>
        <div className={styles.dropdown}>
          <button>点我</button>
          <div className={styles.dropdownContent}>
            <ul>
              <li>选项1</li>
              <li>选项1</li>
            </ul>
          </div>
        </div>
        { hits.map(i => <NewsHit {...i} />) }
        <button>获得更多页面</button>
      </main>
    </div>
  )
}