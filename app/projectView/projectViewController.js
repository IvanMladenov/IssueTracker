angular.module('issueTracker.projectView.controller', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects/:id', {
            controller: 'ProjectViewController',
            templateUrl: 'app/projectView/templates/project-view.html'
        })
    }])
    .controller('ProjectViewController', ['$scope', '$routeParams','projectViewService', 'notifyService', function($scope, $routeParams, projectViewService, notifyService){
        $scope.getProjectById = function(id){
            projectViewService.getProjectById(id)
                .then(
                    function success(project){
                        $scope.project = project.data;
                    },
                    function error(err){
                        notifyService.showError('Cannot load this project', err)
                    }
                )
        };

        $scope.getProjectIssues = function(projectId){
            projectViewService.getProjectIssues(projectId)
                .then(
                    function success(issues){
                        $scope.projectIssues = issues.data;
                        console.log(issues.data);
                    },
                    function error(err){
                        notifyService.showError('Cannot load issues for this project', err);
                    }
                )
        };

        $scope.getProjectById($routeParams.id);
        $scope.getProjectIssues($routeParams.id);
    }]);