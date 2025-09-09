

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
  level_id: number;
  level_name: string;
  description: string;
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
  created_at: string; // ISO date string
}

 export interface ApiResponsedepartment {
   results:Department[];
}



           

