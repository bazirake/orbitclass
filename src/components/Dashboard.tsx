
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import Layout from './Layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Bar, BarChart, Legend } from 'recharts';
import { categories, COLORS, ChartDataInput, DepartmentData,  sales, TotalAccount, TotalCourse, TotalDepartment, UsersMarks } from '../Services/Objects';
import { api } from '../Services/api';



const Dashboard = () => {

  const[totalde,setDeparmentT]=useState<TotalDepartment>();
  const[totalcourse,setCourse]=useState<TotalCourse>();
  const[totalaccount,setAccount]=useState<TotalAccount>();
  const[totalDepart,setTotalDe]=useState<DepartmentData[]>([])
  const[totalResult,setTotalResult]=useState<UsersMarks[]>([])
const [userResult, setUserResult] = useState<ChartDataInput[]>([

]);
 const userinfo = JSON.parse(localStorage.getItem('auth')!);
  const userType = userinfo?.user?.usertype || 0; 
  
        const fetchTotalDepartment = async () => {
             //etIsLoading(true);
             try{
                  const response = await api.get<TotalDepartment>(
                 `/department/total` // replace with your API URL
                );
              setDeparmentT(response.data);
              }catch(err){
                alert('Error fetching total department');
               } finally {
                 //setIsLoading(false);
               }
             }

             const fetchAccount = async () => {
             //etIsLoading(true);
              try{
                 const response = await api.get<TotalAccount>(
                  `/account/total` // replace with your API URL
                );
        
              setAccount(response.data);
              }catch(err){
                alert('Error fetching total department');
               } finally {
                 //setIsLoading(false);
               }
             }

                const fetchTotalCourse = async () => {
             //etIsLoading(true);
             try{
               const response = await api.get<TotalCourse>(
                 `/course/total` // replace with your API URL
                );
        
              setCourse(response.data);
              }catch(err){
                alert('Error fetching total department');
               } finally {
                 //setIsLoading(false);
               }
             }

             

       const fetchDepartmentStat = async () => {
           const response = await api.get<DepartmentData[]>("/departs/total");
           setTotalDe(response.data);
           };

          //   const fetchResultStat = async () => {
          //   const response = await api.get<UsersMarks[]>("/departresult/total");
          //   setTotalResult(response.data);
          //  };

     
          useEffect(()=>{
            fetchDepartmentStat();
          //  fetchResultStat();
          //   console.log("helloxxx",totalResult)
             fetchAccount()
             fetchTotalDepartment();

              const fetchResultStat = async () => {
              const response = await api.get<UsersMarks[]>("/departresult/total");
              setTotalResult(response.data);
              };
              const fetchCoursetStat = async () => {
              const userresponse = await api.get<ChartDataInput[]>("/courses/total");
              setUserResult(userresponse.data);
              console.log("jjj",userresponse.data)
              }
            console.log("hshgsgsgs",userResult)
           
          // console.log("xxx",totalResult)
             fetchTotalCourse();
             fetchResultStat();
             fetchCoursetStat();
             
            },[])

  return (
    <div className="">
      {/* Line Chart */}
      <div className="p-6 bg-gray-50 min-h-screen container">
       <h4 className="text-sm text-center font-bold mb-6 pb-3">📊{userinfo?.user?.type_name} Analytics Dashboard</h4>

       {/* Metrics */}
     <div className="row g-4">
        {/* Total Users */}
                {/* department */}
         <div className="col-12 col-md-4">
  <div className="card shadow-sm">
    <div className="card-body d-flex align-items-center">
      {/* User Icon */}
      <i className="bi bi-person-circle fs-1 text-primary me-3"></i>

      {/* Text Content */}
      <div>
        <h5 className="card-title text-muted mb-1">Total users</h5>
        <h5 className="fw-bold">{totalaccount?.total}</h5>
      </div>
    </div>
  </div>
</div>

        {/* department */}
         <div className="col-12 col-md-4">
  <div className="card shadow-sm">
    <div className="card-body d-flex align-items-center">
      {/* User Icon */}
      <i className="bi bi-bank fs-1 text-primary me-3"></i>

      {/* Text Content */}
      <div>
        <h5 className="card-title text-muted mb-1">Departments</h5>
        <h5 className="fw-bold">{totalde?.total}</h5>
      </div>
    </div>
  </div>
</div>

        {/* Orders */}
    <div className="col-12 col-md-4">
      <div className="card shadow-sm">
      <div className="card-body d-flex align-items-center">
       {/*User Icon*/}
      <i className="bi bi-pencil-square fs-1 text-primary me-3"></i>

      {/*Text Content*/}
      <div>
        <h5 className="card-title text-muted mb-1">Courses</h5>
        <h5 className="fw-bold">{totalcourse?.total}</h5>
      </div>
    </div>
  </div>
</div>

      </div>
       <div className="bg-white p-6 rounded-2xl shadow">
          <h5 className="text-md font-semibold pt-3 px-3 mb-4">Students per department</h5>
        <ResponsiveContainer width="100%" height={300}>
         <LineChart data={totalDepart} width={600} height={300}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis
    dataKey="department"
    interval={0}              // show all labels
    angle={-30}               // rotate
    textAnchor="end"          // align properly
    height={80}               // add space for labels
    tick={{ fontSize: 14, dy: 10 }} // styling
  />
  <YAxis />
  <Tooltip />
  <Line
    type="monotone"
    dataKey="student"
    stroke="#4F46E5"
    strokeWidth={3}
  />
</LineChart>
        </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow">
          <h5 className="text-md font-semibold pt-3 px-3 mb-4">Department Performance</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={totalResult}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="marksobtained" fill="#4F46E5" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

 <div className="bg-white p-6 rounded-2xl shadow">
<h5 className="text-xl font-semibold mb-4">Subject Performance</h5>

<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={userResult  as unknown as any[]}
      dataKey="value"
      nameKey="name"
      outerRadius={100}
      label={({ name, value }) => {
      const total=userResult.reduce((acc, item) => acc + item.value, 0);
      const percent=(((value as number) / total) * 100).toFixed(1);
      return `${name}: ${percent}%`;
      }}
    >
      {categories.map((_, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Legend 
      verticalAlign="bottom" 
      height={36} 
      formatter={(value) => value} // optional: format legend text
    />
  </PieChart>
</ResponsiveContainer>



</div>

    </div>
  );
  
}

export default Dashboard
