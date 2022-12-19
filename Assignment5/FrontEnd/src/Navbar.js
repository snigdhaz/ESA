
import React from 'react';
import { useState, useEffect } from 'react';

  import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    // useParams,
    Link,
    // Redirect
  } from 'react-router-dom';

function NavBar(props){

    const [searchVal,setSearchVal]=useState("")

    function logout(){
      props.setUsername("")
      props.setPassword("")
    }

    function search(){
        props.setSearchItem(searchVal)
    }
    
    return(
        <div className="NavBar">
          <div className="Brand"><p>ContactBook</p></div>
          <div className="SearchBar"><input id="SearchBox" type="text" placeholder="Search.." onChange={(e)=>setSearchVal(e.target.value)}/><button id="SearchButton" onClick={()=>search()}><img id ="SearchIcon"src="https://img.icons8.com/material-outlined/24/000000/search.png"/></button></div>
          <div className="Logout"><Link to="/"><button id="AboutButton" onClick={()=>logout()}>Logout</button></Link></div>                 
        </div>
    )  
  }

  
  export default NavBar