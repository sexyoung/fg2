import type { NextPage } from 'next'
import Script from 'next/script'
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import LogRocket from 'logrocket';
import Layout from '../components/layout';
import styles from '../styles/index.module.css';

import { Neighbor } from "../components/type";
import { getSortedNeighborsData } from '../lib/neighbors';

LogRocket.init('sexyoung/fg2');

export async function getStaticProps() {
  const allNeighborsData = getSortedNeighborsData();
  
  return {
    props: {
      allNeighborsData
    }
  }
}

interface Props {
  allNeighborsData: Neighbor[];
}

const Home: NextPage<Props> = ({ allNeighborsData }) => {
  return (
    <Layout isHome {...{ allNeighborsData }}>
      <Head>
        <title>富貴好鄰</title>
        <meta name="description" content="富貴莊園第二屆管委員候選人" />

        <meta property="og:url" content="https://fg2.vercel.app" />
        <meta property="og:title" content="富貴好鄰" />
        <meta property="og:description" content="富貴莊園第二屆管委員候選人" />
        <meta property="og:image" content="/logo.png" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-J90VJZV6C9" />
      <Script id="script" dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        /**  */
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-J90VJZV6C9');`
      }} />
      <main>
        <div className={styles.wrapper}>
          <div className={styles.title}>各棟好鄰居候選人</div>
          <div className={styles.neighborList}>
            {allNeighborsData.map((neighbor, index) =>
              <div key={index} className={styles.neighbor}>
                <div className={styles.image}>
                  <Image src={neighbor.image} alt="neighbor" width={192} height={192} />
                </div>
                <div className={styles.name} data-candidate={neighbor.build} data-slogan={neighbor.slogan}>
                  <span className={styles.sn}>
                    {neighbor.sn > 0 ? neighbor.sn : '　'}
                  </span>
                  {neighbor.name}
                </div>
                <Link href={`/neighbor/${neighbor.id}`}>
                  <a>關於{neighbor.name}的完整政見</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
