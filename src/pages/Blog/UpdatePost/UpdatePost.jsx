import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { updateBlogPost } from '../../../services/blogApiService';


const UpdatePost = ({ fetchData, data }) => {
    const [title, setTitle] = useState(data.title);
    const [author, setAuthor] = useState(data.author);
    const [content, setContent] = useState(data.content);

    const [isActive, setIsActive] = useState(true);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const handleAddPost = async (e) => {

        console.log(title, author, content);

        e.preventDefault();

        const payload = {
            id: data._id,
            title: title,
            content: content,
            author: author 
        } 

        const response = await updateBlogPost(payload);
        if (response) {
            fetchData();
            Swal.fire({
                title: "Post",
                icon: "success",
                text: "Updated post successfully"
            });
            setShow(false);
        }

    };


    return (
        <div>
            <Button variant="primary" size='sm' className='mx-1' onClick={handleShow}>
                Update Post
            </Button>

            <Modal show={show} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <form onSubmit={handleAddPost}>
                        <div className="p-3">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" placeholder='Enter post title' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="author" className="form-label">Author</label>
                                <input type="text" className="form-control" id="author" placeholder='Enter post author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Content</label>
                                <input type="text" className="form-control" id="content" placeholder='Enter post content' value={content} onChange={(e) => setContent(e.target.value)} />
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                type='submit'
                                disabled={!isActive}
                            >
                                Update
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default UpdatePost
