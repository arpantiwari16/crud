
const mysql = require('mysql');

let connection=mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'classwork'
})

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

// get all emp data
function get_allemp(res){
	connection.query("select eno,ename,city,salary from emp", (error, result) => {
        res.render("all_emp", { data: result });
    })
}

function insert_emp(req,res){
	const { eno, ename, city, salary } = req.body; // Assuming you're using a POST request with a JSON body

    const query = 'INSERT INTO emp (eno, ename, city, salary) VALUES (?, ?, ?, ?)';
    connection.query(query, [eno, ename, city, salary], (error, result) => {
        if (error) {
            console.error("Error inserting employee data:", error);
            res.status(500).send("Internal Server Error");
        } else {
            // res.status(200).send("Employee data inserted successfully!");
			res.redirect("all_emp")
        }
    });
}

function update_emp(req,res){
	const { eno, ename, city, salary } = req.body; // Assuming you're using a POST request with a JSON body

    const query = 'UPDATE emp SET ename=?, city=?, salary=? WHERE eno=?';
    connection.query(query, [ename, city, salary, eno], (error, result) => {
        if (error) {
            console.error("Error updating employee data:", error);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).send("Employee data updated successfully!");
        }
    });
}

function delete_emp(req,res){
	const {eno} = req.body; // Assuming you're passing the employee number as a URL parameter

    const query = 'DELETE FROM emp WHERE eno=?';
    connection.query(query, [eno], (error, result) => {
        if (error) {
            console.error("Error deleting employee data:", error);
            res.status(500).send("Internal Server Error");
        } else {
            // res.status(200).send("Employee data deleted successfully!");
			res.redirect("all_emp")
        }
    });
}
module.exports = {get_allemp,insert_emp,update_emp,delete_emp};