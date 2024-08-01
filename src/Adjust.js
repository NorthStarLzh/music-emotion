import React, { useState } from 'react';
import { Typography, Button } from 'antd';
import LineChart from './LineChart.jsx';
import EmotionChart from './EmotionChart';
import { Link } from 'react-router-dom';
import MusicPlayer from './music-player.jsx';
import './Style.css';

const { Title, p } = Typography;

function AdjustPage() {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const handleShrink = () => {
        setIsFullScreen(false);
    };

    const chartContainerStyle = {
        width: isFullScreen ? '60vw' : '500px',
        height: isFullScreen ? '45vh' : '500px',
        backgroundColor: isFullScreen ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.2)',
        padding: '20px',
        border: '0px solid #ccc',
        borderRadius: '10px',
        marginBottom: '20px',
        position: 'relative', // Make the container relative for absolute positioning of LineChart
    };

    const emotionChartContainerStyle = {
        flex: 1,
        width: '500px',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '20px',
        border: '0px solid #ccc',
        borderRadius: '10px',
        marginBottom: '20px',
        position: 'relative', // Make the container relative for absolute positioning of LineChart
        width: isFullScreen ? 'none' : '50px',
        display: isFullScreen ? 'none' : 'block', // 控制 EmotionChart 的显示状态
    };

    const lineChartStyle = {
        //position: isFullScreen ? 'absolute' : 'static',
        top: isFullScreen ? '0' : 'auto',
        left: isFullScreen ? '0' : 'auto',
        right: isFullScreen ? '0' : 'auto',
        bottom: isFullScreen ? '0' : 'auto',
        zIndex: isFullScreen ? '1000' : 'auto',
        width: isFullScreen ? '60vw' : '500px',
        height: isFullScreen ? '100vh' : '50px',
        //overflow: 'hidden', // Ensure chart doesn't overflow its container
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div className='left-part'>
            <Title level={1} style={{ color: 'white' }}>个性化调整</Title>
            <p style={{ color: 'white' }}>
                在该部分您需要首先听完该音乐片段，之后请根据您的实际情况调整下方的情感曲线。
            </p>
            <MusicPlayer src="music.mp3" />

            <div style={{ display: 'flex' }}>
                <div style={chartContainerStyle}>
                    <LineChart style={lineChartStyle} />
                    <Button onClick={toggleFullScreen} className="nextpage" type="primary" >
                        {isFullScreen ? '缩小' : '放大'}
                    </Button>
                </div>
                <div style={emotionChartContainerStyle}><EmotionChart /></div>
            </div>

            <Link to="/orderPage" style={{ textDecoration: 'none' }}>
                <Button className="nextpage" type="primary" style={{ color: 'white' }}>下一页</Button>
            </Link>
        </div>
    );
}

export default AdjustPage;