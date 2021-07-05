import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight,faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import './Blogs.css'

const BlogsDetails = (props) => {
    const {icon, image, title, description} = props.item

    const [descriptionCollapse, setDescriptionCollapse] = useState(false)

    const showLess = () => {
        setDescriptionCollapse(false)
        console.log('show less')
    }
    const showMore = () => {
        setDescriptionCollapse(true)
        console.log('show more')
    }

    return (
        <div className="col-md-4 my-5">
            <div className="card">
                <img src={image} alt="" className="card-img-top img-fluid" />
                <div className="card-body">
                    <div className="d-flex">
                        <img src={icon} height="40px" alt="" className="mr-2" />
                        <div>
                            <h5 className="mx-3">{title}</h5>
                            <p className="mx-3">
                                {
                                    descriptionCollapse ? description : description.substr(0, 100)
                                }
                            </p>
                                {
                                    descriptionCollapse ?
                                    <span onClick={showLess} className="card-link collapse-btn mx-3">See Less <FontAwesomeIcon className="icon" icon={faArrowAltCircleLeft} /></span>
                                    :
                                    <span onClick={showMore} className="card-link collapse-btn mx-3">See more <FontAwesomeIcon className="icon" icon={faArrowAltCircleRight} /></span>
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogsDetails;