This is a project for learning nestjs.


type "npm run start:dev", to test it.
type "npm run db:setup" to create the postgres ddatabase on docker then "npm run db:start".
You may have to create a "task-management" database using pgAdmin.


## TODO ##
* ✅ Run a jwt-refresh-token cleanup every hour - delete all tokens, which autoLogout date is expired. Also delete the onse which are lasts longer than in authConfig - for security reasons. 
* Token (refreshing), Logout endpoints
* Create Authorization, permissions, Learn the Guards, Lock taks deletion for PERM_DELETE_TASKS only
* Host server on Heroku 