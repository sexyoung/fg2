import type { NextPage } from 'next';
import styles from './layout.module.css';

import { Neighbor } from "./type";
import { getSortedNeighborsData } from '../lib/neighbors';

export async function getStaticProps() {
  const allNeighborsData = getSortedNeighborsData();
  
  return {
    props: {
      allNeighborsData
    }
  }
}

interface Props {
  isHome?: boolean;
  allNeighborsData?: Neighbor[];
}

const Layout: NextPage<Props> = ({ allNeighborsData, children, isHome = false }) =>{
  return (
    <div className={styles.page}>
      {isHome ?
        <div className={styles.hero}>
          <div className={styles.wrapper}>
            <div className={styles.slogan}>
              <div className={styles.teamName}>富貴好鄰</div>
            </div>
            <div className={styles.smile} />
            <div className={styles.heroFooter}>
              <ul className={styles.nameList}>
                {allNeighborsData?.map(({ name }) => (
                  <li key={name} className={styles.nameItem}>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      : ''}
      {children}
      <footer className={styles.footer}>
        2022 富貴好鄰競選會 ®
      </footer>
    </div>
  );
}

export default Layout;