import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import AppNavbar from '../../components/AppNavbar/AppNavbar';
import { getBlogPost } from '../../services/blogApiService';
import AddComment from './AddComment/AddComment';
import AddPost from './AddPost/AddPost';
import DeletePost from './DeletePost/DeletePost';
import UpdatePost from './UpdatePost/UpdatePost';
import Comment from '../../components/Comment/Comment';
import { userDetails } from '../../services/userApiServices';

const Blog = () => {
    const token = localStorage.getItem('token');

    const [result, setResult] = useState([]);
    const [loggedUser, setLoggedUser] = useState();

    useEffect(() => {
        retrieveUserDetails();
        retrieveBlogPost();
    }, [])

    const retrieveBlogPost = async () => {
        const response = await getBlogPost();
        if (response) {
            setResult(response.posts)
        } else {
            setResult([])
        }

    }

    const retrieveUserDetails = async () => {
        const response = await userDetails();
        if (response) {
            setLoggedUser(response?.user)
        }
        return true;
    }

    return (
        <>
            <Container className='my-5'>
                <AppNavbar fetchData={retrieveBlogPost} />
                <h1 className='text-center my-3'>Blog Post</h1>
                {token &&
                    <AddPost fetchData={retrieveBlogPost} />
                }
                <Row>
                    {result.length === 0 &&
                        <div className="text-center">
                            <p>No Post Found</p>
                        </div>
                    }
                    {result.map(post => {
                        return (
                            <Col sm={12} md={4} className='mb-3' key={post._id}>
                                <Card className='h-100'>
                                    <CardBody className=''>
                                        {token && loggedUser?.isAdmin &&
                                            <div className="d-flex justify-content-end mb-3">
                                                <UpdatePost fetchData={retrieveBlogPost} data={post} />
                                                <DeletePost fetchData={retrieveBlogPost} postId={post._id} />
                                            </div>
                                        }
                                        <h1>Title: {post.title}</h1>
                                        <p>Author: {post.author}</p>
                                        <p>Content: {post.content}</p>
                                        <p>Date: {post.createdDate}</p>
                                        <Comment isComment={post.comments} postId={post._id} fetchData={retrieveBlogPost} isAdmin={loggedUser?.isAdmin} />
                                        {token &&
                                            <AddComment fetchData={retrieveBlogPost} postId={post._id} />
                                        }
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </>
    )
}

export default Blog
