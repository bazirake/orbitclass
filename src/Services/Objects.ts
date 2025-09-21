
export type Login={
studentnumber:string;
password:string;
  }

export type Loginerror={
  errorpass?:string;
  errornumber?:string;
}

export type Account={
   fullname: string;
  department: string;
  classes: string;
  studentnumber: string;
  email: string;
  password: string;
  usertype: string;
  tel: string;
 
  }

  export type Accounterror={
   fullname?:string;
  department?:string;
  classes?:string;
  studentnumber?:string;
  email?:string;
  password?:string;
  usertype?:string;
  tel?:string;
  }

  export interface Level {
  level_id:number;
  level_name:string;
  description:string;
  created_at:string;
}

 export interface getApiLevel{
    levels:Level[];
 }

export interface UserType {
  user_type_id:number;
  type_name:string;
  description:string;
  created_at:string; // ISO date string
}

  export interface getApiUserType{
     userTypes:UserType[];
  }

 export interface Department {
  department_id:number;
  department_name:string;
  created_at:string; // ISO date string
}

  export interface Departments {
     department_id:number;
     department_name:string;
     created_at:string; // or Date if you’ll convert it
     level_id:number;
     level_name:string;
     description:string;
     deptid:number;
   }

 export interface ApiResponsedepartment {
   results:Department[];
}

export interface ApiResponsedepartments {
   results:Departments[];
}

 export interface MenuItem {
  id: number;
  label:string;
  href:string;
  icon:string;
  usertype:string;
}

 export interface getMenueItem{
  results:MenuItem[]
}

export interface Semester {
  semester_id: number;         
  semester_name: string;       
  academic_year: string;       
  start_date: string;          
  end_date: string;            
  status: 'active' | 'inactive'; 
  created_at: string;          
  updated_at: string;         
}

export interface Instructor {
  instructor_id: number;      
  first_name: string;         
  last_name: string;          
  email: string;              
  phone: string;              
  hire_date: string;          
  department_id: number;      
  specialization: string;      
  status: 'active' | 'inactive'; 
  created_at: string;          
  updated_at: string;         
}

export interface Course {
  course_id:number;          
  course_code:string;        
  course_name:string;       
  description:string;        
  credit_hours:number;       
  level_id:number;           
  department_id:number;      
  created_at:string;         
  updated_at:string;        
}

export interface Day {
  day_id: number;   
  day_name: string; 
}

export interface TimetableType {
  id: number; 
  type_name: string; 
}

export type CourseSchedule= {
  course_id:string;     
  instructor_id:number;   
  day_id:number;           
  room:string;             
  start_time:string;      
  end_time:string;        
  semester:string;         
  academic_year:string; 
  level_id:number;
  deptid:number; 
  typeid:number; 
}

export interface TimetableRow {
  timerange:string;        
  level: string;            
  department_name:string;     
  semester_name:string;       
  Monday: string;              
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
}

export interface Props {
  data: TimetableRow[];
}


export interface Searchparm{
  department_id:string;
  level_id:string;
  day_name:string;
  semester_id:string;

}



           

