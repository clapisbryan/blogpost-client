import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import DeleteComment from './DeleteComment/DeleteComment';

const Comment = ({ isComment, postId, fetchData, isAdmin }) => {

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (window.location.pathname.includes('getComments')) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [])

    return (
        <div>
            {isActive &&
                <div className='border-bottom mb-3'>
                    <p className='mb-0'>All Comment</p>
                </div>
            }
            {isComment && isComment.map(comment => (
                <div key={comment._id}>
                    <p className='m-0'><strong>User ID:</strong> {comment.userId}</p>
                    <p className='m-0'><strong>Comment:</strong> {comment.comment}</p>
                    {isAdmin &&
                        <DeleteComment postId={postId} commentId={comment._id} fetchData={fetchData} />
                    }
                </div>
            ))}
            {!isActive && isComment?.length > 0 &&
                <Nav.Link as={NavLink} to={`/getComments/${postId}`} exact="true" className='mb-3 text-end'>See All</Nav.Link>
            }
        </div>
    )
}

export default Comment
