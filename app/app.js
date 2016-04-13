angular.module('issueTracker', [
    'ngRoute',
    'ngResource',
    'issueTracker.home.controller',
    'issueTracker.users.service'
])
    .constant('BASEURL', ' http://softuni-issue-tracker.azurewebsites.net/')
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.otherwise({
            redirectTo: '/'
        })
    }]);
