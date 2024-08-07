import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { addBlogPost } from '../../../services/blogApiService';

const AddPost = ({ fetchData }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const [isActive, setIsActive] = useState(true);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setTitle('');
        setAuthor('');
        setContent('');
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const handleAddPost = async (e) => {
        console.log(title, author, content);

        e.preventDefault();

        const payload = {
            title: title,
            content: content,
            author: author
        }

        try {
            const response = await addBlogPost(payload);
            if (response) {
                fetchData();
                Swal.fire({
                    title: "Post",
                    icon: "success",
                    text: "Added post successfully"
                });
                setTitle('');
                setAuthor('');
                setContent('');
                setShow(false);
            }
        } catch (err) {
            console.log(err);

        }
    };

    useEffect(() => {
        if (!title && !author && !content) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }, [title, author, content])

    return (
        <div>
            <div className="text-end my-3">
                <Button variant="primary" onClick={handleShow}>
                    Add Post
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Post</Modal.Title>
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
                                Add
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AddPost
