import React, { useContext } from 'react';
import { Post } from '../lib/types';
import { ThemeContext } from '../contexts/ThemeContext';
import '../App.css';

interface PostCardProps {
    postList: Post[];
}
export const PostCard: React.FC<PostCardProps> = ({ postList }) => {

    // 4. 使用useContext，并传入要使用的主题context
    // 从themeContext中取出：由ThemeProvider传递下来的主题theme状态
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