import React, { useContext } from 'react';
import { Post } from '../lib/types';
import { ThemeContext } from '../contexts/ThemeContext';
import '../App.css';

interface PostCardProps {
    postList: Post[];
}
export const PostCard: React.FC<PostCardProps> = ({ postList }) => {

    // 2. 使用context
    const { theme } = useContext(ThemeContext);

    console.log(theme);

    return (
        <div className={`${theme === 'light' ? 'card-container-light' : 'card-container-dark'}`}>
            {postList.map(post => {
                return (
                    // 拼接theme
                    <div className={`card-${theme}`}>
                        <h5>{post.title}</h5>
                        <p>{post.content}</p>
                    </div>
                );
            })
            }
        </div>
    );
};