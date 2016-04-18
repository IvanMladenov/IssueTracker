angular.module('issueTracker.addProject.controller', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('projects/add', {
            controller: 'AddProjectController',
            templateUrl: 'app/addProject/templates/add-project.html'
        })
    }])
    .controller('AddProjectController', [function(){

    }]);