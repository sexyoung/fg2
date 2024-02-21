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
  const buildObj: any = {};
  
  allNeighborsData.forEach(neighbor =>{
    if(buildObj[neighbor.build]) {
      buildObj[neighbor.build].push(neighbor);
    } else {
      buildObj[neighbor.build] = [neighbor];
    }
    buildObj[neighbor.build].sort((a: Neighbor, b: Neighbor) => a.sn - b.sn);
  });

  return {
    props: {
      buildObj,
      allNeighborsData
    }
  }
}

interface Props {
  buildObj: {
    [build: string]: Neighbor[];
  }
  allNeighborsData: Neighbor[];
}

const Home: NextPage<Props> = ({ buildObj, allNeighborsData }) => {
  return (
    <Layout isHome {...{ allNeighborsData }}>
      <Head>
        <title>富貴好鄰</title>
        <meta name="description" content="富貴莊園第四屆管委員候選人" />

        <meta property="og:url" content="https://fg2.vercel.app" />
        <meta property="og:title" content="富貴好鄰" />
        <meta property="og:description" content="富貴莊園第四屆管委員候選人" />
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
      <Script id="hotjar" dangerouslySetInnerHTML={{__html: `(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:2840927,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}} />
      <main>
        <div className={styles.wrapper}>
          <div className={styles.title}>各棟好鄰居候選人</div>
          <div className={styles.buildList}>
            {Object.keys(buildObj).slice(0, -1).map(build =>
              <div key={build} className={styles.build}>
                <div className={styles.title}>{build}</div>
                <div className={styles.neighborList}>
                  {buildObj[build].map((neighbor, index) =>
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
                        <span>社區經營理念</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className={styles.otherBuild}>
            {Object.keys(buildObj).slice(-1).map(build =>
              <div key={build} className={styles.build}>
                <div className={styles.title}>{build}</div>
                <div className={styles.neighborList}>
                  {buildObj[build].map((neighbor, index) =>
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
                        <span>社區經營理念</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </Layout>
  )
}

export default Home
