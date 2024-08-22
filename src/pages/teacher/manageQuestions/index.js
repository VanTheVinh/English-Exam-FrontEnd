import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { message, Modal } from 'antd';
import styles from './ManageQuestions.module.scss';

const ManageQuestions = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    examId: '',
    questionText: '',
    difficulty: 'easy',
    questionAnswers: Array(4).fill({ answerText: '', isCorrect: false }),
  });
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log(1);
    
    fetch('http://localhost:8000/question')
      .then((response) => response.json())
      .then((data) => {
        setQuestionsData(data.question);
        setLoading(false); // Update loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching questions data:', error);
        setError('Failed to fetch questions data.'); // Set error message
        setLoading(false); // Update loading to false if there's an error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredData = questionsData.filter(
    (question) =>
      question.examId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.questionText
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      question.difficulty?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleRemoveAnswer = (index) => {
    const newAnswers = formData.questionAnswers.map((answer, i) =>
      i === index ? { answerText: '', isCorrect: false } : answer,
    );
    setFormData({
      ...formData,
      questionAnswers: newAnswers,
    });
  };

  const handleEditClick = (question) => {
    setFormData({
      examId: question.examId || '',
      questionText: question.questionText || '',
      difficulty: question.difficulty || 'easy',
      questionAnswers:
        question.questionAnswers.length === 4
          ? question.questionAnswers
          : Array(4).fill({ answerText: '', isCorrect: false }),
    });
    setEditingQuestionId(question._id);
  };

  const handleSubmit = () => {
    if (editingQuestionId) {
      fetch(`http://localhost:8000/question/${editingQuestionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => {
          setQuestionsData(
            questionsData.map((question) =>
              question._id === editingQuestionId
                ? { ...question, ...formData }
                : question,
            ),
          );
          message.success('Update succeeded!');
          setEditingQuestionId(null);
          setFormData({
            examId: '',
            questionText: '',
            difficulty: 'easy',
            questionAnswers: Array(4).fill({
              answerText: '',
              isCorrect: false,
            }),
          });
        })
        .catch((error) => console.error('Error updating question:', error));
    } else {
      fetch('http://localhost:8000/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.question) {
            setQuestionsData([...questionsData, data.question]);
            message.success('Question created successfully!');
            setFormData({
              examId: '',
              questionText: '',
              difficulty: 'easy',
              questionAnswers: Array(4).fill({
                answerText: '',
                isCorrect: false,
              }),
            });
          } else {
            message.error('Failed to create question.');
          }
        })
        .catch((error) => {
          console.error('Error creating question:', error);
          message.error('Error creating question.');
        });
    }
  };

  const handleReset = () => {
    setFormData({
      examId: '',
      questionText: '',
      difficulty: 'easy',
      questionAnswers: Array(4).fill({ answerText: '', isCorrect: false }),
    });
    setEditingQuestionId(null);
  };

  const handleDeleteClick = (questionId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this question?',
      onOk: () => {
        fetch(`http://localhost:8000/question/${questionId}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setQuestionsData(
                questionsData.filter((question) => question._id !== questionId),
              );
              message.success('Question deleted successfully!');
            } else {
              message.error('Failed to delete question.');
            }
          })
          .catch((error) => {
            console.error('Error deleting question:', error);
            message.error('Error deleting question.');
          });
      },
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAnswerChange = (index, e) => {
    const { name, value, checked } = e.target;
    const newAnswers = [...formData.questionAnswers];
    newAnswers[index] = {
      ...newAnswers[index],
      [name]: name === 'isCorrect' ? checked : value,
    };
    setFormData({
      ...formData,
      questionAnswers: newAnswers,
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box className={styles.manage_questions}>
      <h1 className={styles.title}>Manage Questions</h1>

      {/* Form Section */}
      <Box
        component="form"
        sx={{ marginBottom: '20px' }}
        className={styles.box_questions}
      >
        <div className={styles.form_container}>
          {/* Exam ID and Question Text Inputs */}
          {['Exam Id', 'Question Text'].map((label, index) => (
            <div key={index} className={styles.grid_item}>
              <div className={styles.input_container}>
                <label
                  className={styles.input_label}
                  htmlFor={`input${index + 1}`}
                >
                  {label}
                </label>
                <input
                  type="text"
                  id={['examId', 'questionText'][index]}
                  className={styles.input_field}
                  value={formData[['examId', 'questionText'][index]] || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          ))}

          {/* Difficulty Dropdown */}
          <div className={styles.grid_item}>
            <div className={styles.input_container}>
              <label className={styles.input_label} htmlFor="difficulty">
                Difficulty
              </label>
              <select
                id="difficulty"
                className={styles.input_field}
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className={styles.answers_container}>
          <h3 className={styles.answers_title}>Answers:</h3>
          <div className={styles.answers_grid}>
            {formData.questionAnswers.map((answer, index) => (
              <div key={index} className={styles.answer_item}>
                <div className={styles.input_container}>
                  <label
                    className={styles.input_label}
                    htmlFor={`answerText-${index}`}
                  >
                    Answer Text ({String.fromCharCode(65 + index)}):
                  </label>
                  <input
                    type="text"
                    id={`answerText-${index}`}
                    name="answerText"
                    value={answer.answerText}
                    onChange={(e) => handleAnswerChange(index, e)}
                  />
                </div>
                <div className={styles.input_container}>
                  <label
                    className={styles.input_label}
                    htmlFor={`isCorrect-${index}`}
                  >
                    Is Correct:
                  </label>
                  <input
                    type="checkbox"
                    id={`isCorrect-${index}`}
                    name="isCorrect"
                    checked={answer.isCorrect}
                    onChange={(e) => handleAnswerChange(index, e)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Box sx={{ marginTop: '20px' }} className={styles.box_btn_questions}>
          <Button
            variant="contained"
            color="error"
            className={styles.btn_update}
            onClick={handleSubmit}
          >
            {editingQuestionId ? 'Update' : 'Create'}
          </Button>
          <Button
            variant="outlined"
            sx={{ marginLeft: '10px' }}
            className={styles.btn_reset}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Box>

        {/* Search Input */}
        <div className={styles.grid_item}>
          <div className={styles.input_container}>
            <label className={styles.input_label} htmlFor="search">
              Search:
            </label>
            <input
              type="text"
              id="search"
              className={styles.input_field}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </Box>

      {/* Questions Table */}
      <TableContainer component={Paper} className={styles.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                #
              </TableCell>
              <TableCell
                style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Exam ID
              </TableCell>
              <TableCell
                style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Question Text
              </TableCell>
              <TableCell
                style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Difficulty
              </TableCell>
              <TableCell
                style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((question, index) => (
              <TableRow key={question._id}>
                <TableCell style={{ textAlign: 'center', fontSize: '12px' }}>
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell style={{ textAlign: 'center', fontSize: '12px' }}>
                  {question.examId}
                </TableCell>
                <TableCell style={{ textAlign: 'center', fontSize: '12px' }}>
                  {question.questionText}
                </TableCell>
                <TableCell style={{ textAlign: 'center', fontSize: '12px' }}>
                  {question.difficulty}
                </TableCell>
                <TableCell style={{ textAlign: 'center', fontSize: '12px' }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(question)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(question._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default ManageQuestions;
