angular.module('issueTracker', [
    'ngRoute',
    'ngResource',
    'issueTracker.home.controller',
    'issueTracker.users.authentication',
    'issueTracker.common.notifyService',
    'issueTracker.users.identity',
    'issueTracker.changePassword.controller',
    'issueTracker.changePassword.service',
    'issueTracker.common.controller',
    'issueTracker.home.service'
])
    .constant('BASEURL', ' http://softuni-issue-tracker.azurewebsites.net/')
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .otherwise({
            redirectTo: '/'
        })
    }])
    .run(['$rootScope', '$location', 'identity', function($rootScope, $location, identity) {
        $rootScope.$on('$locationChangeStart', function(event) {
            if(!identity.hasLoggedUser()) {
                $location.path('/');
            }
        });
    }]);
