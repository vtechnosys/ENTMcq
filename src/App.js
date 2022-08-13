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
import Service from './components/Service';
import Package from './components/Package';
import Quizanswer from './components/Table_quiz_answers';
import Quizdetails from './components/Quiz_details';
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
          <Route path='/service' element={<Service/>}/>
          <Route path='/package' element={<Package/>}/>
          <Route path='/quizanswer' element={<Quizanswer/>}/>
          <Route path='/quiz_details' element={<Quizdetails/>}/>
        </Routes>
        
      </BrowserRouter>
      
    
  );
}

export default App;
