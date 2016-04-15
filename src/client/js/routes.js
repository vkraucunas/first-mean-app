app.config(function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'templates/home.html',
        restricted: true,
        preventLoggedIn: false
    })
    .when('/auth/register', {
        templateUrl: 'templates/register.html',
        controller: "registerController",
        restricted: false,
        preventLoggedIn: true
    })
    .when('/auth/login', {
        templateUrl: 'templates/login.html',
        controller: "loginController",
        restricted: false,
        preventLoggedIn: true
    })
    .when('/auth/logout', {
        restricted: false,
        preventLoggedIn: false,
        resolve: function(authService, $location) {
            authService.logout();
            $location.path('/login');
        }
    })
    .otherwise({redirectTo: '/auth/login'});
    $httpProvider.interceptors.push('authInterceptor');
});

app.run(function($rootScope, $location, $window, authService) {
    //check if token
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        //if restricted and no token
        if(next.restricted && !$window.localStorage.getItem('token')) {
            $location.path('/login');
        }
        if(next.preventLoggedIn && !$window.localStorage.getItem('token')) {
            $location.path('/');
        }

    });
});