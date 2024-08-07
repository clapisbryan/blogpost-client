import React, { useEffect, useState } from 'react';
import { getBlogPost, getComments } from '../../../services/blogApiService';
import { useParams } from 'react-router-dom';
import AppNavbar from '../../../components/AppNavbar/AppNavbar';
import { Col, Container, Row } from 'react-bootstrap';
import Comment from '../../../components/Comment/Comment';

const GetComments = () => {
    const id = useParams();

    const [result, setResult] = useState([]);
    const [isComment, setIsComment] = useState([]);  

    useEffect(() => {
        retrieveBlogPost();
    }, [])

    const retrieveBlogPost = async () => {
        const response = await getBlogPost();
        console.log(response);
        if (response) {
            const filteredPost = response.posts.filter(post => post._id === id.postId);
            setResult(filteredPost)

        } else {
            setResult([])
        }

    }

    useEffect(() => {
        retriveComment();
    }, [id]);

    const retriveComment = async () => {
        const response = await getComments(id.postId);

        if (response.comments) {
            setIsComment(response.comments);
        } else {
            setIsComment([]);
        }
    };

    return (
        <div>

            <AppNavbar />

            <Container>
                <Row className='my-5'>
                    {result.map(post => {
                        return (
                            <div className='p-4 border mb-3 mb-md-5' key={post._id}>
                                <h1>Title: {post.title}</h1>
                                <p>Author: {post.author}</p>
                                <p>Content: {post.content}</p>
                                <p>Date: {post.createdDate}</p>
                            </div>
                        )
                    })}
                    <Col>
                        <Comment isComment={isComment} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default GetComments;