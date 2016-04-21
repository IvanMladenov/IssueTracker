angular.module('issueTracker.addProject.controller', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/projects/add', {
            controller: 'AddProjectController',
            templateUrl: 'app/addProject/templates/add-project.html',
            access: {
                requiresAdmin: true
            }
        })
    }])
    .controller('AddProjectController', [
        '$scope', '$location', 'addProjectService', 'notifyService',
        function($scope, $location, addProjectService, notifyService){
        $scope.allUsers();

        $scope.addProject = function(project){
            project.labels = getArrayOfWords(project.labels);
            project.priorities = getArrayOfWords(project.priorities);
            addProjectService.addProject(project)
                .then(
                    function success(data){
                        notifyService.showInfo('Successfully add project');
                        $location.path('projects/' + data.data.Id);
                    },
                    function error(err){
                        notifyService.showError('Cannot add this project', err);
                    }
                )
        };

        function getArrayOfWords(str){
            return str.split(',');
        }
    }]);