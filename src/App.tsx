import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loginc from './components/Loginc';
import Dashboard from './components/Dashboard';

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
      path:'dashboard',
      element:<Dashboard/>
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
