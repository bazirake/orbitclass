// // src/components/CreateFolderForm.tsx
// import React, { useState } from 'react';
// import { Folder } from '../Services/Objects';

// interface Props {
//   onSubmit: (data: Omit<Folder, 'id' | 'createdAt' | 'courses'>) => void;
//   onClose: () => void;
// }

// const CreateFolderForm: React.FC<Props> = ({ onSubmit, onClose }) => {
//   const [name, setName] = useState('');
//   const [department, setDepartment] = useState('');
//   const [course, setCourse] = useState('');
//   const [level, setLevel] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({ name, department, course, level });
//     onClose();
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="modal-dialog">
//         <div className="modal-content p-3">
//           <h5>Create Folder</h5>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-2">
//               <input
//                 className="form-control"
//                 placeholder="Folder name"
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 className="form-control"
//                 placeholder="Department"
//                 value={department}
//                 onChange={e => setDepartment(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 className="form-control"
//                 placeholder="Course"
//                 value={course}
//                 onChange={e => setCourse(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 className="form-control"
//                 placeholder="Level"
//                 value={level}
//                 onChange={e => setLevel(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="d-flex justify-content-end">
//               <button className="btn btn-secondary btn-sm me-2" type="button" onClick={onClose}>
//                 Cancel
//               </button>
//               <button className="btn btn-primary btn-sm" type="submit">
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateFolderForm;

import React from 'react'

function CreateFolderForm() {
  return (
    <div>
      
    </div>
  )
}

export default CreateFolderForm

