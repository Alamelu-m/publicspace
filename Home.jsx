import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    useEffect(() => {
        axios.get('/api/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const handlePostSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/posts', { content: newPost }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                setPosts([response.data, ...posts]);
                setNewPost('');
            })
            .catch(error => console.error('Error creating post:', error));
    };

    return (
        <div>
            <h1>Home</h1>
            {user && (
                <form onSubmit={handlePostSubmit}>
                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="What's on your mind?"
                        required
                    />
                    <button type="submit">Post</button>
                </form>
            )}
            <div>
                {posts.map(post => (
                    <div key={post._id}>
                        <h3>{post.author.username}</h3>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
