
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
   classes?: string;
   studentnumber: string;
   email: string;
   password: string;
   usertype: string;
   tel: string;
 
  }

  export type Accounterror={
   fullname?:string;
  department?:string;
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
export interface Courses {
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

export interface Quiz {
  quiz_title:string;
  quiz_description:string;
  department_id: number;  // ID of the department
  level_id: number;    
  course_id: number;   
  prepared_by: number;  
  total_marks: number;  
  duration:number;
  deadline:string 
}

export interface QuizQuestion {
  quiz_id:number;     
  question_text:string;  
  marks:number;        
}

export interface QuizSummary {
  quiz_id: number; 
  quiz_title: string; 
}

export interface QuestionOption{
  question_id:number; 
  option_text:string; 
  is_correct:boolean; 
}

export interface QuestionOptions{
  option_id:number; 
  option_text:string; 
  is_correct:boolean; 
}
export interface Onequestion{
  question_id:number;
  question_text:string;
}

// Represents a single question with its options
export interface QuizQuestions {
  question_id: number;
  question_text: string;
  marks:number;
  options: QuestionOptions[];
 }
// Represents a quiz with its questions
export interface QuizWithQuestions {
   quiz_id:number;
   quiz_title:string;
   quiz_description:string;
   total_marks:number;
   deadline:string;
   questions:QuizQuestions[];
}

// The full API response
export type QuizzesApiResponse = QuizWithQuestions[];

export interface StudentAnswer {
  student_id: number;
  quiz_id: number;
  question_id: number;
  option_id: number;
}


export interface StudentResult {
  student_id: number;
  quiz_id: number;
  total_marks_obtained: string;
  total_possible_marks: string;
  percentage: string;
  status: string;
}

export interface SearchStudent{
  FULLNAME:string ,
  department_name:string,
  level_description:string,
  STUDENTNUMBER:string,
  TEL:string,
  EMAIL:string;
}


export interface Courses{
  course_id:number;
  course_name:string ,
  description:string,
  credit_hours:number,
  level_description:string;
  level_id:number,
  department_id:number,
  department_name:string;
  created_at:string;
  updated_at:string;
}


export interface Sparam{
  department:string;
  studentnumber:string;
  level:string;
}

export interface Sparamc{
  department:string;
  
  level:string;
}

export interface Sparams{
  department:string;
  studentnumber:string;
  level:string;
  cid:string;
}


export interface StudentQuizResult {
   STUDENTNUMBER: string;
  student_name: string;
  student_tel: string;
  department: string;
  course: string;
  quiz_id: number;
  level_of_study: string;
  total_marks_obtained: string; // can be string if API returns string
  total_possible_marks: string; // can be string if API returns string
  percentage: string;
  status: string; // could also be a union type e.g. "Pass" | "Fail"
}

export interface FolderRes{
  id: number;                // Unique identifier
  name: string;              // Name of the person/student
  createdAt:string;          // Creation date
  department: string;        // Department name
  course: string;            // Course name
  level: string;             // Level (e.g., beginner, intermediate)
}

export interface Folderparam {
  name: string;
  department: string;
  course: string;
  level: string;
}

export interface UploadedFile {
   id:string;
   folder_id:string
   originalname:string;
   storedAs:string;
   path:string;
   filename:string;
   created_at:string;
}

export interface EMAILS{
  EMAIL:string;
}

export interface TotalDepartment{
  total:string;
}

export interface TotalCourse{
  total:string;
}
export interface TotalAccount{
  total:string;
}

// data.ts
export const sales = [
  { department: "IT", student: 25 },
  { department: "CS", student: 50 },
];

export const categories = [
  { name: "Science", value:900 },
  { name: "Math",  value: 800},
  { name: "History", value: 400 },
  { name: "English", value: 600 },
];

export const COLORS = ["#4F46E5","#10B981","#F59E0B","#EF4444"];

export interface DepartmentData{
  student: number;
  department: string;
}

 export interface UsersMarks {
  marksobtained: number;
  department: string;
  }

 export interface ChartDataInput{
     name:string;
     value:number;
  }

  export interface Message{
     id:number;
     sender_id:string;
     sender_name:string;
     room:number;
     content:string;
     time:string;
  }

 export interface Quizt {
   quiz_id:number;
   deadline:string; // full date and time
   at:string;
 }

export const formatLocalTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};


// export const formatLocalDate = (isoString: string): string => {
//   const date = new Date(isoString);
//   return date.toISOString().split("T")[0];//→"2025-10-18"
// };

// export const formatLocalDate = (isoString: string): string => {
//   const date = new Date(isoString);
//   const yyyy = date.getFullYear();
//   const mm = String(date.getMonth() + 1).padStart(2, "0");
//   const dd = String(date.getDate()).padStart(2, "0");
//   const hh = String(date.getHours()).padStart(2, "0");
//   const min = String(date.getMinutes()).padStart(2, "0");
//   const ss = String(date.getSeconds()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
// };

export const formatLocalDate = (isoString: string): string => {
  const date = new Date(isoString);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  const hh = String(hours).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss} ${ampm}`;
};



export interface QuizModel {
  quiz_id: number;
  quiz_title: string;
  quiz_description: string;
  department_id: number;
  level_id: number;
  description: string;
  course_id: number;
  prepared_by: number;
  created_at: string; // ISO datetime string (e.g., "2025-10-29 08:32:07")
  duration: number;   // duration in minutes or seconds
  course_name: string;
  deadline: string;   // date string (e.g., "2025-10-29")
  total_marks: number;
  preparedby: string; // lecturer name
  Lectnumber: string; // lecturer number
  department_name: string;
}

export interface SubjectPerformance {
  course: string;
  max_marks: number;
  obtained_marks: number;
  overall_percentage: number;
  overall_grade: string;
}

export interface StudentReports{
  STUDENTNUMBER: string;
  student_name: string;
  student_tel: string;
  department: string;
  level_of_study: number;
  subjects: SubjectPerformance[];
  grand_total_marks:number;       // ✅ Total of all subjects' max marks
  total_obtained_marks:number;    // ✅ Total of all obtained marks
  overall_average: number;   
  overall_grade: string; 
  overall_remark: string;//✅ new field   
}

export interface Assess {
  quiz_id: number;
  quiz_title: string;
  quiz_description: string;
  department_id: number;
  level_id: number;
  course_id: number;
  prepared_by: number;
  created_at: string;   // or Date if you will parse it
  duration: number;
  deadline: string;     // or Date if parsed
  total_marks: number;
}












           

