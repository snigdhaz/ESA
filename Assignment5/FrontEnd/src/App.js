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
import LoginPage from "./Login.js"
import Landing from "./Landing.js"
import Register from "./Register.js"
import NavBar from "./Navbar.js"
import Body from "./Body.js"

function HomePage(props){

  const [searchItem,setSearchItem]=useState("");
  return(
    <div className="HomePage">
      <NavBar user={props.user} setUsername={props.setUsername} password={props.password} setPassword={props.setPassword} searchItem={searchItem} setSearchItem={setSearchItem}/>
      <Body user={props.user} setUsername={props.setUsername} password={props.password} setPassword={props.setPassword} searchItem={searchItem} setSearchItem={setSearchItem}/>
    </div>
  )
}


function App() {

  const [user, setUsername] = useState("");
  const [password,setPassword]=useState("");
  
  // const username1 = React.createContext("");

  
  return (
    <div className="App">
      {/* <div className="Login"></div> */}
      <Router>
        {/* <Switch> */}
          <Route exact path='/'><Landing/></Route>
          <Route exact path='/signup'><Register/></Route>
          <Route exact path='/login' ><LoginPage user={user} setUsername={setUsername} password={password} setPassword={setPassword}/></Route>
          <Route exact path='/home' render={()=>(
            user=="" ?(
              <Redirect to="/login"/>
            ):(
              <HomePage user={user} setUsername={setUsername} password={password} setPassword={setPassword} />
            )
            )}/>
        {/* </Switch> */}
      </Router>
      
        
      {/* </div> */}
      
    </div>
  );
}

export default App;
