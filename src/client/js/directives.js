app.directive('navBarDirective', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/directives/navbar.html'
    }
})
