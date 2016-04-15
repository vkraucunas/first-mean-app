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

var registerController = function($scope) {
    $scope.user = {};
    $scope.register = function() {
        console.log($scope.user);
    }
}

var loginController = function($scope) {
    $scope.user = {};
    $scope.login = function() {
        console.log($scope.user);
    }
}

// $injections =============================================================
addStudentController.$inject = ['$scope', 'studentDataService'];
registerController.$inject = ['$scope'];
loginController.$inject = ['$scope'];

// adding controller to app ================================================
app.controller('addStudentController', addStudentController);
app.controller('registerController', registerController);
app.controller('loginController', loginController);