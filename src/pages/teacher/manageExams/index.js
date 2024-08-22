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
import styles from './ManageExams.module.scss';
import { message, Modal } from 'antd';

const ManageExams = () => {
    const [examData, setExamData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [formData, setFormData] = useState({
        classId: '',
        examCode: '',
        examName: '',
        duration: '',
        questionCount: ''
    });
    const [editingExamId, setEditingExamId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch exam data from the API
    useEffect(() => {
        fetch('http://localhost:8000/exam')
            .then((response) => response.json())
            .then((data) => setExamData(data.exam))
            .catch((error) => console.error('Error fetching exam data:', error));
    }, []);

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Filter and paginate data
    const filteredData = examData.filter(exam =>
        exam.classId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.examCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.examName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.duration?.toLowerCase().includes(searchQuery) ||
        exam.status?.toLowerCase().includes(searchQuery)
    );

    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    // Handle form field change
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    // Handle edit button click
    const handleEditClick = (exam) => {
        setFormData({
            classId: exam.classId || '',
            examCode: exam.examCode || '',
            examName: exam.examName || '',
            duration: exam.duration || '',
            questionCount: exam.questionCount || ''
        });
        setEditingExamId(exam._id);
    };

    // Handle form submission
    const handleSubmit = () => {
        if (editingExamId) {
            // Update existing exam
            fetch(`http://localhost:8000/exam/${editingExamId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then(() => {
                    // Update the exam data after successful update
                    setExamData(examData.map((exam) =>
                        exam._id === editingExamId ? { ...exam, ...formData } : exam
                    ));
                    message.success("Update succeeded!");
                    // Reset form and editing state
                    setEditingExamId(null);
                    setFormData({
                        classId: '',
                        examCode: '',
                        examName: '',
                        duration: '',
                        questionCount: ''
                    });
                })
                .catch((error) => console.error('Error updating exam:', error));
        } else {
            // Create new exam
            fetch('http://localhost:8000/exam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.exam) {
                        setExamData([...examData, data.exam]);
                        message.success("Exam created successfully!");
                        // Reset form and editing state
                        setFormData({
                            classId: '',
                            examCode: '',
                            examName: '',
                            duration: '',
                            questionCount: ''
                        });
                    } else {
                        message.error('Failed to create exam.');
                    }
                })
                .catch((error) => {
                    console.error('Error creating exam:', error);
                    message.error('Error creating exam.');
                });
        }
    };

    // Handle reset button click
    const handleReset = () => {
        setFormData({
            classId: '',
            examCode: '',
            examName: '',
            duration: '',
            questionCount: ''
        });
        setEditingExamId(null);
    };

    // Handle delete button click
    const handleDeleteClick = (examId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this exam?',
            onOk: () => {
                fetch(`http://localhost:8000/exam/${examId}`, {
                    method: 'DELETE',
                })
                    .then((response) => {
                        if (response.ok) {
                            // Remove the deleted exam from the state
                            setExamData(examData.filter((exam) => exam._id !== examId));
                            message.success('Exam deleted successfully!');
                        } else {
                            message.error('Failed to delete exam.');
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting exam:', error);
                        message.error('Error deleting exam.');
                    });
            },
        });
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Box className={styles.manage_exams}>
            <h1 className={styles.title}>Manage Exams</h1>

            {/* Form Section */}
            <Box component="form" sx={{ marginBottom: '20px' }} className={styles.box_exams}>
                <div className={styles.form_container}>


                    {/* Form Inputs */}
                    {['Class Id', 'Exam code', 'Exam name', 'Duration', 'Question count'].map((label, index) => (
                        <div key={index} className={styles.grid_item}>
                            <div className={styles.input_container}>
                                <label className={styles.input_label} htmlFor={`input${index + 1}`}>{label}</label>
                                <input
                                    type="text"
                                    id={['classId', 'examCode', 'examName', 'duration', 'questionCount'][index]}
                                    className={styles.input_field}
                                    value={formData[['classId', 'examCode', 'examName', 'duration', 'questionCount'][index]] || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <Box sx={{ marginTop: '20px' }} className={styles.box_btn_exams}>
                    <Button
                        variant="contained"
                        color="error"
                        className={styles.btn_update}
                        onClick={handleSubmit}
                    >
                        {editingExamId ? 'Update' : 'Create'}
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
                        <label className={styles.input_label} htmlFor="search">Search:</label>
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

            {/* Table Section */}
            <TableContainer component={Paper} className={styles.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>#</TableCell>
                            <TableCell style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>ClassId</TableCell>
                            <TableCell style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>ExamCode</TableCell>
                            <TableCell style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>ExamName</TableCell>
                            <TableCell style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>Duration</TableCell>
                            <TableCell style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>QuestionCount</TableCell>
                            <TableCell style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((exam, index) => (
                            <TableRow key={exam._id}>
                                <TableCell style={{ textAlign: 'center', fontSize: '12px' }}>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell style={{ textAlign: 'center', fontSize: '12px' }}>{exam.classId ? exam.classId : 'N/A'}</TableCell>
                                <TableCell style={{ textAlign: 'center', fontSize: '12px' }}>{exam.examCode ? exam.examCode : 'N/A'}</TableCell>
                                <TableCell style={{ textAlign: 'center', fontSize: '12px' }}>{exam.examName ? exam.examName : 'N/A'}</TableCell>
                                <TableCell style={{ textAlign: 'center', fontSize: '12px' }}>{exam.duration ? exam.duration : 'N/A'}</TableCell>
                                <TableCell style={{ textAlign: 'center', fontSize: '12px' }}>{exam.questionCount ? exam.questionCount : 'N/A'}</TableCell>
                                <TableCell style={{ textAlign: 'center', fontSize: '12px' }}>{exam.status ? exam.status : 'N/A'}</TableCell>
                                <TableCell style={{ textAlign: 'center', fontSize: '12px' }}>
                                    <IconButton color="primary" onClick={() => handleEditClick(exam)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDeleteClick(exam._id)}>
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

export default ManageExams;
