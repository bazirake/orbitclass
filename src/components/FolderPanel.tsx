import { wait } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react';
import { api } from '../Services/api';
import { EMAILS, UploadedFile } from '../Services/Objects';

interface UploadCoursePanelProps {
  isOpen: boolean;
  onClose: () => void;
  folder: {
    id: number;
    name: string;
    department: string;
    course: string;
    level: string;
    createdAt: string;
  } | null;
}

const FolderPanel: React.FC<UploadCoursePanelProps> = ({isOpen,onClose,folder}) => {
  const[selectedFile,setSelectedFile]=useState<File|null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [emails,setEmails]=useState<EMAILS[]>([])
  const [pemail,setPemail]=useState<string[]>([]);

  const[uploadres,setUpload]=useState('');

   const fetchCourseFiles = async (fid:any) => {
           //etIsLoading(true);
           try{
             const response = await api.get<UploadedFile[]>(
               `/api/folder/${fid}/files` // replace with your API URL
              );
      
               console.log("Folders",response.data);
           // alert(response.data.quiz_id);
              setUploadedFiles(response.data); // set API array to state
              console.log("Folders",response.data);
         }catch(err){
              // setError("Failed to fetch departments");
             } finally {
               //setIsLoading(false);
             }
           }
            const notifyStudent = async (recipient:any,subject:any,message:any) => {
           //etIsLoading(true);
             try{
                 await api.post('/api/sendemail',{
                    to:recipient,
                    subject:subject,
                    text:message
                 });
            }
              catch(err){
                alert('No recipients defined while nofitying Students.');
              }
            }

             const fetchEmails = async (dep:any,leid:any) => {
              //localStorage.removeItem('emails');
             try{
                const response = await api.get<string[]>(
                `/emails?level_id=${leid}&department_name=${dep}` // replace with your API URL
              );
               //Store in localStorage
               localStorage.setItem('emails', JSON.stringify(response.data));
               console.log("emails",response.data);
              //alert(response.data.quiz_id);
              //setEmails(response.data); // set API array to state
              setPemail(response.data)
              console.log("emails",response.data);
           }catch(err){
              // setError("Failed to fetch departments");
             } finally {
               //setIsLoading(false);
             }
           }

 
    useEffect(()=>{
     fetchCourseFiles(folder?.id)
    },[folder,uploadres])
    if(!isOpen || !folder) return null;
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0){
      setSelectedFile(e.target.files[0]);
    }
  };
  


const handleUpload = async()=>{
  if (!selectedFile) return;
  const formData = new FormData();
  formData.append('file', selectedFile); // 'file' matches upload.single('file')
  formData.append('folderId', folder.id.toString());
  // Optional: check what you're sending
 // console.log([...formData.entries()]);
  try {
    const res = await api.post(
      '/api/uploadcourse',      
      formData,   // ✅ send the FormData itself, not .entries()
       {
        headers:{
        }
      }
    );
      setUpload(res.data.message);
      fetchCourseFiles(folder?.id);
      fetchEmails(folder.department,folder.level)
      
      const storedEmails: string[] = (() => {
      const item = localStorage.getItem('emails');
      try {
        const parsed = item ? JSON.parse(item) : [];
         return Array.isArray(parsed) ? parsed : [];
       } catch {
        return [];
       }
       })();
      console.log("email notification",storedEmails)
       notifyStudent(storedEmails,'KDU ORBIT CLASS COURSE NOTIFICATION',`Dear Student(s) ${folder.course} has been uploaded.Please!visit KDU Orbit class system to download couses files`)
      alert(res.data.message)
      setSelectedFile(null)
      console.log('File upload',res.data);
       }catch (err){
       if(err){
        console.error('Server responded with error:');
       }else{
        console.error('Network error:', err);
       }
      }
    };

  return(
 <div
  className="fixed-top w-100 h-100 d-flex justify-content-center align-items-center"
  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} // optional dark overlay
  onClick={onClose}
>
  <div
    className="bg-white rounded shadow p-4 w-100"
    style={{ maxWidth: '650px' }}
    onClick={(e) => e.stopPropagation()}
  >
    <h5 className="mb-3 text-center">
       Course files for <strong>{folder.course}</strong>
    </h5>

    {/* File input */}
    <div className="mb-3">
      <input
        type="file"
        className="form-control"
        onChange={handleFileChange}
      />
    </div>

    {/* Upload / Cancel buttons */}
    <div className="mb-3 text-center">
      <button
        className="btn btn-success me-2"
        onClick={handleUpload}
        disabled={!selectedFile}>
        <i className='bi bi-upload'></i> Upload
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
        Cancel
      </button>
    </div>

    {/* Uploaded files list */}
    <h6 className="text-center">Uploaded course Files:</h6>
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>FileName</th>
            <th>UploadedOn</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles && uploadedFiles.length > 0 ? (
            uploadedFiles.map((file) => (
              <tr key={file.id}>
                <td>{file.originalname}</td>
                <td>{new Date(file.created_at).toLocaleDateString()}</td>
                <td>
                  <a
                    href={`http://localhost:3001/uploads/${file.storedAs}`}
                    className="btn btn-sm btn-primary"
                  >
                    <i className="bi bi-download"></i>
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center text-muted">
                No course files uploaded yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};
export default FolderPanel;
