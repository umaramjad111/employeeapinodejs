const express = require("express");
const employee = require("./../models/employee");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

//images storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
//here we create our route

router.post("/employee", upload.single("image"), async (req, res) => {
  req.body.image = req.file.filename;
  // Define a JSONobject for the image attributes for saving to database
  const data = new employee(req.body);
  const result = await data.save();

  if (!result) {
    res.json({
      status: "FAILED",
      message: "employee not registered sucessfully",
    });
  } else {
    res.json({
      status: "SUCCESS",
      message: "employee registered successfully",
      data: result,
    });
  }
});

//get records
router.get("/employee", async (req, res) => {
  try {
    const result = await employee.find();
    if (!result) {
      res.json({
        status: "FAILED",
        message: "NO FOUND DATA",
      });
    } else {
      res.json({
        status: "SUCCESS",
        message: "RECORDS FOUND",
        data: result,
      });
    }
  } catch (e) {
    console.log(e);
  }
});
//get single record
router.get("/employee/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await employee.findById(_id);
    if (!result) {
      res.json({
        status: "FAILED",
        message: "Record not found by id",
      });
    } else {
      res.json({
        status: "SUCCESS",
        message: "Record Found by id",
        data: result,
      });
    }
  } catch (e) {
    res.send(e);
  }
});
//update record
router.put("/employee/:id", async (req, res) => {
  try {
    // const _id = req.params.id
    const result = await employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) {
      res.json({
        status: "FAILED",
        message: "Record is not updated Successfully",
      });
    } else {
      res.json({
        status: "SUCCESS",
        message: "Record is updated successfully",
        data: result,
      });
    }
  } catch (e) {
    res.send(e);
  }
});
//delete record

router.delete("/employee/:id", async (req, res) => {
  try {
    // const _id = req.params.id
    const result = await employee.findByIdAndDelete(req.params.id);
    if (!result) {
      res.json({
        status: "FAILED",
        message: "Record is not Deleted Successfully",
      });
    } else {
      res.json({
        status: "SUCCESS",
        message: "Record is Deleted successfully",
        data: result,
      });
    }
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
