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

            $scope.hasLoggedUser = identity.hasLoggedUser;

            $scope.issuesParams = {
                pageSize: 10,
                pageNumber: 1
            };

            $scope.getUserIssues = function (){
                homeService.getUserIssues($scope.issuesParams)
                    .then(
                        function success(data){
                            $scope.userIssues = data.Issues;
                            $scope.issuesCount = data.TotalPages*$scope.issuesParams.pageSize;
                        },
                        function error(err){
                            notifyService.showError('Cannot load issues at the moment', err);
                        }
                    )
            };

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

            if ($scope.hasLoggedUser()){
                $scope.getUserIssues();
            }
        }]);
