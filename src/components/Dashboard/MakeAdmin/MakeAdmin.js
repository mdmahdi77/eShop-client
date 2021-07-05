import React from 'react';
import { useForm } from "react-hook-form";

const MakeAdmin = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data, e) => {
        const addEmail = {
            email : data.email
        }

        const url = `https://dry-woodland-65414.herokuapp.com/addAdmin`

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(addEmail)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                alert("Admin email added successfully!")
            }
        })
        e.target.reset()
    };

    return (
        <div className="container my-5">
            <div className="row">
                <h1 className="text-center mb-5">Add Admin</h1>
                <div className="col-4 offset-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input className="form-control mb-4" name="email" {...register("email")} placeholder="Add Email" />
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

export default MakeAdmin;