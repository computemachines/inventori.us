import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import AnimatedFigure1 from '../components/TopFigure'

const Home: NextPage = () => {
    return (
    <div className={styles.container}>
      <Head>
        <title>Inventorius</title>
        <meta name="description" content="Open source inventory management for hobbyists and makers." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Inventorius</h1>
        <h3>Open source inventory management for hobbyists and makers.</h3>
        <Link href="https://inventory.computemachines.com"><a>Live Demo</a></Link>
        <Link href="/download"><a>Download</a></Link>
        <AnimatedFigure1 />
      </main>

      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          This is in the footer
        </a>
      </footer>
    </div>
  )
}

export default Home
