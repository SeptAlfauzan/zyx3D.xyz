
import { useState } from 'react'
import DragDropFile from '../components/fileupload'
import Layout from '../components/layout'
import Navbar from '../components/navbar'

export default function Home() {
  const [home, setHome] = useState(true)
  const handleToPreview = () => setHome(false)
  return(
    <Layout>
      <DragDropFile handleToPreview={handleToPreview} isHome={home} />
    </Layout>
  )
}
