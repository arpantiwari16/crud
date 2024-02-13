let express=require("express");
let server=express();
let mysql = require("mysql")
server.set("view engine", "ejs")
//body parser
let bodyParser = require("body-parser")
server.use(express.json())
server.use(bodyParser.urlencoded({ extended: true }))

let connection=require('./database');
let emp_data;

// STORING DATA TO EMP_DATA VARIABLE
connection.query("select eno,ename,city,salary from emp",(error,result)=>{
    emp_data=result
})

//ROUTES IN NODE JS

//HOME PAGE
server.get("/",(req,res)=>{
    res.render("home")

})

// WHEN LOCALHOST:2000/ALL_EMP WILL GET TABLE OF EMPLOYEES
server.get("/all_emp",(req,res)=>{
    res.render("all_emp",{data:emp_data})
})
// OPEN INSERT PAGE
server.get("/insert_emp",(req,res)=>{
    res.render("insert_emp")
})

// OPEN UPDATE PAGE
server.get("/update_emp",(req,res)=>{
    res.render("update_emp")
})
// OPEN DELETE PAGE

server.get("/delete_emp",(req,res)=>{
    res.render("delete_emp")
})

// GETTING POST REQUEST FROM FORM AND INSERT FORM DB

server.post("/insert", (req, response) => {
    connection.query("insert into emp (eno,ename,city,salary) values(?,?,?,?)", [ req.body.eno, req.body.ename, req.body.city,req.body.salary], (error, results) => {
        if (error)
            throw error;

        console.log("inserted..", results.affectedRows);
        response.redirect("/all_emp")
    })
})

// GETTING POST REQUEST FROM FORM AND UPDATE FORM DB

server.post("/update", (req, response) => {
    connection.query("update emp set ename=?,city=?,salary=? where eno=(?)", [ req.body.ename, req.body.city, req.body.salary,req.body.eno], (error, results) => {
        if (error)
            throw error;

        console.log("updated..", results.affectedRows);
        response.redirect("/all_emp")
    })
})


// GETTING POST REQUEST FROM FORM AND DELETE FORM DB
server.post("/delete", (req, response) => {
    connection.query("delete from emp where eno=? ", [ req.body.eno], (error, results) => {
        if (error)
            throw error;

        console.log("deleted..", results.affectedRows);
        response.redirect("/all_emp")
    })
})


// TO START SERVER AT PORT 2000
server.listen(2000,()=>{console.log("server started! on localhost:2000");})