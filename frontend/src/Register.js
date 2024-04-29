import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

    const {register, handleSubmit, formState : {errors}} = useForm();

    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const studData = async (data) => {
        try {
            const response = await axios.post('http://localhost:3050/api/student', data);
            console.log('Form data submitted:', response.data);
            if (response.data.error) {
                setError(response.data.error);
            } else {
                window.alert(response.data.status);
                window.location.reload();
            }
          } catch (error) {
            console.log(error)
          }
    }

    return (
        <div className="bg-image">
            <div className="row justify-content-center">
                <h4 className="text-center mt-5 text-white">Registration Form</h4>
                <div  className="row col-sm-6 shadow p-4 border mt-4">
                <form onSubmit={handleSubmit(studData)}>
                    <div className="text-white">
                        <div className="mb-3">
                            <label htmlFor="studName" className="form-label">Name</label>
                            <input type="text" className="form-control" {...register('studName', {required : true})} id="studName" placeholder="Enter Name" />
                            {errors.studName?.type && <p className="text-danger mt-1">Name is required</p> }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" {...register('email', {required : true})} id="email" placeholder="Enter Email" />
                            {errors.email?.type && <p className="text-danger mt-1">Email is required</p> }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className="form-label">Mobile Number</label>
                            <input type="number" className="form-control" id="mobile" {...register('mobile', {required : true})} placeholder="Enter Mobile No." />
                            {errors.mobile?.type && <p className="text-danger mt-1">Mobile number is required</p> }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="company" className="form-label">Company</label>
                            <input type="text" className="form-control" id="company" {...register('company', {required : true}  )} placeholder="Enter Company Name" />
                            {errors.company?.type && <p className="text-danger mt-1">Company name is required</p> }
                        </div>
                        <button className="btn btn-success" type="submit">Register</button> <button className="btn btn-warning" onClick={() => navigate('/')} >Cancel</button> <p className="text-light mt-2">{error}</p>                        
                    </div>
                </form>
                </div>                
            </div>
        </div>
    )
}

export default Register;