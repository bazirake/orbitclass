import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import { Outlet } from 'react-router-dom';
import {  getMenueItem, MenuItem } from '../Services/Objects';
import { api } from '../Services/api';

function Main() {
    const [menues,setMenue]=useState<MenuItem[]>([]);
    const userinfo = JSON.parse(localStorage.getItem('auth')!);

    useEffect(()=>{
         const fetchMenue = async() =>{
              //etIsLoading(true);
              try {
                
               // alert(userinfo.type_name)
                const response = await api.get<MenuItem[]>(
                  `/menu/${userinfo.user.usertype}`//replace with your API URL
                );
               //console.log("hello" ,response.data)
              //  alert('hello')
                setMenue(response.data); // set API array to state
                console.log(response.data);
              } catch (err) {
               // setError("Failed to fetch departments");
              } finally {
                //setIsLoading(false);
              }
            };
        fetchMenue();
    },[]);


 return(
     <Layout sidebarItems={menues}>     
         <Outlet/>
     </Layout>                                 
  )
}

export default Main