import React, { useState } from 'react'
import { addComment } from '../../../services/blogApiService';
import Swal from 'sweetalert2';

const AddComment = ({ fetchData, postId }) => {
    const [comment, setComment] = useState('');

    // Handle changes in the textarea
    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(comment);

        const payload = {
            id: postId,
            comment: comment
        }

        const response = await addComment(payload);
        if (response) {
            fetchData();
            setComment('');
        } else {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "You need to login to make a comment"
            });
        }


    };

    return (
        <> <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <textarea
                        id="comment"
                        cols="30"
                        rows="3"
                        className="form-control"
                        placeholder="Write your comment here..."
                        value={comment}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Send
                </button>
            </form>
        </div>
        </>
    )
}

export default AddComment
