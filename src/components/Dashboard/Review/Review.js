import React from 'react';
import { useForm } from "react-hook-form";

const Review = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data, e) => {
        const reviewData = {
            name: data.name,
            title: data.title,
            desc: data.desc
        }

        const url = `https://dry-woodland-65414.herokuapp.com/addReview`

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(reviewData)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                alert("Your review successfully added!")
            }
        })
        e.target.reset()
    };

    return (
        <div className="container my-5">
            <h3 className="text-center mb-5 text-danger">Review your Opinion</h3>
            <div className="row">
                <div className="col-6 offset-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input className="form-control mb-4" name="name" {...register("name")} placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <input className="form-control mb-4" name="title" {...register("title")} placeholder="Title" />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control mb-4" name="desc" {...register("desc")} placeholder="Description" cols="50" rows="4" />
                        </div>
                        <div className="form-group">
                            <input className="form-control btn btn-danger fw-bold" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Review;