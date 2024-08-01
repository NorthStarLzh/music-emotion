import React from 'react';
import './Start.css'; // Import CSS for styling
import { Link } from 'react-router-dom';
import { Typography, Button, Input } from 'antd'; // Import Ant Design components
// import 'antd/dist/antd.css'; // Import Ant Design CSS

const { Title, p } = Typography;

function StartPage() {

  return (
    <div className="main-content" style={{ color: 'white' }}> {/* Set color to white */}
      <Title>Music-Emotion实验说明</Title>
      <div className="subtitle">实验说明</div>
      <p style={{ color: 'white' }}>
        本实验基于VA情感空间进行情感描述。VA情感计算空间通常指的是Valence-Arousal情感空间，它是一种常用于描述情感状态的二维坐标系。
        在这个空间中，Valence（愉悦度）代表情感是正面的（高valence）还是负面的（低valence），而Arousal（唤醒度）则代表情感的激活水平，从冷静（低arousal）到兴奋（高arousal）。
      </p>
      <img src={process.env.PUBLIC_URL + '/Group 33.png'} alt="icon" width={200} />
      <p  style={{ color: 'white' }}>
        本实验分为两个部分：个人调整与模型匹配排序。
        在个人调整中，您首先需要听一段音乐，智能模型将自动生成一条情感变化曲线，您需要根据自己的实际情况，将曲线调整成为最适合您的状态。模型将会学习您的个性化数据进而对后续环节的情感曲线进行调整。
        在模型匹配排序中，我们将会播放另外的音乐，您需要在听完音乐后，根据您的实际情况对生成的曲线进行排序。
      </p>
      <div className="subtitle">信息填写</div>
      <span>实验编号</span><Input placeholder="实验编号" style={{ color: 'black', marginBottom: '10px',marginLeft: '20px',height:'40px'
       }} /> {/* Adjust color for input */}
      <br></br>
      <span>实验时间</span><Input placeholder="实验时间" style={{ color: 'black', marginBottom: '10px', marginLeft: '20px',height:'40px' }} /> {/* Adjust color for input */}
      <Link to="/adjustPage" style={{ textDecoration: 'none' }}>
        <Button className="start-button">开始实验</Button>
      </Link>
    </div>
  );
}

export default StartPage;
