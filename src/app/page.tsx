import type { Metadata } from 'next'
import React from 'react'
import GetComponent from './components/maincomponents/pokemonlistscomponent'

export const metadata: Metadata = {
  title: 'Pokedex App',
  description: 'NextJS Based Pokedex App',
}

const page = () => {
  return (
    <div 
    className='bg-pokeBG h-full'><GetComponent/></div>
  )
}

export default page