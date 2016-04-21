angular.module('issueTracker.projects.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects', {
            controller: 'AllProjectsController',
            templateUrl: 'app/allProjects/templates/projects.html'
        })
    }])
    .controller('AllProjectsController', [
        '$scope', 'allProjectsService', 'notifyService',
        function ($scope, allProjectsService, notifyService) {
            $scope.projects = [];
            $scope.getAllProjects = function () {
                allProjectsService.getAllProjects()
                    .then(
                        function success (data) {
                            $scope.projects = data.data;
                        },
                        function error(err){
                            notifyService.showError('Something went wrong', err);
                        }
                    );
            };

            $scope.getAllProjects();
    }]);