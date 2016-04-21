angular.module('issueTracker.projects.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects', {
            controller: 'AllProjectsController',
            templateUrl: 'app/allProjects/templates/projects.html',
            access: {
                requiresLoggedUser: true
            }
        })
    }])
    .controller('AllProjectsController', [
        '$scope', 'allProjectsService', 'notifyService',
        function ($scope, allProjectsService, notifyService) {
            $scope.projectsParams = {
                pageSize: 10,
                pageNumber: 1
            };

            $scope.getAllProjects = function () {
                allProjectsService.getAllProjects($scope.projectsParams)
                    .then(
                        function success (data) {
                            $scope.projects = data.data.Projects;
                            $scope.projectsCount = data.data.TotalPages * $scope.projectsParams.pageSize;
                        },
                        function error(err){
                            notifyService.showError('Something went wrong', err);
                        }
                    );
            };

            $scope.getAllProjects();
    }]);