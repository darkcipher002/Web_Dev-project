Strathmore Campus Event & Club Registration SystemStrathmore University 

— Web Application Development project.  
Problem addressedStudents finding it annoying that when they want to join a club they are meant to go to an admin or club head to be allocated to a club, and similarly finding it hard to find and register for campus events. This system automates that process so students can easily discover events, join clubs, and complete registration online without administrative delays.

System users
Strathmore University Students — can explore active campus events, view guest pass allowances, preview their event passes in real time, and submit registration details online using their student credentials

Features
--> Home page (index.html) introducing the platform and listing featured campus events across different faculties (e.g., Strathmore Tech Club Summit, SU Cultural Night, Inter-Faculty Sports Gala) along with guest pass constraints and registration guidelines.
--> Event Registration form (form.html) allowing students to register using seven fields across distinct control types (text, ID format text, email, select dropdown, radio choice, number, textarea).
--> Accessible form controls with custom error messaging containers and a live status region (aria-live="polite") for submission feedback.
--> JavaScript DOM behaviours: live character count on the special requirements field, and a dynamic live ticket preview card that updates as details are entered.
--> Client-side and server-side validation: required fields, Strathmore email requirement (@strathmore.edu), and guest pass limits.
--> Server-side processing (process.php) that validates POST data and inserts new rows into the registrations MySQL table using prepared statements.  

Project structure
index.html          Home page / featured events overview
form.html           Event & club registration form with live ticket preview
process.php         PHP POST handling, sanitization, and database insert
config.php          Database connection settings
config.example.php  Template for database configuration credentials
database.sql        Table-creation schema for the registrations table
css/style.css       External stylesheet for layout and forms
js/script.js        DOM manipulation, live preview, and form validation
.gitignore          Prevents local config.php from being committed

Testing summary
--> Submitted the form with empty fields — submission was blocked by both client and server validation.
--> Submitted an email without @strathmore.edu — blocked with an invalid email error.
--> Verified the live preview card updates synchronously as student details are entered.
--> Verified character counter on special requirements counts down correctly from 150 characters.
--> Submitted valid registrations and confirmed new rows were added to the registrations table in phpMyAdmin