This is a project for learning nestjs.


type "npm run start:dev", to test it.
type "npm run db:setup" to create the postgres ddatabase on docker then "npm run db:start".
You may have to create a "task-management" database using pgAdmin.


## TODO ##
* ✅ Run a jwt-refresh-token cleanup every hour - delete all tokens, which autoLogout date is expired. Also delete the onse which are lasts longer than in authConfig - for security reasons. 
* ✅ Token (refreshing), Logout endpoints
* ✅ Create Authorization, dumb permissions, Learn the Guards
* Host server on Heroku 
* Logout

--- Attila backend 
* Auto permanent development login as admin on: npm run start:dev:admin
* Auto permanent development login as admin on: npm run start:dev:user

* Password reset + email

* change TypeORM to MikroORM: https://docs.nestjs.com/recipes/mikroorm
* Permissions and roles with manytomany relations - MikroORM/Mongoose
  - Admins should create roles with custom set of permissions.
  - Admins and the app should add custom set of permissions to users