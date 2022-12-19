import React,{ useState, useEffect, useCallback }  from 'react';
import './Register.css' ;
// import Recaptcha from "react-recaptcha";
import ReCAPTCHA from "react-google-recaptcha";
import { Route, Redirect } from 'react-router'
import { useHistory } from "react-router-dom";
import axios from 'axios';

var md5 = require('md5');




  


function Register(){

    const history = useHistory();
    const goLogin = () => history.push('');

    const [Captcha, setCaptcha] = useState(false);
    const [CaptchMsg,setCaptchaMsg]=useState(false);
    const [pass, setPass] = useState("");
    const [username, setUsername] = useState("");

    const [passflag, setPassflag] = useState(false);
    const [errors,setErrors]=useState(false)

    const [uniqueUser, setUniqueUser]=useState(true);


    // componentDidMount(){
    //     loadReCaptcha();
    // }
    function registerdb(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username,password:md5(pass)})
          };
          
          fetch('/api/contact/', requestOptions)
              .then(response => console.log(response.json()))
    }
    function onChange(value) {
        // console.log("Captcha value:", value);
        if(value!=null ){
            setCaptcha(true)
        }
        else{
            setCaptcha(false)
        }
    
      }
    
    async function handlesubmit(){
        // (async () => {
        console.log(md5(pass))
        var json=await usernameCheck()
        var len=json.length;

        
        //     console.log(await mainFunction())
        //   })()

        // .then( (response) => {
        //     len= response.data.length
        // console.log("response", response.data.length);
        // return response.data.length
        console.log("len val in submit ",len)
        if(len>0){
            setUniqueUser(false)
        }
        else{
            setUniqueUser(true)
        }
        console.log(uniqueUser)
        if(Captcha && passflag && username.length>0 && pass.length>0 && uniqueUser){
            // <Redirect to="/login" />
            setCaptchaMsg(false)
            registerdb()
            goLogin()            
        }
        else{
            setErrors(true)
        }

        
    // })

        
    }
    function compareRepass(repass){
        if(pass==repass){
            setPassflag(true)
        }
        else{
            setPassflag(false)
        }
    }
    async function usernameCheck(){

        const json = await fetch('/api/contact/'+username)
                            .then(response=>response.json())
        // var json = await response.json()
        // console.log(json.length)
        // lenObj.len=json.length
        return json
        // var len=0;
        // return axios.get('/api/contact/'+username)
        //     .then( (response) => {
        //         // response.data.length
        //     console.log("response", response.data.length);
        //     return response.data.length

            
        // })
    }

    return(
        <div className="Register">
            <div className="RegisterBox">
                    <div className="RegForm">
                    <h1>Sign Up</h1>
                    <div className="Signup-form">
                        <div className="Labels">
                            <p id="inputlabel">Username</p>
                            <p id="inputlabel">Password</p>
                            <p id="inputlabel">Re-enter Password</p>



                        </div>
                        <div className="Inputs">
                            <input id="inputfield" type="text"  placeholder="e.g John Doe" onChange={e => setUsername(e.target.value)}/>
                            <input id="inputfield" type="password" placeholder="e.g John@123" onChange={e => setPass(e.target.value)} />
                            <input id="inputfield" type="password" onChange={e => compareRepass(e.target.value)}/>
                            
                        </div>
                    </div>
                    <div className="Captcha">
                        <ReCAPTCHA
                                sitekey="6Lft9PgUAAAAAPAzEtotZM0xgXRg9y-pR-YMPopy"
                                onChange={onChange}
                        />
                        <button id="RegButton" onClick={()=>handlesubmit()} >Submit</button>
                       
                    </div>
                    {
                        errors && <div className="ErrorMsgs">
                            {!Captcha &&<div className="ErrorMsg"><img id="ErrorImg"src="https://img.icons8.com/flat_round/64/000000/cancel--v1.png"/><p id="ErrorP">Invalid Captcha</p></div>}
                            {!passflag&&<div className="ErrorMsg"><img id="ErrorImg"src="https://img.icons8.com/flat_round/64/000000/cancel--v1.png"/><p id="ErrorP">Password not match</p></div>}
                            {(username.length==0 || pass.length==0) && <div className="ErrorMsg"><img id="ErrorImg"src="https://img.icons8.com/flat_round/64/000000/cancel--v1.png"/><p id="ErrorP">Empty Field</p></div>}
                            {!uniqueUser &&<div className="ErrorMsg"><img id="ErrorImg"src="https://img.icons8.com/flat_round/64/000000/cancel--v1.png"/><p id="ErrorP">Username taken</p></div>}
                        </div>
                    }
                    
                </div>
                    
                {/* <label id="InputLabel">
                    Username:<input id="inputfield" type="text"  placeholder="e.g John Doe"/>
                </label>
                <label id="InputLabel">
                    Password:<input id="inputfield" type="password"  />
                </label>
                <label id="InputLabel">
                   Re-enter Password:<input id="inputfield" type="password"  />
                </label> */}
            </div>
            
            
        </div>

    )
}

export default Register