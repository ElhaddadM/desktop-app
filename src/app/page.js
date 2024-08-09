import React from 'react'
import Template from './Template'
import Link from 'next/link'
function Home() {
  return (
    <main>
     LoginPage 
     <div>
       <Link href="/home" className='text-xl font-bold'>Home</Link>
     </div>
    </main>
  )
}

export default Home