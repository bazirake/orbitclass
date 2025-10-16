import React, { useEffect, useState } from 'react';
import { Department, Level, StudentQuizResult, Sparams, Courses, Folderparam, FolderRes, getApiLevel } from '../Services/Objects';
import { api } from '../Services/api';
import FolderPanel from './FolderPanel';

function Course() {
  const [department, setDepartment] = useState<Department[]>([]);
  const [levels, setLevel] = useState<Level[]>([]);
  const [students, setStudents] = useState<StudentQuizResult[]>([]);
  const [sparam, setPara] = useState<Sparams>({ department: '', studentnumber: '', cid: '', level: '' });
  const [folders, setFolders] = useState<FolderRes[]>([]);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [fres, setFolder] = useState({ message: '', folderId: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<FolderRes | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [fparam, setFolderparam] = useState<Folderparam>({ name: '', department: '', course: '', level: '' });

  // Get user info from localStorage (assuming same structure as FolderPanel)
  const userinfo = JSON.parse(localStorage.getItem('auth')!);
  const userType = userinfo?.user?.usertype || 0; // Default to 0 if not found; adjust if user_type is userinfo.user_type
  const canManageFolders = Number(userType) === 1; // ID 1: Can create/delete folders; ID 2: View only

  useEffect(() => {
 // alert(canManageFolders);
    fetchDepartments();
    fetchCourse();
    fetchLevel();
    fetchFolders();
  }, []); // Removed [folders] dependency to avoid infinite loop; refetch triggered manually

  const fetchLevel = async () => {
    try {
      const response = await api.get<getApiLevel>('/levels');
      setLevel(response.data.levels);
      console.log('Levels:', response.data.levels);
    } catch (err) {
      console.error('Failed to fetch levels:', err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await api.get<Department[]>('/department');
      setDepartment(response.data);
      console.log('Departments:', response.data);
    } catch (err) {
      console.error('Failed to fetch departments:', err);
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await api.get<FolderRes[]>(`/api/folders/${userinfo?.user?.department_name}/${userinfo?.user?.level_id}`);
      setFolders(response.data);
      console.log('Folders:', response.data);
    } catch (err) {
      console.error('Failed to fetch folders:', err);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await api.get<Courses[]>('/api/courses');
      setCourses(response.data);
      console.log('Courses:', response.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  const createFolder = async (par: any) => {
    try {
      const response = await api.post('/api/createfolder', par);
      setFolder(response.data);
      console.log('Folder created:', response.data);
      fetchFolders(); // Refresh folder list
      setFolderparam({ name: '', department: '', course: '', level: '' }); // Reset form
      setShowForm(false); // Close form
    } catch (err: any) {
      console.error('Failed to create folder:', err.response?.data || err.message);
      alert(`Failed to create folder: ${err.response?.data?.message || err.message}`);
    }
  };

  const deleteFolder = async (folderId: number) => {
    if (!canManageFolders) {
      alert('You do not have permission to delete folders.');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this folder? This action cannot be undone.');
    if (!confirmed) return;

    try {
      await api.delete(`/api/folders/${folderId}`);
      alert('Folder deleted successfully');
      fetchFolders(); // Refresh folder list
    } catch (err: any) {
      console.error('Failed to delete folder:', err.response?.data || err.message);
      alert(`Error deleting folder: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canManageFolders) {
      alert('You do not have permission to create folders.');
      setShowForm(false);
      return;
    }
    await createFolder(fparam);
  };

  const handleOpenFolder = (folder: FolderRes) => {
    setSelectedFolder(folder);
    setIsPanelOpen(true);
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (canManageFolders) {
      setShowForm(true); // Only show form for ID 1
    } else {
      alert('You do not have permission to create folders.');
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
          {/* {!canManageFolders && (
            <div className="alert alert-warning mb-3">
              <strong>View Only Mode</strong>: You (User Type ID: {userType}) can only view and open folders. 
              Creating or deleting folders requires User Type ID 1. Contact an administrator if needed.
            </div>
          )} */}
          {/* Folders */}
          <div className="row">
            {folders.map((folder) => (
              <div className="col-md-3 mb-3" key={folder.id}>
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
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleOpenFolder(folder)}
                    >
                      <i className="bi bi-eye"></i> Open
                    </button>
                    {canManageFolders && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteFolder(folder.id)}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Course Panel */}
          <FolderPanel
            isOpen={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
            folder={selectedFolder}
          />

          {/* Form popup for folder creation */}
          {showForm && canManageFolders && (
            <div
              className="fixed-top w-100 h-100 d-flex justify-content-center align-items-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10 }}
              onClick={() => setShowForm(false)}
            >
              <div
                className="bg-white rounded shadow p-4 w-100"
                style={{ maxWidth: '400px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <h5 className="text-center mb-3">Create Folder</h5>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Name"
                    value={fparam.name}
                    onChange={(e) =>
                      setFolderparam((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                  />
                  <select
                    className="form-select mb-2"
                    value={fparam.department}
                    onChange={(e) =>
                      setFolderparam((prev) => ({ ...prev, department: e.target.value }))
                    }
                    required
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
                    value={fparam.course}
                    onChange={(e) =>
                      setFolderparam((prev) => ({ ...prev, course: e.target.value }))
                    }
                    required
                  >
                    <option value="">Course</option>
                    {courses.map((item) =>(
                      <option key={item.description} value={item.description}>
                        {item.description}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select mb-3"
                    value={fparam.level}
                    onChange={(e) =>
                      setFolderparam((prev) => ({ ...prev, level: e.target.value }))
                    }
                    required
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