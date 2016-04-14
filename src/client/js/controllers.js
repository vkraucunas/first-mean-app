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

// $injections =============================================================
addStudentController.$inject = ['$scope', 'studentDataService'];

// adding controller to app ================================================
app.controller('addStudentController', addStudentController);