## Express REST routes:

* / => Just to ckeck if server is running
* /auth/signup  =>  Sign up new user(Common feature)
* /auth/login   =>  Login new user  (Common feature)
* /auth/logout  =>  Logout user     (Common feature)
* /auth/block   =>  Block user      (Website Admin feature)
* /auth/unblock =>  Unblock user    (Meet admin feature)
* /auth/register=>  Register user   (Meet admin feature)
* /rooms/newroom=>  Create new room (Meet admin feature)
* /rooms/:room  =>  Join any room   (Common feature)


## Socket application

* Create a new room
* Join an existing room
    + Get notified whenever someone joins room
    + Get notified whenever someone leaves room
    + Send a message
    + Get messages