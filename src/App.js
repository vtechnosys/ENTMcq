import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Admin from './components/Admins/Admin';
import AdminList from './components/Admins/AdminList';
import EditAdmin from './components/Admins/EditAdmin';
import Subjects from './components/subjects/Subjects';
import SubjectList from './components/subjects/SubjectList';
import EditSubject from './components/subjects/EditSubject';
import Questions from './components/Questions/Questions';
import QuestionsList from './components/Questions/QuestionsList';
import QuestionEdit from './components/Questions/QuestionEdit';
import Answers from './components/Answers/Answers';
import ViewAnswers from './components/Answers/ViewAnswers';
import Payment from './components/Payment';
import Sub from './components/Sub';
import Quiz from './components/Quiz';
import Doctor from './components/Doctors/Doctor';
import DoctorsList from './components/Doctors/DoctorsList';
import EditDoctor from './components/Doctors/EditDoctor';
import User from './components/User';
import Service from './components/services/Service';
import Package from './components/packages/Package';
import ViewPackages from './components/packages/ViewPackages';
import Quizanswer from './components/Table_quiz_answers';
import Quizdetails from './components/Quiz_details';
import LoginForm from './components/Loginform';
import EditAnswers from './components/Answers/EditAnswer';
import AddCategory from './components/Category/AddCategory';
import CategoryList from './components/Category/CategoryList';
import EditCategory from './components/Category/EditCategory';
import AddQb from './components/QuestionBank/AddQb';
import QBList from './components/QuestionBank/QBList';
import EditQB from './components/QuestionBank/EditQB';
import ServiceEdit from './components/services/ServiceEdit';
import ViewServices from './components/services/ViewServices';
import Login from './components/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
   
      <BrowserRouter>
         
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admins' element={<AdminList/>}/>
          <Route path='/addAdmin' element={<Admin/>}/>
          <Route exact path='/editAdmin/:id' element={<EditAdmin/>}/>
          <Route path='/subjects' element={<Subjects/>}/>
          <Route path='/questions' element={<Questions/>}/>
          <Route path='/question/:qid' element={<QuestionEdit/>}/>
          <Route path='/viewQuestions' element={<QuestionsList/>}/>
          <Route path='/answers/:qid' element={<Answers/>} />
          <Route path='/answer/:aid' element={<EditAnswers/>}/>
          <Route path='/viewAnswers/:qid' element={<ViewAnswers/>} />
          <Route path='/payments' element={<Payment/>}/>
          <Route path='/subscription' element={<Sub/>}/>
          <Route path='/quiz' element={<Quiz/>}/>
          <Route path='/doctors' element={<DoctorsList/>}/>
          <Route path='/addDoctor' element={<Doctor/>} />
          <Route path='/editDoctor/:id' element={<EditDoctor/>} />
          <Route path='/user' element={<User/>}/>
          <Route path='/service' element={<Service/>}/>
          <Route path='/services' element={<ViewServices/>} />
          <Route path='/service/:id' element={<ServiceEdit/>}/>
          <Route path='/package' element={<Package/>}/>
          <Route path='/packages' element={<ViewPackages/>}/>
          <Route path='/quizanswer' element={<Quizanswer/>}/>
          <Route path='/quiz_details' element={<Quizdetails/>}/>
          <Route path='/view_subjects' element={<SubjectList/>}/>
          <Route path='/editSubject/:id' element={<EditSubject />}/>
          <Route path='/addCategory' element={<AddCategory/>} />
          <Route path='/category/' element={<CategoryList/>} />
          <Route path='/category/:id' element={<EditCategory/>} />
          <Route path='/addQuetionBank' element={<AddQb/>} />
          <Route path='/quetionbank' element={<QBList/>} />
          <Route path='/quetionbank/:id' element={<EditQB/>} />
          
          
        </Routes>
        
      </BrowserRouter>
      
    
  );
}

export default App;
