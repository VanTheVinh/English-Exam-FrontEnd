// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// import styles from '~/pages/student/examResults/ExamResults.module.scss';
// import Header from '~/components/header';

// const ExamResults = () => {
//   const [className, setClassName] = useState('');
//   const [results, setResults] = useState([]);
//   const [examDetails, setExamDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch all results
//         const resultsResponse = await axios.get('http://localhost:8000/result');
//         const resultsData = resultsResponse.data.results;
//         setResults(resultsData);

//         // Fetch exam details for each result using examId
//         const examDetailsPromises = resultsData.map(async (result) => {
//           const examResponse = await axios.get(`http://localhost:8000/exam/${result.examId}`);
//           const examData = examResponse.data.exam;

//           // Fetch class name using classId from exam data
//           const classResponse = await axios.get(`http://localhost:8000/class/${examData.classId}`);          
//           const classData = classResponse.data.class.className;
//           setClassName(classData);

//           return {
//             ...result,
//             examCode: examData.examCode,
//             duration: examData.duration,
//             questionCount: examData.questionCount,
//             className: classData,
//           };
//         });

//         const detailedResults = await Promise.all(examDetailsPromises);
//         setExamDetails(detailedResults);
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <Header />
//       <div className={styles.resultPage}>
//         <h1>Exam Results</h1>
//         {examDetails.length > 0 ? (
//           examDetails.map((result) => (
//             <div key={result._id} className={styles.resultCard}>
//               <h2>Class: {className}</h2>
//               <p>Exam Code: {result.examCode}</p>
//               <p>Duration: {result.duration}</p>
//               <p>Questions: {result.questionCount}</p>
//               <p>Score: {result.score}</p>
//               <p>Date Taken: {new Date(result.dateTaken).toLocaleDateString()}</p>
//             </div>
//           ))
//         ) : (
//           <p>No results available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExamResults;








import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from '~/pages/student/examResults/ExamResults.module.scss';
import Header from '~/components/header';

const ExamResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all results
        const resultsResponse = await axios.get('http://localhost:8000/result');
        const resultsData = resultsResponse.data.results;

        // Fetch exam details for each result using examId
        const examDetailsPromises = resultsData.map(async (result) => {
          const examResponse = await axios.get(`http://localhost:8000/exam/${result.examId}`);
          const examData = examResponse.data.exam;

          // Fetch class name using classId from exam data
          const classResponse = await axios.get(`http://localhost:8000/class/${examData.classId}`);
          const classData = classResponse.data.class.className;

          return {
            ...result,
            examCode: examData.examCode,
            duration: examData.duration,
            questionCount: examData.questionCount,
            className: classData,
          };
        });

        const detailedResults = await Promise.all(examDetailsPromises);
        setResults(detailedResults);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <Header />
      <div className={styles.resultPage}>
        <h1>Exam Results</h1>
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th>Class</th>
              <th>Exam Code</th>
              <th>Duration</th>
              <th>Questions</th>
              <th>Score</th>
              <th>Date Taken</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((result) => (
                <tr key={result._id}>
                  <td>{result.className}</td>
                  <td>{result.examCode}</td>
                  <td>{result.duration}</td>
                  <td>{result.questionCount}</td>
                  <td>{result.score}</td>
                  <td>{formatDate(result.dateTaken)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No results available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamResults;
