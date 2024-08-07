import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteComment } from '../../../services/blogApiService';
import Swal from 'sweetalert2';

const DeleteComment = ({ postId, commentId, fetchData }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteComment = async () => {
        console.log(postId, commentId);

        const response = await deleteComment(postId, commentId)

        if (response) {
            fetchData();
            Swal.fire({
                title: "Post",
                icon: "success",
                text: "Delete post successfully"
            });
            setShow(false);
        }
    }

    return (
        <div>
            <Button variant="danger" className='fs-6' size='sm' onClick={handleShow}>
                Delete this comment
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this comment</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDeleteComment}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DeleteComment
