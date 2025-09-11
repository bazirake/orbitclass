
import React from 'react'
import Sidebar from './Sidebar';
import Layout from './Layout';
const Dashboard = () => {
    const sidebarItems = [
    { label:'Dashboard',href: '#', icon:'bi bi-house text-danger'},
    { label:'Chat', href: '#', icon:'bi bi-speedometer2 text-danger'},
    { label:'Course', href: '#', icon:'bi bi-table text-danger'},
    { label:'Assessment', href: '#', icon:'bi bi-grid text-danger'},
    { label:'Timetable', href: '#', icon:'bi bi-calendar text-danger'},
    { label:'Notify', href: '#', icon:'bi bi-bell text-warning'},
    { label:'Reports', href: '#', icon:'bi bi-backpack4 text-danger'},
    { label:'Studentinfo', href: '#', icon:'bi bi-info-circle-fill text-danger'},
    { label:'Viewassign/quiz', href: '#', icon:'bi bi-people text-danger'},
    { label:'Viewcourse', href: '#', icon:'bi bi-calendar text-danger'},
  ];
  return(
     <Layout sidebarItems={sidebarItems}>
      <h1>Dashboard</h1>
      <p>This is the main content area.</p>
    </Layout>
  )
}

export default Dashboard
