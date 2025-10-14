import React, { useEffect, useState } from 'react';
import { api } from '../Services/api';
import {
  Departments,
  ApiResponsedepartments,
  Department,
  getApiLevel,
  Level,
  Semester,
  Instructor,
  Course,
  Day,
  TimetableType,
  CourseSchedule,
  Quiz,
  QuizSummary,
  QuizQuestion,
  Onequestion,
  QuestionOption,
} from '../Services/Objects';

function Preparequiz() {
  const [department, setDepartment] = useState<Department[]>([]);
  const [levels, setLevel] = useState<Level[]>([]);
  const [semesterss, setSemester] = useState<Semester[]>();
  const [instructor, setInstructor] = useState<Instructor[]>();
  const [courses, setCourse] = useState<Course[]>();
  const [oneque, setOneque] = useState<Onequestion | null>(null);
  const [types, setType] = useState<TimetableType[]>();
  const [plan, setPlan] = useState({
    course_id: '',
    instructor_id: 0,
    day_id: 0,
    room: '',
    start_time: '',
    end_time: '',
    semester: '',
    academic_year: '',
    level_id: 0,
    deptid: 0,
    typeid: 0,
  });
  const [getmesstime, setMessagetime] = useState({ message: '', quiz_id: 0 });
  const [getmess, setMessage] = useState('');
  const userinfo = JSON.parse(localStorage.getItem('auth')!);
  const [quize, setQuiz] = useState<Quiz>({
    quiz_title: '',
    quiz_description: '',
    department_id: 0,
    level_id: 0,
    course_id: 0,
    prepared_by: userinfo.user.id,
    total_marks: 0,
    duration: 0,
    deadline: '',
  });
  const [quizs, setQuizs] = useState<QuizSummary[]>([]);
  const [quizas, setQuizas] = useState<QuizQuestion>({ quiz_id: 0, question_text: '', marks: 0 });
  const [messageq, setMessageq] = useState({ message: '', question_id: '' });
  const [option, setOption] = useState<QuestionOption>({ question_id: 0, option_text: '', is_correct: false });
  const [optionres, setOptionres] = useState({ message: '', option_id: 0 });

  useEffect(() => {
    fetchDepartments();
    fetchLevel();
    fetchCourse();
    // Fetch quizzes only if quiz_id is available
    if (getmesstime.quiz_id) {
      fetchQuizid(getmesstime.quiz_id);
    }
    // Fetch question only if question_id is available
    if (messageq.question_id) {
      fetchOneque(messageq.question_id);
    }
  }, [getmesstime.quiz_id, messageq.question_id]);

  const fetchDepartments = async () => {
    try {
      const response = await api.get<Department[]>('/department');
      setDepartment(response.data);
      console.log('Departments:', response.data);
    } catch (err) {
      console.error('Failed to fetch departments:', err);
    }
  };

  const fetchQuizid = async (quizId: number) => {
    try {
      const response = await api.get<QuizSummary[]>(`/quizzes?quiz_id=${quizId}`);
      setQuizs(response.data);
      console.log('Quizzes:', response.data);
    } catch (err) {
      console.error('Failed to fetch quizzes:', err);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await api.get<Course[]>('/api/courses');
      setCourse(response.data);
      console.log('Courses:', response.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  const fetchLevel = async () => {
    try {
      const response = await api.get<getApiLevel>('/levels');
      setLevel(response.data.levels);
      console.log('Levels:', response.data.levels);
    } catch (err) {
      console.error('Failed to fetch levels:', err);
    }
  };

  const fetchOneque = async (quid: string) => {
    try {
      const response = await api.get<Onequestion>(`/quiz-questions/${quid}`);
      setOneque(response.data);
      console.log('Question:', response.data);
    } catch (err) {
      console.error('Failed to fetch question:', err);
    }
  };

  const resetQuestionForm = () => {
    setQuizas({ quiz_id: 0, question_text: '', marks: 0 });
    setMessageq({ message: '', question_id: '' });
  };

  return (
    <div className="container mt-1">
      {getmesstime.message && (
        <div className="alert alert-success alert-dismissible">
          <strong>
            {getmesstime.message}-{getmesstime.quiz_id}
          </strong>{' '}
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await api.post('/preparequizze', quize);
            setMessagetime(response.data);
            fetchQuizid(response.data.quiz_id);
          } catch (error: any) {
            setMessagetime({ message: error.message, quiz_id: 0 });
          }
        }}
      >
        <fieldset className="border border-primary rounded p-3">
          <legend className="float-none w-auto px-2">Quiz info</legend>
          <div className="row mb-1">
            <div className="col-md-3">
              <label className="form-label">Quiz/Assignment Title</label>
              <input
                type="text"
                value={quize.quiz_title}
                className="form-control"
                onChange={(e) => setQuiz((prev) => ({ ...prev, quiz_title: e.target.value }))}
                placeholder=""
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Quiz Description</label>
              <input
                type="text"
                value={quize.quiz_description}
                className="form-control"
                onChange={(e) => setQuiz((prev) => ({ ...prev, quiz_description: e.target.value }))}
                required
              />
              <input type="text" value={quize.prepared_by} className="form-control" hidden />
            </div>
            <div className="col-md-3">
              <label className="form-label">Total Marks</label>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setQuiz((prev) => ({ ...prev, total_marks: Number(e.target.value) }))}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Department</label>
              <select
                className="form-select"
                onChange={(e) => setQuiz((prev) => ({ ...prev, department_id: Number(e.target.value) }))}
                required
              >
                <option value="">Choose dept...</option>
                {department.map((item) => (
                  <option key={item.department_id} value={item.department_id}>
                    {item.department_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Level</label>
              <select
                className="form-select"
                onChange={(e) => setQuiz((prev) => ({ ...prev, level_id: Number(e.target.value) }))}
                required
              >
                <option value="">Choose...</option>
                {levels.map((item) => (
                  <option key={item.level_id} value={item.level_id}>
                    {item.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Subject</label>
              <select
                className="form-select"
                onChange={(e) => setQuiz((prev) => ({ ...prev, course_id: Number(e.target.value) }))}
              >
                <option value="">Choose subject...</option>
                {courses?.map((item) => (
                  <option key={item.course_id} value={item.course_id}>
                    {item.course_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Duration (seconds)</label>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setQuiz((prev) => ({ ...prev, duration: Number(e.target.value) }))}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Deadline</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setQuiz((prev) => ({ ...prev, deadline: e.target.value }))}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary d-block mx-auto">
            Create Quiz
          </button>
        </fieldset>
      </form>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await api.post('/quiz-questions', quizas);
            setMessageq(response.data);
            fetchOneque(response.data.question_id);
            resetQuestionForm(); // Reset form after successful submission
          } catch (error: any) {
            setMessageq({ message: error.message, question_id: '' });
          }
        }}
      >
        {messageq.message && (
          <div className="alert alert-success alert-dismissible">
            <strong>
              {messageq.message}-{messageq.question_id}
            </strong>{' '}
            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
          </div>
        )}
        <fieldset className="border border-primary rounded p-3">
          <legend className="float-none w-auto px-2">Question info</legend>
          <div className="row mb-1">
            <div className="col-md-12">
              <label className="form-label">Question description</label>
              <input
                type="text"
                className="form-control"
                value={quizas.question_text}
                onChange={(e) => setQuizas((prev) => ({ ...prev, question_text: e.target.value }))}
                placeholder="Ask question now?"
              />
            </div>
          </div>
          <div className="row mb-1">
            <div className="col-md-6">
              <label className="form-label">Mark/Question</label>
              <input
                type="number"
                className="form-control"
                value={quizas.marks}
                onChange={(e) => setQuizas((prev) => ({ ...prev, marks: Number(e.target.value) }))}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Link Question to Quiz</label>
              <select
                className="form-select"
                value={quizas.quiz_id}
                onChange={(e) => setQuizas((prev) => ({ ...prev, quiz_id: Number(e.target.value) }))}
                required
              >
                <option value="">Choose quiz...</option>
                {quizs?.map((item) => (
                  <option key={item.quiz_id} value={item.quiz_id}>
                    {item.quiz_title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary d-block mx-auto">
            Create Question
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => fetchQuizid(getmesstime.quiz_id)}
          >
            Load Quizzes
          </button>
        </fieldset>
      </form>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await api.post('/question-options', option);
            setOptionres(response.data);
            setOption({ question_id: option.question_id, option_text: '', is_correct: false }); // Reset option form
          } catch (error: any) {
            alert(error.message);
          }
        }}
      >
        {optionres.message && (
          <div className="alert alert-success alert-dismissible">
            <strong>
              {optionres.message}-{optionres.option_id}
            </strong>{' '}
            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
          </div>
        )}
        <fieldset className="border border-primary rounded p-3">
          <legend className="float-none w-auto px-2">Question option info</legend>
          <div className="row mb-1">
            <div className="col-md-5">
              <label className="form-label">Enter choices (options)</label>
              <input
                type="text"
                className="form-control"
                value={option.option_text}
                onChange={(e) => setOption((prev) => ({ ...prev, option_text: e.target.value }))}
                placeholder="Enter option"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Link option to question</label>
              <select
                className="form-select"
                value={option.question_id}
                onChange={(e) => setOption((prev) => ({ ...prev, question_id: Number(e.target.value) }))}
                required
              >
                <option value="">Choose question...</option>
                {oneque && (
                  <option value={oneque.question_id}>{oneque.question_text}</option>
                )}
              </select>
            </div>
            <div className="col-md-4">
              <input
                className="form-check-input border border-primary"
                type="checkbox"
                checked={option.is_correct}
                onChange={(e) => setOption((prev) => ({ ...prev, is_correct: e.target.checked }))}
              />
              <label className="form-check-label">Is it a correct answer?</label>
              <div>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => fetchOneque(messageq.question_id)}
                >
                  Load Question
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary d-block mx-auto">
            Create Option
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Preparequiz;