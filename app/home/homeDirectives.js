angular.module('issueTracker.home.directives', [])
    .directive('ngLoginForm', [function(){
        return {
            restrict: 'A',
            templateUrl: 'app/home/templates/login-form.html'
        }
    }])
    .directive('ngRegisterForm', [function(){
        return {
            restrict: 'A',
            templateUrl: 'app/home/templates/register-form.html'
        }
    }])
    .directive('ngIssuesTable', [function(){
        return {
            restrict: 'A',
            templateUrl: 'app/home/templates/issues-table.html'
        }
    }])
    .directive('ngAffiliatedProjects', [function(){
        return {
            restrict: 'A',
            templateUrl: 'app/home/templates/aff-projects.html'
        }
    }]);