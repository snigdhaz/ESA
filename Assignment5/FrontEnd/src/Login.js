import React from 'react';
import "./Login.css";
import { useHistory } from "react-router-dom";

// import { Button, FormGroup, FormControl,FormLabel} from "react-bootstrap";
import { useState } from "react";
import { Link } from 'react-router-dom';
import md5 from 'md5';

function LoginPage(props){

    
const [hiddenstate, sethiddenstate] = useState(false);
const [errorLogin, seterrorLogin] = useState(false);
const history = useHistory();
const goHome = () => history.push('/home');
//   const [password, setPassword] = useState("");

//   function validateForm() {
//     return email.length > 0 && password.length > 0;
//   }

  
  function toggleState(){
    sethiddenstate(!hiddenstate)
  }
  async function verify(){
    var len=await loginCheck()
    console.log(len)
    if(len>0){
      goHome()
    }
    else{
      seterrorLogin(true)
    }
    
  }

  async function loginCheck(){

    const json = await fetch('/api/contact/'+props.user+'/'+md5(props.password))
                        .then(response=>response.json())
    // var json = await response.json()
    console.log("length of resp",json.length)
    // lenObj.len=json.length
    return json.length
  }
    return(
      <div className="LoginPage">
          <div className="LoginFormBox">
            <h1 id="Header">ContactBook</h1>
            
              <p>Username:</p>
              <input id="LoginInput" type="text" name="username" onInput={e => props.setUsername(e.target.value)} /> 

              {/* <div className="LoginText"> */}
                <p>Password:</p>                
              {/* </div> */}

              <div id="passwordBox">
                <input id="LoginInput" type={hiddenstate?"text":"password"} name="password" onInput={e => props.setPassword(e.target.value)} />
                <button id="toggleHidden" onClick={()=>toggleState()}>{hiddenstate?<img id="hiddenEye" src="https://img.icons8.com/material-outlined/24/000000/visible.png"/>:<img id="hiddenEye" src="https://img.icons8.com/material-sharp/24/000000/visible.png"/>}</button> 
              </div>
              {/* </label> */}


              {/* <Link to="/home"> */}
                <button id="LoginButton" on onClick={()=>verify()} >Login</button>
                {/* </Link> */}
              <br/>
              <br/>
              <label>
                  OR<br/>
                  {/* <input id="LoginInput" type="password" name="password" /> */}
              </label>
              <br/>
              <Link to="/signup">Signup</Link>
              <br/>
              {errorLogin && <p>Invalid Credentials</p>}


            {/* </form> */}
          </div>
      </div>
    )
  }

export default LoginPage