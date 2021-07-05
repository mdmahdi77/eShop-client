import React, { useState } from 'react';
import { useEffect } from 'react';
import data from '../../data/features.json';
import BlogsDetails from '../Blogs/BlogsDetails'
import './Blogs.css'

const Blogs = () => {
    const [blogs, setBlogs] = useState(data)

    useEffect(() => {
        setBlogs(data)
        console.log(data)
    },[])
    return (
        <div className="my-5 blogs pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Why do you choose us?</h2>
                                <p className="mt-3 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sapiente eaque repellendus asperiores nisi! Architecto, praesentium eligendi consequatur inventore fuga eius totam officia adipisci. Nostrum quia soluta vel distinctio delectus!</p>
                            </div>
                        </div>
                    </div>
                        {
                            blogs.map(item => <BlogsDetails key={item.id} item={item} /> )
                        }
                </div>
            </div>
        </div>
    );
};

export default Blogs;