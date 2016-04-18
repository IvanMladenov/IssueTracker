angular.module('issueTracker.projects.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            controller: 'ProjectsController',
            templateUrl: 'app/projects/templates/projects.html'
        })
    }])
    .controller('ProjectsController', ['$scope', 'projectsService', 'notifyService',
        function ($scope, projectsService, notifyService) {
            $scope.projects = [];
            $scope.getAllProjects = function () {
                projectsService.getAllProjects()
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