import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from "next/router";
import {useState, useEffect} from 'react'
import styles from '../styles/search-news.module.css'
import NewsHit from '../components/NewsHit'
import OptionDropDown from "../components/OptionDropDown";
import config from '../config'
import axios from "axios";

const timeOptions = [
  {
    'id': 0,
    'display': '所有时间',
  },
  {
    'id': 1,
    'display': '一天内',
  },
  {
    'id': 2,
    'display': '三天内',
  },
  {
    'id': 3,
    'display': '一周内',
  },
  {
    'id': 4,
    'display': '一个月内',
  },
]

const categoryOptions = [
  {
    'id': '',
    'display': '所有类型',
  },
  {
    'id': '国际',
    'display': '国际',
  },
  {
    'id': '财经',
    'display': '财经',
  },
  {
    'id': '体育',
    'display': '体育',
  },
  {
    'id': '娱乐',
    'display': '娱乐',
  },
]

export default function SearchNews() {
  const {query} = useRouter()
  const [keyword, setKeyword] = useState('')
  const [hits, setHits] = useState([])
  const [timeLimit, setTimeLimit] = useState(0)
  const [category, setCategory] = useState('')
  function search(start, end, refresh) {
    let query = {
      content: keyword,
      start,
      end,
    }
    let date = new Date()
    switch (timeLimit) {
      case 1:
        date.setDate(date.getDate() - 1)
        break
      case 2:
        date.setDate(date.getDate() - 3)
        break
      case 3:
        date.setDate(date.getDate() - 7)
        break
      case 4:
        date.setDate(date.getDate() - 30)
        break
    }
    if (timeLimit !== 0) {
      let dd = String(date.getDate()).padStart(2, '0');
      let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = date.getFullYear();
      let dateString = yyyy + '-' + mm + '-' + dd;
      query.date_from = dateString
    }


    if (category) {
      query.categories = [category]
    }
    axios.post(config.searchNewsApiUrl, query).then(res => {
      let a = []
      for (let i of res.data.hits) {
        console.log(i)
        a.push({
          title: i.title,
          url: i.url,
          snippet: i.highlight,
        })
      }
      if (refresh) {
        setHits(a)
      } else {
        setHits([...hits, ...a])
      }
    }).catch(console.log)
  }
  function onSubmit(e) {
    e.preventDefault()
    search(0, 10, true)
  }
  function searchMore() {
    search(hits.length, hits.length + 10, false)
  }
  useEffect(() => {
    if (query.keyword) {
      setKeyword(query.keyword)
      search(0, 10, true)
    }
  }, [])
  useEffect(() => {
    search(0, 10, true)
  }, [timeLimit, category])
  return (
    <div>
      <Head>
        <title>新闻搜索 - BoarBoarDash</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="" width={50} height={50} />
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <input className={styles.searchInput} type="text" placeholder="输入关键词" value={keyword} onChange={e => setKeyword(e.target.value)} />
            <input className={styles.searchSubmit} type="submit" value="新闻搜索" />
          </form>
        </div>
      </header>
      <main>
        <div className={styles.options}>
          <div className={styles.optionWrapper}>
            <OptionDropDown name="时间" options={timeOptions} onChange={setTimeLimit} />
          </div>
          <div className={styles.optionWrapper}>
            <OptionDropDown name="类别" options={categoryOptions} onChange={setCategory} />
          </div>
        </div>
        <div className={styles.hits}>
          { hits.map(i => (<div key={hits.url} className={styles.hit}><NewsHit {...i} /></div>)) }
          <button onClick={searchMore}>获得更多页面</button>
        </div>
      </main>
    </div>
  )
}