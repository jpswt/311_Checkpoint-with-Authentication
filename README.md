Assignment:
Build an express backend, connected to mysql that has the following 4 routes

1. /register : accept a username/email and password, and add a user entry in the
   database along with the password hash
2. /login: accepts a username/email and password, and returns a signed JWT if the
   password is correct
3. any route, that does anything you want, but it must respond correctly for any
   request even if it does not contain a valid token (easy, this is what we have been
   doing so far)
4. a route that requires a valid signed token to complete successfully (this is
   the new, you will need a middleware!)
