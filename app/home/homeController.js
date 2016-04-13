angular.module('issueTracker.home.controller', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            controller: 'HomeController',
            templateUrl: 'app/home/templates/login-register.html'
        })
    }])
    .controller('HomeController', ['$scope', 'userService', function($scope, userService){
        $scope.register= function(userData){
            userService.register(userData)
                .then(function(responce){
                    $scope.login({username: userData.username, password: userData.password})
                }, function(err){
                });
        };

        $scope.login = function(userData){
            userService.login(userData)
                .then(function(responce){
                    sessionStorage['authToken'] = responce.access_token;
                })
        };
    }]);
