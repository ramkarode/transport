import React from 'react'
import "./landing_page.css"
import video from "../assets/video1.mp4";
const landing_page = () => {
  return (
    <div className="landing-page">  
        <video loop autoPlay muted >
        <source src={video} type="video/mp4" />
        </video>
        
    </div>
  )
}

export default landing_page