import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink,
} from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import ActivityList from "./components/ActivityList";

function App() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn"));
  const [signedUp, setSignedUp] = useState();
  const [name, setName] = useState(sessionStorage.getItem("name"));
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [userState, setUserState] = useState("");
  const [userActivities, setUserActivities] = useState([]);

  return (
    <div className='App'>
      <Router>
        <Routes>
          {/* "element" prop needs to be declared in route tags that 
            need multiple components */}
          <Route path='' element={<Navigate to='/login'></Navigate>} />

          <Route
            path='/login'
            element={
              loggedIn === "true" ? (
                <Navigate to='/home'></Navigate>
              ) : (
                <div>
                  <h1 style={{fontFamily:"bold", top:"150px",position:"relative"}}>
                    Granola Trails
                  </h1>
                  <div className="landing">
                    <div style={{ float:"left", width:"350px"}}>
                      <p>Welcome to Granola Trails! This app determines the safety of an outdoor activity based on the weather  
                        data around its location. This app is perfect for keeping people safe before they decide on
                        going say hiking or kayaking by informing them of how safe it is.
                      </p>
                      <p>Made by:<h6>Tony Ngo, Michael Anderson, Aditya Sharma, Bryan Andy and Aldrich Tambajong</h6></p>
                      
                    </div>
                      <Login
                      setName={setName}
                      setLoggedIn={setLoggedIn}
                      setEmail={setEmail}
                      setUserState={setUserState}
                      setUserActivities={setUserActivities}></Login>
                  </div>
                  <div className='signUpLink'>
                      <p>Don't have an account?</p>
                      <NavLink to='/signUp'>Sign Up</NavLink>
                    </div>
                  
                </div>
              )
            }></Route>

          <Route
            path='/home'
            element={
              loggedIn === "true" ? (
                <div class='container'>
                  <Navbar name={name} email={email}></Navbar>
                  <h1>Granola Trails</h1>
                  <div class='row'></div>
                  <div class='row'>
                    <ActivityList
                      userState={userState}
                      userActivities={userActivities}
                    />
                  </div>
                </div>
              ) : (
                <Navigate to='/login'></Navigate>
              )
            }></Route>

          <Route
            path='/signUp'
            element={
              signedUp === true ? (
                <Navigate to='/login'></Navigate>
              ) : (
                <div>
                  <Signup setSignedUp={setSignedUp}></Signup>
                  <div className='loginLink'>
                    <p>Already have an account?</p>
                    <NavLink to='/login'>Login</NavLink>
                  </div>
                </div>
              )
            }></Route>

          <Route
            path='/logout'
            element={<Logout setLoggedIn={setLoggedIn} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
