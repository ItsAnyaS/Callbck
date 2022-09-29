import './App.css';
import Search from './components/Search'
import DancerProfile from './components/Dancer'
import DancerSignUp from './components/DancerSignUp';
import CompanySignUp from './components/CompanySignUp';
import AuthPage from './components/AuthPage';
import Navbar from './components/Navbar';
import CompanyProfile from './components/CompanyProfile';
import ListingPage from './components/ListingPage';
import Login from './components/Login';
import Home from './components/Home';
import ApplicationsList from './components/ApplicationsList';
import Footer from './components/Footer';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {createContext, useState, useEffect, useMemo} from 'react'
import Cookies from 'js-cookie';
export const UserContext = createContext()

const App = () => {
const [globalUser, setGlobalUser] = useState()
 
const handleUserType = async() => {
  if (Cookies.get('auth-token')){
    let authToken = Cookies.get('auth-token')
    let req = await fetch('http://localhost:3000/auth/valid_dancer_session', {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({auth_token: authToken})
    })
    let res = await req.json()
    setGlobalUser({first_name: res.first_name,last_name: res.last_name, isDancer: true,})
  } else if (Cookies.get('company-auth-token')){
    let authToken = Cookies.get('company-auth-token')
    let req = await fetch('http://localhost:3000/auth/company/valid_company_session', {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({company_auth_token: authToken})
    })
    let res = await req.json()
    setGlobalUser({name: res.name, isDancer: false})
}}

useEffect(() => {
  handleUserType()
}, [])




  const value = useMemo(() => ({ globalUser, setGlobalUser }), [globalUser, setGlobalUser]);

// console.log(globalUser)

  return (
    <div className="App">
      <UserContext.Provider value={value}>
      <Router>
      <Navbar/>
        <Routes>
          <Route exact key={1} path='/' element={<Home/>}/>
          <Route exact key={2} path='/search' element={<Search/>}/>
          <Route exact key={3} path='/dancer_profile' element={<DancerProfile/>}/>
          <Route exact key={4} path='/company_profile' element={<CompanyProfile/>}/>
          <Route exact key={5} path='/signup' element={<DancerSignUp/>}/>
          <Route exact key={6} path='/listing/:id' element={<ListingPage/>}/>
          <Route exact key={7} path='/listing/:id' element={<ListingPage/>}/>
          <Route exact key={8} path='/dancer/signup' element={<DancerSignUp/>}/>
          <Route exact key={9} path='/company/signup' element={<CompanySignUp/>}/>
          <Route exact key={10} path='/login' element={<Login/>}/>
          <Route exact key={11} path='/company/application_list/:id' element={<ApplicationsList/>}/>
        </Routes>
      </Router>
      <Footer/>
    </UserContext.Provider>
    </div>
  );
}

export default App;
