angular.module('issueTracker.home.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'HomeController',
            templateUrl: 'app/home/templates/home.html',
            access: {
                requiresLoggedUser: true
            }
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

            $scope.projectsParams = {
                pageSize: 7,
                pageNumber: 1
            };

            $scope.getUserIssues = function () {
                homeService.getUserIssues($scope.issuesParams)
                    .then(
                        function success(data) {
                            $scope.userIssues = data.Issues;
                            $scope.showIssuesPagination = data.TotalPages>1;
                            $scope.issuesCount = data.TotalPages * $scope.issuesParams.pageSize;
                        },
                        function error(err) {
                            notifyService.showError('Cannot load issues at the moment', err);
                        }
                    )
            };

            $scope.getAssociatedProjects = function(){
                homeService.getUserProjects($scope.projectsParams)
                    .then(
                        function success(projects){
                            $scope.showProjectsPagination = projects.TotalPages>1;
                            $scope.projectsCount = projects.TotalPages * $scope.projectsParams.pageSize;
                            $scope.projectsWhereLead = projects.Projects;
                        },
                        function error(err){
                            console.log(err);
                        }
                    );
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
                        $scope.getUserIssues();
                        notifyService.showInfo('Login successfull');
                        identity.getCurrentUser()
                            .then(
                                function (data) {
                                    sessionStorage['currentUser'] = JSON.stringify(data);
                                    $scope.getAssociatedProjects();
                                },
                                function (err) {
                                    console.log(err);
                                }
                            )
                        },
                        function (err) {
                            notifyService.showError('Login failed', err);
                        }
                    );
            };

            if ($scope.hasLoggedUser()) {
                $scope.getUserIssues();
                $scope.getAssociatedProjects();
            }
        }]);
