import type { NextPage } from 'next'
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout';
import styles from '../styles/index.module.css'

const Home: NextPage = () => {
  return (
    <Layout>
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
      <main>
        <div className={styles.wrapper}>
          <div className={styles.title}>各棟好鄰居候選人</div>
          <div className={styles.neighborList}>
            {[...Array(10)].map(i =>
              <div key={i} className={styles.neighbor}>
                <div className={styles.image}>
                  <Image src="https://picsum.photos/200" alt="neighbor" width={192} height={192} />
                </div>
                <div className={styles.name} data-candidate="a" data-slogan="推動三驗 事不宜遲">陳重宏</div>
                <Link href="/neighbor/abc">關於重宏的完整政見</Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
