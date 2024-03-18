# kristinaarezina_a3

Make sure you have node installed

Make sure you have postgres and create a .env file with your DATABASE_URL

Run npm install

Run node application.js           


1. The database setup with the provided schema and data.

CREATE TABLE students (
  student_id SERIAL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  enrollment_date DATE,
  PRIMARY KEY (student_id)
);

INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');

2. 
The execution of each function in your application. For INSERT, UPDATE, and DELETE operations, demonstrate their effects in your database using pgAdmin. 


Video: https://www.loom.com/share/4ac23d67ec5941709f697b457b63f80e?sid=384220bf-6482-4631-be59-b665ba005b58 
Backup location: https://drive.google.com/file/d/14WV84JBMNa3gAyedVvoit8fmLo1bDFjz/view?usp=sharing 