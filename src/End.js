import React , { useState, useEffect } from 'react';
import './Start.css'; // Import CSS for styling
import { Link } from 'react-router-dom';
import {Button} from 'antd';


function EndPage() {
  const [data, setData] = useState(null);
  const apiUrl = '/api/get_info/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after first render

  // return (
  //   <div>
  //     <h1>Fetching Data from API</h1>
  //     {data ? (
  //       <pre>{JSON.stringify(data, null, 2)}</pre>
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </div>
  // );
  return (
    <div className="main-content">
      <h1>实验结束</h1>
      <p style={{textAlign:'center'}}>本次实验到此结束，感谢您的配合！</p>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><Button className="start-button" >实验结束</Button></Link>
    </div>
  );
}

export default EndPage;
