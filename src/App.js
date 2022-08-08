import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Admin from './components/Admin';
import Subjects from './components/Subjects';
import Questions from './components/Questions';
import Payment from './components/Payment';
import Sub from './components/Sub';
import Quiz from './components/Quiz';
import Doctor from './components/Doctor';
import User from './components/User';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
   
      <BrowserRouter>
         
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/admins' element={<Admin/>}/>
          <Route path='/subjects' element={<Subjects/>}/>
          <Route path='/questions' element={<Questions/>}/>
          <Route path='/payments' element={<Payment/>}/>
          <Route path='/subscription' element={<Sub/>}/>
          <Route path='/quiz' element={<Quiz/>}/>
          <Route path='/doctor' element={<Doctor/>}/>
          <Route path='/user' element={<User/>}/>
        </Routes>
        
      </BrowserRouter>
      
    
  );
}

export default App;
