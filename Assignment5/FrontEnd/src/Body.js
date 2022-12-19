import React,{ useState, useEffect } from 'react';

import './App.css';
import { CSVLink
  // , CSVDownload 
} from "react-csv";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // useParams,
  Link,
  Redirect
} from 'react-router-dom';
import ContactPost from "./ContactPost.js"
import ContactService from './services/ContactService';



function Body(props){

    var values=[]
    const [user, setUsername] = useState(props.user);
    const [password, setPassword] = useState(props.password);
    const [searchItem,setSearchItem]=useState(props.searchItem);
    
    const [contacts, setcontacts] = useState(null);
    const [viewAddContact, setview] = useState(false);
  
    const [newContactName, setName] = useState('')
    const [newContactNumber, setNumber] = useState('')
  
  
    useEffect(() => {
      if(!contacts || searchItem!=props.searchItem) {
          setSearchItem(props.searchItem)
        getContacts();
      }
    })
    const getContacts = async () => {
      // console.log("user = "+props.user+props.password)
      let res = await ContactService.getAll(user,password);
      // console.log(res);
      setcontacts(res);
    }
  
    const renderContact = contact => {
        
        if(props.searchItem!=""){
            if(props.searchItem==contact.name || props.searchItem==contact.number){
                return (
                    <li><ContactPost username={props.user} password={props.password} name={contact.name} number={contact.number} contacts={contacts} setcontacts={setcontacts}/></li>
                );
            }
        }
        else{
            return (
                <li><ContactPost username={props.user} password={props.password} name={contact.name} number={contact.number} contacts={contacts} setcontacts={setcontacts}/></li>
            );

        }
      
    };
  
    
  
    function clearNewCon(){
  
      setview(false);
      setNumber("");
      setName("");
  
    }
    
  
    async function saveNewCon(){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newContactName,number:newContactNumber})
      };
      console.log('/api/contact/'+props.user)
      await fetch('/api/contact/'+props.user, requestOptions)
          .then(response => console.log(response.json()))
        
      setcontacts(null)
      clearNewCon()
    }
  
    function Functions(){
      return(
        <div id="Functions">
            
            <CSVLink className="ExportButton" data={values}  filename={"My-Contacts.csv"}>
              <img id="ExportIcon"src="https://img.icons8.com/offices/30/000000/export-csv.png"/>EXPORT
            </CSVLink>
  
            <button id="AddNewButton" onClick={() => setview(true)}>
              <img id="AddNewIcon" src="https://img.icons8.com/color/50/000000/add.png"/>ADD
            </button>
  
          </div>
      )
  
    }
  
    return(
      <div className="Body">
        <div className="LeftBar"></div>
        <div className="Contacts">
          <Functions/>        
          {
            viewAddContact && 
            // <AddContact/>
            <div className="AddContact">
              <img id="Dp2" src="https://img.icons8.com/pastel-glyph/64/000000/person-male.png"/>
              <div className="NewConInput">
                <label id="newConLabels">
                  Name:<br/><input id="newConForm" type="text"  placeholder=" eg. John Doe" onInput={e => setName(e.target.value)}/>
  
                </label >
                <label id="newConLabels">
                  Number:<br/>  <input id="newConForm"  placeholder=" eg. 9998887776"onInput={e => setNumber(e.target.value)}/>
                </label>
              </div>
              <button className="SaveNew" onClick={()=>saveNewCon()}><img id ="SaveImg"src="https://img.icons8.com/color/48/000000/checked--v1.png"/></button>
              <button className="CancelNew" onClick={()=>clearNewCon()}><img id="CancelImg"src="https://img.icons8.com/color/48/000000/cancel--v1.png"/></button>
            </div>
          }
          <ul id="ListContacts">
            
            {(contacts && contacts.length > 0) ? (
              contacts.map(contact => renderContact(contact))
            ) : (
              <p>No contacts found</p>
            )}
  
          </ul>
        </div>
        <div className="RightBar"></div>
      </div>
    )
  }

  export default Body