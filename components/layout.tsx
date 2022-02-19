import type { NextPage } from 'next';
import styles from './layout.module.css';

const Layout: NextPage = ({ children }) =>{
  return (
    <div className={styles.page}>
      {children}
      <footer className={styles.footer}>
        2022 富貴好鄰競選會 ®
      </footer>
    </div>
  );
}

export default Layout;