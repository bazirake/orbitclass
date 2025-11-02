import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loginc from './components/Loginc';
import Dashboard from './components/Dashboard';
import Main from './components/Main';
import Chat from './components/Chat';
import Assessment from './components/Assessment';
import Timetable from './components/Timetable';
import Report from './components/Report';
import StudentInfo from './components/StudentInfo';
import Quiz from './components/Quiz';
import Viewcourse from './components/Viewcourse';
import Course from './components/Course';
import Settings from './components/Settings';
import Takequiz from './components/Takequiz';
import StartQuiz from './components/StartQuiz';
import Sresult from './components/Sresult';
import Quizdetails from './components/Quizdetails';
import ProtectedRoute from './components/ProtectedRoute'; //Add this import
import NotFound from './components/NotFound';
function App() {
  const router = createBrowserRouter([
     {
       path:'/',
       element:<Loginc/>
     },
      {
       path:'login',
       element:<Loginc/>
      },
      {
      //Protected routes
      element: <ProtectedRoute />, // protection wrapper
      children:[
        {
          path:'main',
          element:<Main/>,
          children: [
            { path: 'Dashboard', element:<Dashboard/>},
            { path: 'chat', element: <Chat/>},
            { path: 'assess', element: <Assessment/>},
            { path: 'timetable', element: <Timetable />},
            { path: 'report', element: <Report />},
            { path: 'sinfo', element: <StudentInfo />},
            { path: 'quiz', element: <Quiz />},
            { path: 'quiz/:qid/:qt/:qd/:qma/:qat', element: <Quizdetails />},
            { path: 'view', element: <Viewcourse />},
            { path: 'course', element: <Course />},
            { path: 'takequiz', element: <Takequiz />},
            { path: 'takequiz/:deptid/:levid', element: <StartQuiz />},
            { path: 'Quizresult', element: <Sresult />},
            { path: 'setting', element: <Settings />}
          ]
        }
      ]
    },
     {
      path: '*',
      element: <NotFound />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
