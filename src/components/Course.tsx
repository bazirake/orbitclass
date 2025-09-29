import React, { useEffect, useState } from 'react';
import { Department, Level, StudentQuizResult, Sparams,Courses, Folderparam, FolderRes, getApiLevel } from '../Services/Objects';
import { api } from '../Services/api';
import FolderPanel from './FolderPanel';


function Course() {
   
    const[department,setDepartment]=useState<Department[]>([]);
    const[levels,setLevel]=useState<Level[]>([]);
    const[students,setStudents]=useState<StudentQuizResult[]>([]);
    const[sparam,setPara]=useState<Sparams>({department:'',studentnumber:'',cid:'',level:''});
    const [folders, setFolders] = useState<FolderRes[]>([]);
    const [courses,setCourses]=useState<Courses[]>([])
    const [fres,setFolder]=useState({message:'',folderId:''})
  const [showForm, setShowForm] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<FolderRes | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  // Form fields
  const [fparam,setFolderparam] = useState<Folderparam>({name: '',department: '',course: '',level: ''});
  
      useEffect(()=>{
        fetchDepartments();
        fetchCourse();
        fetchLevel();
        fetchFolders();
      },[folders]);

        //Show form on right click
        const handleRightClick =(e:React.MouseEvent<HTMLDivElement>)=>{
           e.preventDefault();
           setShowForm(true);
        };
        const fetchLevel =async() =>{
                  try{
                      const response = await api.get<getApiLevel>(
                      "/levels" // replace with your API URL
                    );
                    setLevel(response.data.levels);//set API array to state
                         //console.log(levels);
                    }catch (err) {
                       // setError("Failed to fetch departments");
                    } finally {
                        //setIsLoading(false);
                    }
                  };
          const fetchDepartments = async () => {
           //etIsLoading(true);
            try{
               const response = await api.get<Department[]>(
                      "/department" // replace with your API URL
             );
              setDepartment(response.data); // set API array to state
                   console.log("table",response.data);
            }catch (err){
                   // setError("Failed to fetch departments");
                  } finally {
                    //setIsLoading(false);
                  }
                }
                 const fetchFolders = async () => {
               //etIsLoading(true);
               try{
                 const response = await api.get<FolderRes[]>(
                      "/api/getfolders" // replace with your API URL
                  );
                 setFolders(response.data);
                 //alert('hello auto') // set API array to state
                  //  console.log("table",response.data);
                 }catch(err){
                   // setError("Failed to fetch departments");
                  } finally {
                    //setIsLoading(false);
                  }
                }
        const fetchCourse = async()=>{
         //etIsLoading(true);
          try{
             const response=await api.get<Courses[]>(
                    "/api/courses"//replace with your API URL
               );
               setCourses(response.data); // set API array to state
                 console.log("table",response.data);
            }catch(err){
                 //setError("Failed to fetch departments");
                }finally{
                  //setIsLoading(false);
                }
              }
             const createfolder = async(par:any)=>{
           //etIsLoading(true);
            try{
               const response = await api.post(
                      "/api/createfolder",par //replace with your API URL
                 );
                 setFolder(response.data);
                  console.log('Welcome',fparam);

            }catch (err){
                   // setError("Failed to fetch departments");
                  } finally {
                    //setIsLoading(false);
                  }
                }


                const [loading, setLoading] = useState(false);

                 const handleSubmit = async (e: React.FormEvent) => {
                   e.preventDefault();
                   createfolder(fparam);
                   fetchFolders();
                   setShowForm(false)
                   setFolderparam({ name:'', department:'', course:'', level:''});
                  //setLoading(true);
                  //setLoading(false);
            };
              const handleOpenFolder =(folder: FolderRes) => {
               setSelectedFolder(folder);
               setIsPanelOpen(true);
            };
//           const deleteFolder = async (folderId: number) => {
//            try {
//             await api.delete(`/api/folders/${folderId}`);
//          alert('Folder deleted successfully');
//         // refresh folder list
//        } catch (err) {
//        console.error(err);
//        alert('Error deleting folder');
//   }
// };  

const deleteFolder = async (folderId: number) => {
  // Ask for confirmation
  const confirmed = window.confirm('Are you sure you want to delete this folder? This action cannot be undone.');
  if (!confirmed) return; // Stop if user clicked "Cancel"
      try{
        await api.delete(`/api/folders/${folderId}`);
        alert('Folder deleted successfully');
        //refresh folder list here
        }catch(err) {
          console.error(err);
          alert('Error deleting folder');
        }
       };
     return (
     <div className="container mt-2">
      <h4 className="text-center mb-1">Course Management Panel</h4>
      <div
        className="tab-content p-3 border border-1"
        onContextMenu={handleRightClick}
        style={{ minHeight: '300px', position: 'relative' }}
      >
        <fieldset className="border border-primary rounded p-3">
          <legend className="float-none w-auto px-2">Upload Course</legend>
          {/* Folders */}
          <div className="row">
            {folders.map(folder => (
              // key={folder.id}
              <div className="col-md-3 mb-3"  key={folder.id}>
                <div className="card shadow-sm border-primary">
                  <div className="card-body text-center">
                    <i className="bi bi-folder-fill text-warning display-4"></i>
                    <h5 className="card-title mt-0">{folder.name}</h5>

                    <p className="card-text mb-1">
                      <strong>Department:</strong> {folder.department}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Course:</strong> {folder.course}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Level:</strong> {folder.level}
                    </p>
                    <p className="card-text text-muted">
                      Created on: {new Date(folder.createdAt).toLocaleString()}
                    </p>
                    <button
                 className="btn btn-primary btn-sm me-2" onClick={() => handleOpenFolder(folder)}>
                  <i className="bi bi-eye"></i> Open
                 </button>
                   <button
                    className="btn btn-danger btn-sm" onClick={()=>deleteFolder(folder.id)}>
                     <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
              
            
            ))}
          </div>

          {/*Upload Course Panel*/}
         <FolderPanel
          isOpen={isPanelOpen}
          onClose={() =>setIsPanelOpen(false)}
          folder={selectedFolder}
          />
          {/* Form popup */}
          {showForm && (
            <div
     className="fixed-top w-100 h-100 d-flex justify-content-center align-items-center"
     style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10 }}
    onClick={() => setShowForm(false)}
     >
  {/* Modal content */}
  <div
    className="bg-white rounded shadow p-4 w-100"
    style={{ maxWidth: '400px' }}
    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
  >
    <h5 className="text-center mb-3">Create Folder</h5>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Name"
        onChange={(e) =>
          setFolderparam((prev) => ({ ...prev, name: e.target.value }))
        }
        required
      />

      <select
        className="form-select mb-2"
        required
        onChange={(e) =>
          setFolderparam((prev) => ({ ...prev, department: e.target.value }))
        }
      >
        <option value="">Department</option>
        {department.map((item) => (
          <option key={item.department_name} value={item.department_name}>
            {item.department_name}
          </option>
        ))}
      </select>

      <select
        className="form-select mb-2"
        required
        onChange={(e) =>
          setFolderparam((prev) => ({ ...prev, course: e.target.value }))
        }
      >
        <option value="">Course</option>
        {courses.map((item) => (
          <option key={item.description} value={item.description}>
            {item.description}
          </option>
        ))}
      </select>

      <select
        className="form-select mb-3"
        required
        onChange={(e) =>
          setFolderparam((prev)=>({ ...prev, level: e.target.value }))
        }
      >
        <option value="">Level</option>
        {levels.map((item) => (
          <option key={item.level_id} value={item.level_id}>
            {item.description}
          </option>
        ))}
      </select>

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary btn-sm">
          Create
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
            
          )}
        </fieldset>
      </div>
    </div>
  );
}

export default Course;
