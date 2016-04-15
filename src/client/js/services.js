app.service('studentDataService', ['crudService',
    function(crudService) {
        return {
            getAllStudents: function() {
                return crudService.getAll('students')
                .then(function(students) {
                    return students;
                })
            },
            addStudent: function(payload) {
                crudService.addOne('students', payload)
                .then(function(student) {
                    console.log(student);
                    return student;
                })
            },
            deleteStudent: function(id) {
                crudService.delete('students', id)
                .then(function(student) {
                    return student;
                })
            }
    }
}]);

app.service('crudService', ['$http', function($http){
    var data = [];

    return {
        getAll: function(resource) {
            return $http.get('/'+resource)
                 .then(function(res) {
                    return res;
                 })
                 .catch(function(err) {
                    return err;
                 })
        },
        addOne: function(resource, payload) {
            return $http.post('/'+resource, payload)
                 .then(function(res) {
                    return res;
                 })
                 .catch(function(err) {
                    return err;
                 })
        },
        delete: function(resource, id) {
            return $http.delete('/'+resource+'/'+id)
                .catch(function(err) {
                    return err;
                })
        }
    }
}]);

app.service('authService', ['$http', '$window', function($http, $window) {
    var user = {};
    return {
        //login
        login: function(user) {
            return $http.post('/auth/login', user);
        },
        //register
        register: function(user) {
            return $http.post('/auth/register', user);
        },
        //logout
        logout: function(user) {
            user = null;
            $window.localStorage.clear();
            // return $http.post('/auth/logout', user);
        },
        //get user info from local storage
        getUserInfo: function(userData) {
            $window.localStorage.getItem('user', 'PLACEHOLDER');
        },
        // set user info to local storage
        setUserInfo: function(userData) {
            console.log("This is from services", userData);
            $window.localStorage.setItem('user', JSON.stringify(userData.data.user));
            $window.localStorage.setItem('token', JSON.stringify(userData.data.token));
        }
    }
}])

app.service('authInterceptor', ['$window', '$q', function($window, $q){
  return {
    // always make sure to return anything you use here!
    request: function(config){
        //check for token in headers
        // config.headers['X-requested-with'] = XMLHttpRequest;
        var token = $window.localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
            return $q.resolve(config);
        }
      return config;
    },
    // requestError: function(err){
    //   debugger
    //   return err;
    // },
    response: function(config){
      return config;
    },
    responseError: function(err){
        // if header auth not present, throw error

      return err;
    }
  };
}]);





















