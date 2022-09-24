const express = require("express");
const router = express.Router();


const attendance = require("../models/attendance");
const sign = require("../models/user");
const leave = require("../models/leave");


router.post('/attendance',attendance.markAttendance);
router.get('/attendance/all',attendance.getAllAttendance);
router.get('/attendance',attendance.getAttendancebyId);

router.get('/user/all',sign.getAllUser);
router.get('/user',sign.getDetails);
router.get('/user/:userId',sign.getUser);

router.get('/leave',leave.getRecord);
router.get('/leave/pending',leave.getMyRecord_pending);
router.get('/leave/approved',leave.getMyRecord_approved);
router.get('/leave/rejected',leave.getMyRecord_rejected);
router.post('/leave',leave.addRecord);


module.exports = router;