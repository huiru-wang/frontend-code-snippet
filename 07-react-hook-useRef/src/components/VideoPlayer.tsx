import React from "react"


export const VideoPlayer: React.FC = () => {





    return (
        <div className="video-player">
            <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLgJhD-LSimmBXbVVvXEc_oXxBpZfZKT9e"
                title="YouTube video player"
                allow="accelerometer;autoplay; clipboard-write; encrypted-media; gyro"
            />
        </div>
    )
}