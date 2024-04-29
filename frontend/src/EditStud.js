import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


function EditStud() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const [studdata, setData] = useState();

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3050/api/student");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const {studName} = useParams();
    const filteredStud = studdata?.data.find(st => st.studName === studName);

    

    const editData = async (data) => {
        try {
            const response = await axios.put(`http://localhost:3050/api/student/${filteredStud._id}`, data);
            window.alert('Edited Successfully');
            navigate('/studentList')
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="bg-image ">
            <div className="row justify-content-center">
                <div className="col-sm-6 mt-5 text-light border p-4">
                    <form onSubmit={handleSubmit(editData)}>
                        <div className="">
                            <div className="mb-3">
                                <label  className="form-label">Name</label>
                                <input type="text" Value={filteredStud?.studName}  className="form-control" {...register('studName', {required : true})} id="studName" placeholder="Enter Name" />
                                {errors.studName?.type && <p className="text-danger mt-1">Name is required</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" Value={filteredStud?.email} className="form-control" {...register('email', {required : true})} id="email" placeholder="Enter Mail" />
                                {errors.email?.type && <p className="text-danger mt-1">Email is required</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                <input type="text" Value={filteredStud?.mobile} className="form-control" id="mobile" {...register('mobile', {required : true})} placeholder="Enter Mobile No." />
                                {errors.mobile?.type && <p className="text-danger mt-1">Mobile number is required</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="company" className="form-label">Company</label>
                                <input type="text" Value={filteredStud?.company} className="form-control" id="company" {...register('company', {required : true})} placeholder="Enter Company Name" />
                                {errors.company?.type && <p className="text-danger mt-1">Company name is required</p>}
                            </div>
                            <button className="btn btn-warning" type="submit">Save</button> <button className="btn btn-primary" onClick={() => navigate('/studentList')} >Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default EditStud;