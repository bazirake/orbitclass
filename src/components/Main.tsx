import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import { Outlet } from 'react-router-dom';
import {  getMenueItem, MenuItem } from '../Services/Objects';
import { api } from '../Services/api';

function Main() {
    const [menues,setMenue]=useState<MenuItem[]>([]);

    useEffect(()=>{
         const fetchMenue = async() =>{
              //etIsLoading(true);
              try {
                const response = await api.get<getMenueItem>(
                  "/api/menus?usertype=Lecturer"//replace with your API URL
                );
               //console.log("hello" ,response.data)
              //  alert('hello')
                setMenue(response.data.results); // set API array to state
                console.log(response.data);
              } catch (err) {
               // setError("Failed to fetch departments");
              } finally {
                //setIsLoading(false);
              }
            };
        fetchMenue();
    },[]);

    //console.log(menues);
//    const sidebarItems = [
//     { label:'Dashboard',href:'Dashboard',icon:'bi bi-house text-danger'},
//     { label:'Chat', href: 'chat',icon:'bi bi-speedometer2 text-danger'},
//     { label:'Course', href:'course',icon:'bi bi-table text-danger'},
//     { label:'Assessment', href:'assess',icon:'bi bi-grid text-danger'},
//     { label:'Timetable', href:'timetable',icon:'bi bi-calendar text-danger'},
//     { label:'Notify', href:'notify',icon:'bi bi-bell text-warning'},
//     { label:'Reports', href:'report',icon:'bi bi-backpack4 text-danger'},
//     { label:'Studentinfo', href:'sinfo',icon:'bi bi-info-circle-fill text-danger'},
//     { label:'Viewassign/quiz', href:'quiz',icon:'bi bi-people text-danger'},
//     { label:'Viewcourse', href:'view',icon:'bi bi-calendar text-danger',usertype:'admin'},
//   ];

 return(
     <Layout sidebarItems={menues}>     
         <Outlet/>
     </Layout>                                 
  )
}

export default Main