import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <>
    <main className={styles.main}>
      <div className={inter.className}>
        hello next
      </div>
    </main>
  </>
}
