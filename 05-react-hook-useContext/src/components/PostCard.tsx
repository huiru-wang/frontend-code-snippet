import React from 'react';
import { Post } from '../lib/types';
import { useTheme } from '../contexts/ThemeContext';

interface PostCardProps {
    postList: Post[];
}
export const PostCard: React.FC<PostCardProps> = ({ postList }) => {

    // 从context中获取当前主题
    const { theme } = useTheme();

    return (
        <div className={`${theme === 'light' ? 'card-container post-card-light' : 'card-container post-card-dark'}`}>
            {postList.map(post => {
                return (
                    <div className='post-card'>
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.content}</p>
                    </div>
                );
            })
            }
        </div>
    );
};