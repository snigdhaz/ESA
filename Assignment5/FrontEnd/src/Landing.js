import React from 'react';
import "./Landing.css";
import { Link } from 'react-router-dom';


function Landing(){
    return(
      <div className="Landing">
        <div className="LandingWallpaper">
          <img id="LandingImg" src="https://image.flaticon.com/icons/svg/1497/1497752.svg"
        //   src="https://cdn.dribbble.com/users/149180/screenshots/3208433/book_preloader.gif"
        //   "https://thumbs.gfycat.com/AnotherSpryCapeghostfrog-size_restricted.gif"
          ></img>
          {/* src="https://www.w-p.co.uk/hubfs/contact.svg" 
          src="https://image.flaticon.com/icons/svg/1898/1898194.svg"*/}
        </div>
        <div className="Text">
            <div className="LandingHeader">
                <h1>ContactBook</h1>
            </div>
            <div className="LandingNavigation">
                <Link to="/login"><button id="landingNavBut">Login</button></Link>
                <Link to="/signup"><button id="landingNavBut">Register</button></Link> 
                </div>
        </div>        
        
      </div>
    )
}

export default Landing
