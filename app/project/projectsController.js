angular.module('issueTracker.project.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/:id', {
                controller: 'ProjectController',
                templateUrl: 'app/project/templates/project-view.html'
            })
            .when('/projects/:id/edit', {
                controller: 'ProjectEditController',
                templateUrl: 'app/project/templates/project-edit.html'
            })
    }])
    .controller('ProjectEditController', [
        '$scope', '$routeParams', 'projectService', 'notifyService',
        function ($scope, $routeParams, projectService, notifyService) {
            $scope.getProjectById = function (id) {
                projectService.getProjectById(id)
                    .then(
                        function success(project) {
                            $scope.project = project.data;
                            console.log(project.data)
                        },
                        function error(err) {
                            notifyService.showError('Cannot load this project', err)
                        }
                    )
            };

            $scope.getProjectById($routeParams.id);
        }])
    .controller('ProjectController', [
        '$scope', '$routeParams', 'projectService', 'notifyService',
        function ($scope, $routeParams, projectService, notifyService) {
            $scope.getProjectById = function (id) {
                projectService.getProjectById(id)
                    .then(
                        function success(project) {
                            $scope.project = project.data;
                        },
                        function error(err) {
                            notifyService.showError('Cannot load this project', err)
                        }
                    )
            };

            $scope.getProjectIssues = function (projectId) {
                projectService.getProjectIssues(projectId)
                    .then(
                        function success(issues) {
                            $scope.projectIssues = issues.data;
                        },
                        function error(err) {
                            notifyService.showError('Cannot load issues for this project', err);
                        }
                    )
            };

            $scope.getProjectById($routeParams.id);
            $scope.getProjectIssues($routeParams.id);
        }]);