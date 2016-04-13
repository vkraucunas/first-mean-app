var addStudentController = function($scope, studentDataService) {
    $scope.student = {};
    $scope.addStudent = function() {
        studentDataService.addStudent($scope.student);
        console.log($scope.student);
        $scope.student = {};
    }
}

// $injections =============================================================
addStudentController.$inject = ['$scope', 'studentDataService'];

// adding controller to app ================================================
app.controller('addStudentController', addStudentController);