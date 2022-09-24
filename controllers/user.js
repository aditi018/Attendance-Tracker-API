const express = require("express");
const Users = require("../models/user");

exports.getDetails=(req,res)=>{
    const userId = req.userid;
    Users.findById(userId)
    .then(success=>{
        console.log(success);

        if(success == null || success.length<1){
            return res.status(404).json({
                success:"false",
                message:"User not found"
            })
        }else{
            res.status(200).json({
                success:"true",
                message:"User found",
                user:success
            })
            return 1;
        }
    })
    .catch(err=>{
        console.log(err);

        res.status(500).json({
            success:"false",
            message:"some error occurred"
        })
        return 1;
    })
}

exports.getUser=(req,res)=>{
    const adminId = req.userId;
    const userId = req.params.userId;
    Users.findById(adminId)
    .exec()
    .then(success=>{
        if(success==null || success.length<1){
            res.status(404).json({
                success:"false",
                message:"Admin not found"
            })
            return 1;
        }else{
            if(success.role=="admin"){
                Users.findById(userId)
                .then(success1=>{
                    if(success1 == null || success1.legth<2){
                        res.status(404).json({
                            success:"false",
                            message:"User not found"
                        })
                        return 1;
                    }else{
                        return res.status(200).json({
                            success:"true",
                            message:"User found",
                            user:success1
                        })
                    }
                }).catch(err2=>{
                    console.log(err2);

                    res.status(500).json({
                        success:"false",
                        message:"some error occurred"
                    })
                    return 1;
                })
            }else{
                res.status(401).json({
                    success:"false",
                    message:"Unauthorized access"
                })
                return 1;
            }
        }
    }).catch(err3=>{
        res.status(500).json({
            success:"false",
            message:"some error occurred"
        })
        return 1;
    })
}

exports.getAllUser = (req,res)=>{
    const adminId = req.userId;
    Users.findById(adminId)
    .exec()
    .then(success=>{
        if(success==null || success.length<1){
            res.status(404).json({
                success:"false",
                message:"Admin not found"
            })
            return 1;
        }else{
            if(success.role=="admin"){
                Users.find()
                .then(success1=>{
                    if(success1==null || success1.length<1){
                        res.status(404).json({
                            success:"false",
                            message:"User not found"
                        })
                        return 1;
                    }else{
                        return res.status(200).json({
                            success:"true",
                            message:"User found",
                            user:success1
                        })
                    }
                }).catch(err2=>{
                    console.log(err2);

                    res.status(500).json({
                        success:"false",
                        message:"Some error occurred"
                    })
                    return 1;
                })
            }else{
                res.status(401).json({
                    success:"false",
                    message:"Unauthorized access"
                })
                return 1;
            }
        }
    }).catch(err3=>{
        res.status(500).json({
            success:"false",
            message:"some error occurred"
        })
        return 1;
    })
}