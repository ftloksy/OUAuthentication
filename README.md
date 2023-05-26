# Credential Management Web Application

This is an internal web application designed for credential management, 
allowing users to store and manage login details (username and password) 
for various resources such as WP sites, servers, financial accounts, and more. 
The application prioritizes strong authentication and access control 
to ensure the security of sensitive credentials.

## Features

 - __User Registration and Login:__ Users can create 
    an account and securely log in to the application.
  
 - __User Roles:__ Different user roles are available, 
    including Normal Users, Management Users, and Admin Users, 
    each with specific permissions and privileges.

 - __Resource Access Control:__ Access to resources is managed based
    on user roles and permissions.
    Users can only access the credentials 
    they are authorized to view and manipulate.
  
 - __Organizational Units and Divisions:__ The application supports
    a hierarchical structure with Organizational Units (OU) and Divisions.
    Each OU has multiple Divisions responsible for specific tasks.
  
 - __Credential Repository:__ Each Division has its own credential repository,
   where employees can add, view, update, and delete credentials. 
   All employees within a Division have access 
   to their Division's credential repository.
  
 - __User Management:__ Admin Users have the ability to
   assign and unassign users to/from Divisions and Organizational Units.
   They can also change the user role of any user within the system.
 
 - __Secure Authentication:__ User passwords are securely stored using hashing
   and salting techniques to protect against unauthorized access.
 
 - __Responsive User Interface:__ The web application features a 
   modern and responsive user interface, 
   providing an intuitive experience across different devices and screen sizes.

## Technology Stack

The web application is built using the following technologies:

 -  __Front-end:__ React.js for the user interface development.

 - __Back-end:__ Node.js with Express.js for server-side development.

 - __Database:__ MongoDB for storing user information, 
   credentials, and organizational structure.

 - __Authentication:__ Implement secure authentication 
    using JWT (JSON Web Tokens) and password hashing with bcrypt.
    

## Installation and Setup

To set up the project locally, follow these steps:

  -  __Clone the repository:__ git clone https://github.com/ftloksy/OUAuthentication.git
  
  -  __Install dependencies:__ npm install
    Configure the environment variables for the database connection, authentication, and other relevant settings.
    
  - __Start the server:__ npm start
    Access the application at http://localhost:3000 (or the specified port).

## Initialize the database

"To initialize the database for this project, follow the steps below:

  -  Run the command in the project's root directory.
  
           npm run initdb 

    This script will populate the database with initial data, 
    including employees and their respective user roles, 
    organisational units (OU) and divisions . 

### Admin and Employees

    Two user will have the role of 'admin':  "emily" and "john", 
    Four user will have the role of 'Management': "michael", "emma", "daniel", "olivia"
    
    while all other employees will have the role of 'normal' (user role). 
    Please note that the password for all employees, including the admin and management, 
    is set to '123456'.


    During development, 
    you can use the following login credentials to access the frontend: 
    login: 'emily' and password: '123456'.

    It's important to note that when resetting passwords, 
    employees (including the admin) cannot use the 
    password '**********' (ten asterisks) as their new password.

### Please note the following restrictions:

    __User Role Permissions:__ The management users have the ability to 
    update user profiles within their respective divisions. 
    However, they cannot update user profiles in other divisions 
    or modify the profiles of admin users in all divisions.

    __Restricted Access to Admin Profiles:__ At all times, 
    management users are prohibited from updating the profiles of admin users.

Please ensure you have MongoDB installed and running before executing 
the npm run initdb command. This will create the necessary collections 
and populate them with the initial data, 
allowing you to start the project with a preconfigured database."

## Security Considerations

 - __Protect sensitive information:__ Apply encryption and secure storage mechanisms 
    to protect user passwords and confidential data stored in the database.
    
## Contribution

Contributions to the project are welcome. 
If you find any bugs, have feature requests, 
or would like to contribute to the codebase, 
please submit an issue or create a pull request.

When contributing, please adhere to the following guidelines:

    Fork the repository and create a new branch for your feature or bug fix.
    Ensure your code follows the project's coding style and best practices.
    Provide detailed documentation and comments as necessary.
    Write appropriate tests for new features or bug fixes.

## License

This project is licensed under the MIT License.
Contact

For any inquiries or questions, please contact [Frankie Chow] at [freakchow@gmail.com].
