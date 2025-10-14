import React, { useEffect, useState, useRef } from 'react';
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

const FolderPanel: React.FC<UploadCoursePanelProps> = ({ isOpen, onClose, folder }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [pemail, setPemail] = useState<string[]>([]);
  const [uploadres, setUploadres] = useState('');
  const userinfo = JSON.parse(localStorage.getItem('auth')!);
  const userType = userinfo?.user?.user_type || 0;
  const canUploadAndManage = userType === 1;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCourseFiles = async (fid: any) => {
    try {
      const response = await api.get<UploadedFile[]>(`/api/folder/${fid}/files`);
      console.log('Files:', response.data);
      setUploadedFiles(response.data);
    } catch (err) {
      console.error('Failed to fetch files:', err);
    }
  };

  const notifyStudent = async (recipient: any, subject: any, message: any) => {
    try {
      await api.post('/api/sendemail', {
        to: recipient,
        subject: subject,
        text: message,
      });
    } catch (err) {
      alert('No recipients defined while notifying Students.');
    }
  };

  const fetchEmails = async (dep: any, leid: any) => {
    try {
      const response = await api.get<string[]>(`/emails?level_id=${leid}&department_name=${dep}`);
      localStorage.setItem('emails', JSON.stringify(response.data));
      console.log('Emails:', response.data);
      setPemail(response.data);
    } catch (err) {
      console.error('Failed to fetch emails:', err);
    }
  };

  useEffect(() => {
    if (folder?.id) {
      fetchCourseFiles(folder.id);
    }
  }, [folder, uploadres]);

  if (!isOpen || !folder) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !canUploadAndManage) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('folderId', folder.id.toString());
    try {
      const res = await api.post('/api/uploadcourse', formData, {
        headers: {},
      });
      setUploadres(res.data.message);
      fetchCourseFiles(folder.id);
      fetchEmails(folder.department, folder.level);
      const storedEmails: string[] = (() => {
        const item = localStorage.getItem('emails');
        try {
          const parsed = item ? JSON.parse(item) : [];
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      })();
      console.log('Email notification to:', storedEmails);
      notifyStudent(
        storedEmails,
        'KDU ORBIT CLASS COURSE NOTIFICATION',
        `Dear Student(s) ${folder.course} has been uploaded. Please! Visit KDU Orbit class system to download course files`
      );
      alert(res.data.message);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      console.log('File upload success:', res.data);
    } catch (err: any) {
      console.error('Upload error:', err.response?.data || err.message);
      alert(`Upload failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  return (
    <div
      className="fixed-top w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={handleCancel}
    >
      <div
        className="bg-white rounded shadow p-4 w-100"
        style={{ maxWidth: '650px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h5 className="mb-3 text-center">
          Course files for <strong>{folder.course}</strong>
        </h5>

        {/* Conditional Upload Section: Only for user_type ID 1 */}
        {canUploadAndManage && (
          <>
            <div className="mb-3">
              <input
                ref={fileInputRef}
                type="file"
                className="form-control"
                onChange={handleFileChange}
                accept="*/*"
              />
            </div>
            <div className="mb-3 text-center">
              <button
                className="btn btn-success me-2"
                onClick={handleUpload}
                disabled={!selectedFile}
              >
                <i className="bi bi-upload"></i> Upload
              </button>
            </div>
          </>
        )}
{/* 
        {!canUploadAndManage && (
          <div className="alert alert-warning mb-3">
            <strong>View Only Mode</strong>: You (User Type ID: {userType}) can only view and download files.
            Upload, create, or delete folders requires User Type ID 1. Contact an administrator if needed.
          </div>
        )} */}

        <div className="mb-3 text-center">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Close
          </button>
        </div>

        <h6 className="text-center">Uploaded Course Files:</h6>
        <div
          className="table-responsive"
          style={{
            maxHeight: '300px', // Set max height for scrollable area
            overflowY: 'auto', // Enable vertical scrolling
            border: '1px solid #dee2e6', // Optional: Match table border
          }}
        >
          <table className="table table-striped table-hover mb-0">
            <thead
              style={{
                position: 'sticky',
                top: 0,
                background: '#fff', // Ensure header stays visible
                zIndex: 1, // Keep header above scrolling content
              }}
            >
              <tr>
                <th>File Name</th>
                <th>Uploaded On</th>
                <th>Actions</th>
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
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-download"></i> Download
                      </a>
                      {canUploadAndManage && (
                        <button
                          className="btn btn-sm btn-danger ms-1"
                          onClick={async () => {
                            if (window.confirm('Delete this file?')) {
                              try {
                                await api.delete(`/api/folder/${folder.id}/files/${file.id}`);
                                setUploadres('File deleted');
                              } catch (err) {
                                alert('Failed to delete file');
                              }
                            }
                          }}
                        >
                          Delete
                        </button>
                      )}
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