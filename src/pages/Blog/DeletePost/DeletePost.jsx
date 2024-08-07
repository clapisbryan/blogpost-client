import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteBlogPost } from '../../../services/blogApiService';
import Swal from 'sweetalert2';


const DeletePost = ({ fetchData, postId }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeletePost = async () => {
        const response = await deleteBlogPost(postId);
        console.log(response);

        if (response) {
            Swal.fire({
                title: "Post",
                icon: "success",
                text: "Delete post successfully"
            });
            fetchData();
            setShow(false);
        } else {
            Swal.fire({
                title: "Post",
                icon: "error",
                text: "Only admin can delete a post"
            });
            fetchData();
            setShow(false);
        }


    }


    return (
        <>
            <Button variant="danger" size='sm' onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDeletePost}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeletePost
