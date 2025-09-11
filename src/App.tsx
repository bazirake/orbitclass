import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loginc from './components/Loginc';
import Dashboard from './components/Dashboard';
import Main from './components/Main';
import path from 'path';
import Chat from './components/Chat';
import Assessment from './components/Assessment';
import Timetable from './components/Timetable';
import Notify from './components/Notify';
import Report from './components/Report';
import StudentInfo from './components/StudentInfo';
import Quiz from './components/Quiz';
import Viewcourse from './components/Viewcourse';
import Course from './components/Course';
function App() {

const router=createBrowserRouter([
      {
       path:'/',
       element:<Loginc/>
      },
      {
       path:'login',
       element:<Loginc/>
      },
      {
       path:'main',
       element:<Main/>,
       children:[
        {
        path:'Dashboard',
        element:<Dashboard/>
        },
        {
        path:'chat',
        element:<Chat/>
        },
        {
        path:'assess',
        element:<Assessment/>
        },
        {
        path:'timetable',
        element:<Timetable/>
        },
        {
         path:'notify',
         element:<Notify/>
        },
        {
         path:'report',
         element:<Report/>
        },
        {
         path:'sinfo',
         element:<StudentInfo/>
        },
        {
         path:'quiz',
         element:<Quiz/>
        },
        {
         path:'view',
         element:<Viewcourse/>
        },
        {
         path:'course',
         element:<Course/>
        }
       ]
      }
  ]
   )

   return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
  //console.log(departments);  
}
export default App;
