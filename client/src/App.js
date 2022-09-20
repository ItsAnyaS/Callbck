import './App.css';
import Search from './components/Search'
import DancerProfile from './components/Dancer'
import DancerSignUp from './components/DancerSignUp';
import CompanySignUp from './components/CompanySignUp';
import AuthPage from './components/AuthPage';
import Navbar from './Navbar';
import CompanyProfile from './components/CompanyProfile';
import ListingPage from './ListingPage';

import Home from './Home';

const App = () => {
  return (
    <div className="App">
      {/* <DancerSignUp/> */}
      {/* <CompanySignUp/> */}
      <Navbar/>
      <Home/>
      <Search/>
      <DancerProfile/>
      <CompanyProfile/>
      <AuthPage/>
      <ListingPage/>
    </div>
  );
}

export default App;
