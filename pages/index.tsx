import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/index.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.page}>
      <Head>
        <title>富貴好鄰</title>
        <meta name="description" content="富貴好鄰" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.hero}>
        <div className={styles.wrapper}>
          <div className={styles.slogan}>
            <div className={styles.teamName}>富貴好鄰</div>
          </div>
          <div className={styles.smile} />
          <div className={styles.heroFooter}>
            <ul className={styles.nameList}>
              <li>陳重宏</li>
              <li>Kai</li>
              <li>SamLin</li>
              <li>謝安育</li>
              <li>Stan</li>
              <li>Quake</li>
              <li>Bella</li>
              <li>謝凱曄</li>
              <li>趙祐晟</li>
              <li>李政儒</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
