angular.module('issueTracker.project.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/:id', {
                controller: 'ProjectController',
                templateUrl: 'app/project/templates/project-view.html'
            })
            .when('/projects/edit/:id', {
                controller: 'ProjectEditController',
                templateUrl: 'app/project/templates/project-edit.html'
            })
    }])
    .controller('ProjectEditController', [
        '$scope', '$routeParams', 'projectService', 'notifyService',
        function ($scope, $routeParams, projectService, notifyService) {
            $scope.name = 'Ivan';
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

            $scope.getProjectById($routeParams.id.trim('/edit'));
        }])
    .controller('ProjectController', [
        '$scope', '$routeParams', 'projectService', 'notifyService',
        function ($scope, $routeParams, projectService, notifyService) {
            getProjectById = function (id) {
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

            getProjectIssues = function (projectId) {
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

            getProjectById($routeParams.id);
            getProjectIssues($routeParams.id);
        }]);