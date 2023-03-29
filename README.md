Developer Name: Akinsola Joseph

This is a simple test bank application built using JWT for user authentication, It was built using-

Reactjs/html/css on front end;
Nodejs, Expressjs, Mongodb, with client mongoose

Refresh tokens are not enabled on this test app therefore authentication will be lost on page refresh

To preserve the statelessness of the REST APIs, they've been made all accessible and are not bound to JWT auth

The project is a single page application which contains
- A public landing page
- A registration page with form validator where members of the public can register (currently disabled)
- A login page with form validator where users can log in
- An home page for logged-in users, where they can view their current balance and contains links that enable
  them to perform credit and debit transactions
- A withdrawal page where they can perform debit transactions
- A deposit page where they can perform credit transactions
- An history page where they can view previous transactions
- A server connected to a database,which contains several REST APIs and where user authentication is done using JWT
- A database containing users data