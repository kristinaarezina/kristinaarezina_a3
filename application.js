// connection to postgres
const { Pool } = require('pg');
// get connection database url from .env
require('dotenv').config();

// connect to pg
const connectionToPg = new Pool({
  connectionString: process.env.DATABASE_URL
});

// create input and output for termina;
const inputAndOutput = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// function that is running that allows user to interact with database
const askingForInput = () => {
  console.log(`Enter a number to run the following: \n 1. Get all students \n 2. Add student \n 3. Update student \n 4. Delete a student \n 5. Bye!! `);
  inputAndOutput.question('Number: ', async (answer) => {
    if (answer.length > 0) {
        if (answer === "1") {
            await getAllStudents();
            askingForInput();
        } else if (answer === "2") {
            await addStudent("Kristina", "Arezina", "arezina.kristina23@gmail.com", "2024-03-17");
            askingForInput();
        } else if (answer === "3") {
            await updateStudentEmail(1, "newemail@gmail.com");
            askingForInput();
        } else if (answer === "4") {
            await deleteStudent(1);
            askingForInput();
        } else if (answer === "5") {
            console.log("Okay bye!");
            inputAndOutput.close();
            connectionToPg.end();
        } else {
            console.log("Invalid input, try again.");
            askingForInput();
        }
    } else {
        console.log("Okay bye!");
        inputAndOutput.close();
        connectionToPg.end();
    }
  });
};

// gets all students
const getAllStudents = () => {
    return new Promise((resolve, reject) => {
        connectionToPg.query('SELECT * FROM students', (err, res) => {
            if (err) {
                console.error('Error executing query', err.stack);
                reject(err);
            } else {
                console.log(res.rows);
                resolve();
            }
        });
    });
};

// adds student 
const addStudent = (first_name, last_name, email, enrollment_date) => {
    return new Promise((resolve, reject) => {
        const queryText = 'INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4) RETURNING *;';
        const values = [first_name, last_name, email, enrollment_date];
        connectionToPg.query(queryText, values, (err, res) => {
            if (err) {
                console.error('Error executing query', err.stack);
                reject(err);
            } else {
                console.log(res.rows);
                resolve();
            }
        });
    });
};

// updates student email
const updateStudentEmail = (student_id, new_email) => {
    return new Promise((resolve, reject) => {
        const queryText = 'UPDATE students SET email = $2 WHERE student_id = $1 RETURNING *;';
        const values = [student_id, new_email];
        connectionToPg.query(queryText, values, (err, res) => {
            if (err) {
                console.error('Error executing query', err.stack);
                reject(err);
            } else {
                console.log(res.rows);
                resolve();
            }
        });
    });
};

// deletes student
const deleteStudent = (student_id) => {
    return new Promise((resolve, reject) => {
        const queryText = 'DELETE FROM students WHERE student_id = $1 RETURNING *;';
        const values = [student_id];
        connectionToPg.query(queryText, values, (err, res) => {
            if (err) {
                console.error('Error executing query', err.stack);
                reject(err);
            } else {
                console.log(res.rows);
                resolve();
            }
        });
    });
};

// start
askingForInput(); 
