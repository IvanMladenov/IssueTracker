angular.module('issueTracker.home.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'HomeController',
            templateUrl: 'app/home/templates/home.html'
        })
    }])
    .controller('HomeController', [
        '$scope', 'authentication', 'notifyService', 'identity',
        function ($scope, authentication, notifyService, identity) {
            $scope.hasLoggedUser = identity.hasLoggedUser;

            $scope.register = function (userData) {
                authentication.register(userData)
                    .then(function (responce) {
                        notifyService.showInfo('Registration successfull');
                        $scope.login({username: userData.username, password: userData.password});
                    }, function (err) {
                        notifyService.showError('Registration failed', err);
                    });
            };

            $scope.login = function (userData) {
                authentication.login(userData)
                    .then(function (responce) {
                            sessionStorage['authToken'] = responce.access_token;
                            notifyService.showInfo('Login successfull');
                        },
                        function (err) {
                            notifyService.showError('Login failed', err);
                        })
            };

            $scope.logout = function () {
                authentication.logout()
                    .then(function () {
                            sessionStorage.clear();
                            notifyService.showInfo('Successfully logged out')
                        },
                        function (err) {
                            notifyService.showError('Not logged out', err);
                        });
            }
        }]);
