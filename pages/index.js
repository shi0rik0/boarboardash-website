import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from "next/router";
import {useState} from 'react'
import styles from '../styles/index.module.css'

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default function Index() {
  const [keyword, setKeyword] = useState('')
  const router = useRouter()
  function onSubmit(e) {
    e.preventDefault()
    router.push({
      pathname: '/search-news',
      query: {keyword: 'kw'},
    })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>BoarBoarDash</title>
      </Head>
      <main className={styles.main}>
        <Image src="/vercel.svg" alt="" width={100} height={100} />
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="输入关键词" value={keyword} onChange={e => setKeyword(e.target.value)} />
          <input type="submit" />
        </form>
        <p>或者</p>
        <button>图片搜索</button>
      </main>
      <footer className={styles.footer}>
        <span>四张不脱发</span>
      </footer>
    </div>

  )
}