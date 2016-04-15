app.config(function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'templates/home.html'
    })
    .when('/register', {
        templateUrl: 'templates/register.html',
        controller: "registerController"
    })
    .when('/login', {
        templateUrl: 'templates/login.html',
        controller: "loginController"
    })
    .when('/logout', {
    })
    .otherwise({redirectTo: '/login'});
    // $httpProvider.interceptors.push('AuthInterceptor');
});