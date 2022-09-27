import './App.css';
import Search from './components/Search'
import DancerProfile from './components/Dancer'
import DancerSignUp from './components/DancerSignUp';
import CompanySignUp from './components/CompanySignUp';
import AuthPage from './components/AuthPage';
import Navbar from './components/Navbar';
import CompanyProfile from './components/CompanyProfile';
import ListingPage from './components/ListingPage';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {createContext, useState, useEffect, useMemo} from 'react'
import Cookies from 'js-cookie';
export const UserContext = createContext()

const App = () => {
const [globalUser, setGlobalUser] = useState()
 
// const [isDancer, setIsDancer] = useState(false)
const handleUserType = () => {
  if (Cookies.get('auth-token')){
    // setIsDancer(true)
    setGlobalUser({...globalUser, isDancer: true})
} else if (Cookies.get('company-auth-token')){
    // setIsDancer(false)
    setGlobalUser({...globalUser, isDancer: false})
}}

useEffect(() => {
  handleUserType()
}, [])




  const value = useMemo(() => ({ globalUser, setGlobalUser }), [globalUser, setGlobalUser]);

console.log(globalUser)

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
          <Route exact key={5} path='/signup' element={<AuthPage/>}/>
          <Route exact key={6} path='/listing/:id' element={<ListingPage/>}/>
          <Route exact key={7} path='/listing/:id' element={<ListingPage/>}/>
          <Route exact key={8} path='/dancer/signup' element={<DancerSignUp/>}/>
          <Route exact key={9} path='/company/signup' element={<CompanySignUp/>}/>
        </Routes>
      </Router>
      <footer>
        This is the footer it is going to have some social media stuff and maybe some usefull links
    </footer>
    </UserContext.Provider>
    </div>
  );
}

export default App;
