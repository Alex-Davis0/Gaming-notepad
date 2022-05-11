import React from 'react';
import NavBar from '../components/nav-bar';
import Carousel from '../components/carousel';
export default function Home(props) {
  return (
    <>
    <NavBar />
    <div className='home-page'>
    <Carousel />
    </div>
    </>
  );
}
