import './App.css';
import Search from './components/Search'
import DancerProfile from './components/Dancer'
// import DancerSignUp from './components/DancerSignUp';
// import CompanySignUp from './components/CompanySignUp';
import AuthPage from './components/AuthPage';
import Navbar from './components/Navbar';
import CompanyProfile from './components/CompanyProfile';
import ListingPage from './components/ListingPage';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      {/* <DancerSignUp/> */}
      {/* <CompanySignUp/> */}
      <Router>
      <Navbar/>
        <Routes>
          <Route exact key={1} path='/' element={<Home/>}/>
          <Route exact key={2} path='/search' element={<Search/>}/>
          <Route exact key={3} path='/dancer_profile' element={<DancerProfile/>}/>
          <Route exact key={4} path='/company_profile' element={<CompanyProfile/>}/>
          <Route exact key={5} path='/signup' element={<AuthPage/>}/>
          <Route exact key={6} path='/listing/:id' element={<ListingPage/>}/>
        </Routes>
      </Router>
      <footer>
        This is the footer it is going to have some social media stuff and maybe some usefull links
    </footer>
    </div>
  );
}

export default App;
