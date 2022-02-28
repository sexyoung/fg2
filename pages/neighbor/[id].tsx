import type { NextPage } from 'next';
import Script from 'next/script'
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout';

import * as lib from '../../lib/neighbors';
import style from './style.module.css';
import { Neighbor } from '../../components/type';

export async function getStaticPaths() {
  const paths = lib.getAllNeighborIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const neighborData = await lib.getNeighborData(params.id)
  return {
    props: {
      neighborData,
      allNeighborsData: lib.getSortedNeighborsData(),
    }
  }
}

interface Props {
  neighborData: Neighbor;
  allNeighborsData: Neighbor[];
}

const Home: NextPage<Props> = ({ allNeighborsData, neighborData }) => {
  return (
    <Layout>
      <Head>
        <title>{neighborData.build.toUpperCase()} - {neighborData.sc} {neighborData.name}的社區經營理念</title>
        <meta name="description" content={`富貴莊園第二屆管委員候選人${neighborData.name}的社區經營理念`} />

        <meta property="og:url" content={`https://fg2.vercel.app/neighbor/${neighborData.id}`} />
        <meta property="og:title" content={`${neighborData.build.toUpperCase()} - ${neighborData.sc} ${neighborData.name}的社區經營理念`} />
        <meta property="og:description" content={`富貴莊園第二屆管委員候選人${neighborData.name}的社區經營理念`} />
        <meta property="og:image" content={neighborData.image} />

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
      <div className={`${style.content} ${style.wrapper}`}>
        <div className={style.floor}>
          {allNeighborsData.map((neighbor, index) => (
            <Link key={index} href={`/neighbor/${neighbor.id}`}>
              <div className={style.floorItem}>{neighbor.build.slice(0, 1)}</div>
            </Link>
          ))}
        </div>
        <div className={style.image}>
          <Image src={neighborData.image} alt="neighbor" width={192} height={192} />
        </div>
        <div className={style.info}>{neighborData.build}候選人</div>
        <div className={style.name}>
          <span className={style.sn}>
            {neighborData.sn > 0 ? neighborData.sn : '　'}
          </span>
          {neighborData.name}
        </div>
        <div className={style.slogan}>{neighborData.slogan}</div>
        <div className={style.contentHtml} dangerouslySetInnerHTML={{__html:
          neighborData.contentHtml
        }}>
        </div>
        <div className="line-it-button" data-lang="zh_Hant" data-type="share-a" data-env="REAL" data-url={`https://fg2.vercel.app/neighbor/${neighborData.id}`} data-color="default" data-size="large" data-count="false" data-ver="3" style={{"display": "none"}}></div>
        <Script src="https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js" async={true} defer={true}></Script>
      </div>
    </Layout>
  )
}

export default Home;