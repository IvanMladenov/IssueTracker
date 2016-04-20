angular.module('issueTracker', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap.pagination',
    'issueTracker.home.controller',
    'issueTracker.users.authentication',
    'issueTracker.common.notifyService',
    'issueTracker.users.identity',
    'issueTracker.addProject.controller',
    'issueTracker.addProject.service',
    'issueTracker.changePassword.controller',
    'issueTracker.changePassword.service',
    'issueTracker.common.controller',
    'issueTracker.common.service',
    'issueTracker.home.service',
    'issueTracker.projects.controller',
    'issueTracker.projects.service',
    'issueTracker.project.controller',
    'issueTracker.projectView.service',
    'issueTracker.admin.controller',
    'issueTracker.admin.service',
    'issueTracker.issuePage.controller',
    'issueTracker.issuePage.service',
    'issueTracker.editIssue.controller',
    'issueTracker.editIssue.service',
    'issueTracker.addIssue.controller',
    'issueTracker.addIssue.service'
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
