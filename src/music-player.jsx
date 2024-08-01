import React, { useState, useRef, useEffect } from 'react';
import './music-player.css'; // 样式文件
import { Button, Slider } from 'antd'; // Importing Ant Design components
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'; // Importing Ant Design icons
//import 'antd/dist/antd.css'; // Importing Ant Design CSS

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [songTitle, setSongTitle] = useState('');
    const audioPlayer = useRef(null);

    useEffect(() => {
        // Update song title when audio source changes
        if (audioPlayer.current) {
            setSongTitle(audioPlayer.current.src.split('/').pop()); // Extract filename
        }
    }, [audioPlayer.current]);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioPlayer.current.pause();
        } else {
            audioPlayer.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioPlayer.current.currentTime);
        setDuration(audioPlayer.current.duration);
    };

    const handleSeek = (value) => {
        const seekTo = (value / 100) * audioPlayer.current.duration;
        audioPlayer.current.currentTime = seekTo;
        setCurrentTime(seekTo);
    };

    return (
        <div className="music-player">
            <h2 id="songTitle">{songTitle}</h2>
            <audio
                ref={audioPlayer}
                src="music.mp3"
                onTimeUpdate={handleTimeUpdate}
            ></audio>
            <div className="player-controls" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
                    onClick={togglePlayPause}
                    style={{ marginRight: '10px', marginLeft: '10px' }}
                />
                <Slider
                    min={0}
                    max={100}
                    value={(currentTime / duration) * 100 || 0}
                    step={1}
                    onChange={handleSeek}
                    style={{ flexGrow: 1 ,maxWidth:'80%'}}
                />
                <div className="time-display">
                    <span>{formatTime(currentTime)}</span><span>/</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );
};

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes}:${seconds}`;
}

export default MusicPlayer;
