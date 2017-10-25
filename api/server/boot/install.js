'use strict';

var installed = true;
module.exports = function (app) {
    if (!installed) {
        var User = app.models.User;
        var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;
    
        User.create([
            {username: 'jorje', email: 'jorje12@gmail.com', password: 'admin'},
            {username: 'dea', email: 'jorje12@gmail.com', password: 'user'}
        ], function(err, users) {
            if (err) throw err;
    
            console.log("Created User: ", users);
            //create the admin role
            Role.create({
            name: 'admin'
            }, function(err, role) {
                if (err) throw err;
    
            //make bob an admin
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id
            }, function(err, principal) {
                if (err) throw err;
                console.log('Created principal: ', principal);
            });
            });
        });
    }

};