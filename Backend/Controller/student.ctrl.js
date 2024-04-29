const studentModel = require("../Models/student.model");
const studentSrv = require("../Services/student.srv");
const bcrypt = require('bcrypt');

const studentCtrl = {

    getAllStudent: async (req, res) => {

        try {

            const studentInfo = await studentSrv.getAll();
            if (studentInfo) {
                res.send({
                    data: studentInfo
                })
            }

        } catch (error) {
            console.log(error);
            res.send(error);
        }

    },

    addStudent: async (req, res) => {

        try {

            const studentInfo = await studentSrv.addByEmail(req.body.email);
            if (studentInfo) {
                res.send({
                    error: 'Student already exists with given email'
                });
            } else {
                const studentInfobyMobile = await studentSrv.addByMobile(req.body.mobile);
                if (studentInfobyMobile) {
                    res.send({
                        error: 'Student already exists with given Mobile Number'
                    });
                } else {
                    const newStudent = new studentModel(req.body);
                    newStudent.save().then(addedStudent => {
                        res.send({
                            status: 'Register Successfully',
                            data: addedStudent
                        })
                    })
                }
            }

        } catch (error) {
            console.log(error);
            res.send(error);
        }

    },

    updateStudent: async (req, res) => {

        try {
            const studentInfo = await studentSrv.update(req.params.id, req.body, { new: true });
            res.send({
                status: 'Updated Successfully',
                data: studentInfo
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    deleteStudent: async (req, res) => {

        try {

            const studentInfo = await studentSrv.deleteStud(req.params.id);
            if (studentInfo) {
                res.send({
                    status: 'Deleted Successfully'
                })
            }

        } catch (error) {
            console.log(error);
            res.send(error);
        }

    },

}

module.exports = studentCtrl;