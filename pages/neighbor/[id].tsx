import type { NextPage } from 'next'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout';

import * as lib from '../../lib/neighbors';
import style from './style.module.css';

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

type Neighbor = {
  id: string;
  sn: number;
  build: string;
  name: string;
  image: string;
  slogan: string;
  politics: string[];
}

interface Props {
  neighborData: Neighbor;
  allNeighborsData: Neighbor[];
}

const Home: NextPage<Props> = ({ allNeighborsData, neighborData }) => {
  console.log(allNeighborsData);
  
  return (
    <Layout>
      <div className={`${style.content} ${style.wrapper}`}>
        <div className={style.floor}>
          {allNeighborsData.map((neighbor, index) => (
            <Link key={index} href={`/neighbor/${neighbor.id}`}>
              <div className={style.floorItem}>{neighbor.build.slice(0, 1)}</div>
            </Link>
          ))}
        </div>
        <div className={style.image}>
          <Image src="https://picsum.photos/200" alt="neighbor" width={192} height={192} />
        </div>
        <div className={style.info}>{neighborData.build}候選人</div>
        <div className={style.name}>{neighborData.name}</div>
        <div className={style.slogan}>{neighborData.slogan}</div>
        <div className={`${style.content} ${style.policy}`}>
          {neighborData.politics}
        </div>
      </div>
    </Layout>
  )
}

export default Home;