var addStudentController = function($scope, studentDataService) {
    studentDataService.getAllStudents()
    .then(function(students) {
        $scope.allStudents = students.data.data;
        console.log($scope.allStudents);

    })

    $scope.refresh = function() {
        studentDataService.getAllStudents()
        .then(function(students) {
            $scope.allStudents = students.data.data;
        })
    }
    $scope.student = {};
    $scope.addStudent = function() {
        studentDataService.addStudent($scope.student);
        console.log($scope.student);
        $scope.student = {};
        $scope.refresh();
    }
    $scope.deleteStudent = function(id) {
        studentDataService.deleteStudent(id);
        $scope.refresh();
    }
}
// ++++++++++++++++++++++++++++ register controller
var registerController = function($scope, $location, authService) {
    $scope.user = {};
    $scope.register = function() {
        authService.register($scope.user)
            .then(function(user) {
                authService.setUserInfo(user);
                $location.path('/');
            })
            .catch(function(err) {
                // check status code, send approps message
                console.log(err);
            })
    }
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ login controller
var loginController = function($scope, $location, authService) {
    $scope.user = {};
    $scope.login = function() {
        authService.login($scope.user)
            .then(function(user) {
                authService.setUserInfo(user);
                $location.path('/');
            })
            .catch(function(err) {
                // check status code, send approps message
                console.log(err);
            })
    }
}

// $injections =============================================================
addStudentController.$inject = ['$scope', 'studentDataService'];
registerController.$inject = ['$scope', '$location', 'authService'];
loginController.$inject = ['$scope', '$location', 'authService'];

// adding controller to app ================================================
app.controller('addStudentController', addStudentController);
app.controller('registerController', registerController);
app.controller('loginController', loginController);