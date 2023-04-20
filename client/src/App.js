import './App.css';
import Search from './components/Search'
import DancerProfile from './components/Dancer'
import DancerSignUp from './components/DancerSignUp';
import CompanySignUp from './components/CompanySignUp';
import Navbar from './components/Navbar';
import CompanyProfile from './components/CompanyProfile';
import ListingPage from './components/ListingPage';
import Login from './components/Login';
import Home from './components/HomePage'
import NotFound from './components/NotFound';
import ApplicationsList from './components/ApplicationsList';
import Footer from './components/Footer';
import {BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom'
import {createContext, useState, useEffect, useMemo} from 'react'
import Cookies from 'js-cookie';
export const UserContext = createContext()

const App = () => {
const [globalUser, setGlobalUser] = useState()
 
const handleUserType = async() => {
  if (Cookies.get('auth-token')){
    let authToken = Cookies.get('auth-token')
    let req = await fetch('/auth/valid_dancer_session', {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({auth_token: authToken})
    })
    let res = await req.json()
    if (res.message === "Session expired"){
      redirect('/')
      return
    }
    setGlobalUser({first_name: res.first_name,last_name: res.last_name, isDancer: true,})
  } else if (Cookies.get('company-auth-token')){
    let authToken = Cookies.get('company-auth-token')
    let req = await fetch('/auth/company/valid_company_session', {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({company_auth_token: authToken})
    })
    let res = await req.json()
    if (res.message === "Session expired"){
      redirect('/')
      return
    }
    setGlobalUser({name: res.name, isDancer: false})
}}

useEffect(() => {
  handleUserType()
  document.title = "Callbck";
}, [])




  const value = useMemo(() => ({ globalUser, setGlobalUser }), [globalUser, setGlobalUser]);

// console.log(globalUser)

  return (
    <div className="App">
      <UserContext.Provider value={value}>
      <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='search' element={<Search/>}/>
          <Route path='profile' element={<DancerProfile/>}/>
          <Route path='dashboard' element={<CompanyProfile/>}/>
          <Route path='signup' element={<DancerSignUp/>}/>
          <Route path='/listing/:id' element={<ListingPage/>}/>
          <Route path='/listing/:id' element={<ListingPage/>}/>
          <Route path='/company-signup' element={<CompanySignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dancer-applications/:id' element={<ApplicationsList/>}/>
          {/* <Route path='/about'  element={<About/>} /> */}
          <Route path='*' element={<NotFound/>}/>
          {/* <Route render={() => <redirect to={{pathname: "/"}} />} /> */}
        </Routes>
      </Router>
      <Footer/>
    </UserContext.Provider>
    </div>
  );
}

export default App;
