import React, { useState } from 'react';
import { Button } from '@mui/material';
function Comment() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };
    const handleDeleteComment = (index) => {
        const updatedComments = [...comments];
        updatedComments.splice(index, 1);
        setComments(updatedComments);
    };

    return (
        <div>
            <h2 style={{ color: 'blue' }}>Reviews</h2>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index} style={{ color: 'black', marginBottom: '10px' }}>
                        <span style={{ marginRight: '5px' }}>-</span>
                        {comment}
                        <Button
                            onClick={() => handleDeleteComment(index)}
                            style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '7px', padding: '1px 2px', }}
                        >
                            Delete
                        </Button>
                    </li>

                ))}
            </ul>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <textarea
                    rows="4"
                    cols="50"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ borderColor: 'black', borderRadius: '5px', padding: '5px', marginBottom: '10px' }}
                ></textarea>
                <Button
                    onClick={handleAddComment}
                    style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                    }}
                >
                    Add Review
                </Button>
            </div>
        </div>
    );
}

export default Comment;
