const expess = require('express');
const mongoose = require('mongoose');
const Users = require("../models/user");
const attendance = require("../models/attendance");
const url = require("url");

exports.getAllAttendance = (req,res)=>{
    const adminId = req.userId;

    const qwe = url.parse(req.url,true).query;
    const df = qwe.dateform;
    const dt = qwe.dateTo;

    const arr1=[];
    const arr2=[];

    arr1=df.split('-');
    arr2 = dt.split('-');



    const dateFrom = new Date();
    dateFrom.setFullYear(arr1[0],arr1[1]-1,arr1[2]);
    dateFrom.setUTCHours(0);
    dateFrom.setUTCMinutes(0);
    dateFrom.setUTCSeconds(0);
    dateFrom.setUTCMilliseconds(0);
    console.log('date from',dateFrom);

    const dateTo = new Date();
    dateTo.setFullYear(arr2[0],arr2[1]-1,arr2[2]);
    dateTo.setUTCHours(0);
    dateTo.setUTCMinutes(0);
    dateTo.setUTCSeconds(0);
    dateTo.setUTCMilliseconds(0);
    console.log('date To:',dateTo);

    Users.findById(adminId).then(success=>{
        if(success==null || success.length<1){
            return res.status(404).json({
                success:"false",
                message:"Admin not found"
            })
        } else{
            if(success.role=="admin"){
                attendance.find({date:{$gte:dateFrom, $lte:dateTo}}).then(result=>{
                    if(result==null || result.length<1){
                        return res.status(404).json({
                            success:"false",
                            message:"No attendance found"
                        })
                    } else{
                        return res.status(200).json({
                            success:"true",
                            AttendanceRecord:result
                        })
                    }
                }).catch((err)=>{
                    console.log(err);
                    return res.status(500).json({
                        success:"false",
                        message:"Some error occurred"
                    })
                })
            } else{
                return res.status(401).json({
                    success:"false",
                    message:"unauthorized access"
                })
            }
        }
    })
    .catch(err=>{
        return res.status(500).json({
            success:"false",
            message:"some error occurred"
        })
    })
}

exports.getAttendanceById = (req,res)=>{
    const adminId = req.userId;
    const id = req.params.userId;

    const qwe = url.parse(req.url,true).query;
    const df = qwe.dateFrom;
    const dt = qwe.dateTo;

    const arr1=[];
    const arr2=[];

    arr1 = df.split('-');
    arr2 = dt.split('-');

    const dateFrom = new Date();
    dateFrom.setFullYear(arr1[0],arr1[1]-1,arr1[2]);
    dateFrom.setUTCHours(0);
    dateFrom.setUTCMinutes(0);
    dateFrom.setUTCSeconds(0);
    dateFrom.setUTCMilliseconds(0);

    const dateTo = new Date();
    dateTo.setFullYear(arr2[0],arr2[1]-1,arr2[2]);
    dateTo.setUTCHours(0);
    dateTo.setUTCMinutes(0);
    dateTo.setUTCSeconds(0);
    dateTo.setUTCMilliseconds(0);

    Users.findIdById(adminId).then(success =>{
        if(success==null || success.length<1){
            return res.status(404).json({
                success:"false",
                message:"Admin not found"
            })
        }else{
            if(success.role=="admin"){
                Users.find({employee:id}).then(myUser=>{
                    if(myUser==null || myUser.length<1){
                        return res.status(404).json({
                            success:"false",
                            message:"User not found"
                        })
                    }else{
                        attendance.find({_user:id,date:{$gte:dateFrom , $lte:dateTo}}).then(result =>{
                            if(result==null || result.length<1){
                                return res.status(404).json({
                                    success:"false",
                                    message:"Attendance record of User not found"
                                })
                            }else{
                                return res.status(200).json({
                                    success:"true",
                                    AttendanceRecord:result
                                })
                            }
                        }).catch(err =>{
                            console.log(err);
                            return res.status(500).json({
                                success:"false",
                                message:"some error occurred"
                            })
                        })
                    } 

                }).catch(err =>{
                    return res.status(500).json({
                        success:"false",
                        message:"error occurred"
                    })
                })
            }else{
                return res.status(401).json({
                    success:"false",
                    message:"Unauthorized Access"
                })
            }
        }
    }).catch(err =>{
        return res.status(500).json({
            success:"false",
            message:"some error occurred"
        })
    })
}


exports.markAttendance = (req,res)=>{
    const id= req.userId;
    const employeeId = req.params.employeeId;


    const d = new Date();
    const a = d.getFullYear();
    const b =d.getMonth();
    const c = d.getDate();

    d.set;
    d.setFullYear(a,b,c);
    d.setUTCHours(0);
    d.setUTCMinutes(0);
    d.setUTCSeconds(0);
    d.setUTCMilliseconds(0);

    const qw = d.getTime();
    const dl = new Date(qw);

    let today1 = String(new Date(new Date().toDateString()));


    const x1 = new Date();
    const x2 = x1.getTime();
    const x3 = new Date(x2);

    Users.findById(id)
        .exec().then(result =>{
            if(result==null || result.length<1){
                return res.status(404).json({
                    success:"false",
                    message:"Usernot exists"
                })
            }
            attendance.findOne({_user:employeeId,date:{$gte:qw}}).exec()
            .then(success =>{
                if(success==null || success.length<1){
                    const attend = new attendance();

                    attend.id = new mongoose.Types.ObjectId(),
                    attend.present = true;
                    attend.date = x2;
                    attend._user = employeeId;
                    attend.name = result.name;

                    attend.save()
                    .then(result =>{
                        const string = JSON.stringify(attend._user);
                        const objectvalue = JSON.parse(string);
                        return res.status(200).json({
                            success:"true",
                            message:"Attendance marked successfully"
                        })
                    }).catch(err =>{
                        console.log(err);

                        return res.status(500).json({
                            success:"false",
                            message:"error occorred"
                        })
                    })

                }else{
                    return res.status(403).json({
                        success:"false",
                        message:"Attendance already marked"
                    })
                }
            })
              
        })
        .catch(err =>{
            console.log(err);
            return res.status(500).json({
                success:"false",
                message:"some error occurred"
            })
        });
}