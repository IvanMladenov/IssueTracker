angular.module('issueTracker.home.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'HomeController',
            templateUrl: 'app/home/templates/home.html'
        })
    }])
    .controller('HomeController', [
        '$scope', 'authentication', 'notifyService', 'identity', 'homeService',
        function ($scope, authentication, notifyService, identity, homeService) {
            $scope.users = [];

            $scope.isAdmin = function(){
                return identity.isAdmin();
            };

            $scope.makeAdmin = function(userId){
                homeService.makeAdmin(userId)
                    .then(
                        function success(){
                            $scope.allUsers();
                            notifyService.showInfo('Successfully made this user admin');
                        }
                    )
            };

            $scope.hasLoggedUser = identity.hasLoggedUser;

            //$scope.allUsers = function(){
            //    homeService.getAllUsers()
            //        .then(
            //            function success(data){
            //                $scope.users = data.data;
            //            },
            //            function error(err){
            //                console.log(err);
            //            }
            //        );
            //};

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
                            identity.getCurrentUser()
                                .then(
                                    function(data){
                                        sessionStorage['currentUser'] = JSON.stringify(data);
                                    },
                                    function(err){
                                        console.log(err);
                                    }
                                )
                        },
                        function (err) {
                            notifyService.showError('Login failed', err);
                        }
                    );
            };
        }]);
