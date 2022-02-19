import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/layout';
import style from './style.module.css';

const contentList = [
  '相股形氣化和能我風旅實大已來以為中不能了情是室最，方灣華中生沒日氣方說內選親權。',
  '具世而化客，球紀只想送同去是公者中工刻畫？吃而媽方，無一體大事政代想用。',
  '是利是，強色石傳，財候大美般可？不市明十，平的護最不曾種裡人正主港學生雖今指小爸。',
  '的這國病著界媽這一，動公代如了善密回境大，市別所都動造接是星覺求來高師眾調。'
];

const floorList = ['A', 'B', 'C', 'D', 'E', 'F', '不', '不', '不', '不'];

export default function Neighbor() {
  return (
    <Layout>
      <div className={style.header}>
        <div className={style.wrapper}>
          <Link href='/'>富貴好鄰</Link>
        </div>
      </div>
      <div className={`${style.content} ${style.wrapper}`}>
        <div className={style.floor}>
          {floorList.map((floor, index) => (
            <div key={index} className={style.floorItem}>{floor}</div>
          ))}
        </div>
        <div className={style.image}>
          <Image src="https://picsum.photos/200" alt="neighbor" width={192} height={192} />
        </div>
        <div className={style.info}>A棟候選人</div>
        <div className={style.name}>陳重宏</div>
        <div className={style.slogan}>推動三驗 事不宜遲</div>
        <ul>
          {contentList.map((item, index) => (
            <li key={index} className={style.list}>{item}</li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
