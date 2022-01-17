import Head from 'next/head'
import { useState } from 'react'
import DragDropFile from '../components/fileupload'
import Navbar from '../components/navbar'

export default function Home() {
  const [home, setHome] = useState(true);

  const handleToHome = () => {
    setHome(true)
  };

  const handleToPreview = () => setHome(false);

  return (
    <div className='h-screen flex flex-col'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar  handleToHome={handleToHome}/>
      <div className='flex h-full justify-center items-center flex-col w-full'>
        <DragDropFile handleToPreview={handleToPreview} isHome={home} />
      </div>

    </div>
  )
}
