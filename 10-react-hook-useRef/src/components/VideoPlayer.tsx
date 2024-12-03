import React, { useEffect, useRef, useState } from "react"
import '../App.css'
import { formatTime } from "../lib/utils"

/**
 * 何时应该使用useRef：
 * 1. 存储DOM元素
 * 2. 存储在改变时不需要触发组件重新渲染的状态
 * 3. 存储计时器引用
 * 
 */


interface VideoPlayerProps {
    videoUrl: string
}
export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {

    // 1. 使用Ref操作dom
    const videoRef = useRef<HTMLVideoElement>(null)

    // 2. 使用Ref，记录播放周期，播放期间的发生的渲染，不需要每次都更新此count，playCount是一个跨渲染周期的值
    const playCountRef = useRef<number>(0)

    // 3. 使用useState记录当前时间、播放状态
    const [currentTime, setCurrentTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        // 监听时间更新和视频结束时的事件
        const video = videoRef.current;
        if (video) {
            video.addEventListener('timeupdate', handleTimeUpdate);
            video.addEventListener('ended', handleVideoEnded);

            // 在组件卸载时移除事件监听器
            return () => {
                video.removeEventListener('timeupdate', handleTimeUpdate);
                video.removeEventListener('ended', handleVideoEnded);
            };
        }
        // 当videoUrl应当重新
    }, [videoUrl, videoRef, playCountRef]);

    /**
     * 时间更新，更新当前时间
     */
    const handleTimeUpdate = () => {
        // 在这里处理时间更新逻辑
        const video = videoRef.current;
        if (video) {
            setCurrentTime(video.currentTime);
        }
    }

    /**
     * 视频结束时，重置时间，重新播放
     */
    const handleVideoEnded = () => {
        playCountRef.current += 1;
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setIsPlaying(true)
        }
    }

    /**
     * 播放/暂停
     */
    const handlePlayPause = () => {
        // 在这里处理播放暂停逻辑
        if (isPlaying) {
            videoRef.current?.pause()
        } else {
            videoRef.current?.play()
        }
        setIsPlaying(!isPlaying);
    }

    /**
     * 拖动进度条
     * @param e 输入框事件
     */
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value)
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime)
        }
    }


    return (
        <div className="video-player">

            {/* 视频播放器 */}
            <video
                ref={videoRef}
                src={videoUrl}
                onEnded={() => setIsPlaying(false)}
            />

            {/*  进度条 */}
            <div>
                <input
                    type="range"
                    min="0"
                    max={videoRef.current?.duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="video-progress"
                />
                <span>{formatTime(currentTime)}</span>
            </div>

            {/* 控制按钮、播放次数 */}
            <div className="video-control">
                <button onClick={handlePlayPause}>
                    {isPlaying ? '暂停' : '播放'}
                </button>

                <div>
                    <span>播放次数: {playCountRef.current}</span>
                </div>
            </div>
        </div>
    )
}