angular.module('issueTracker.issuePage.directives', [])
    .directive('ngComments', [function(){
        return {
            restrict: 'A',
            templateUrl: 'app/issuePage/templates/comments.html'
        }
    }])
    .directive('ngStatusTable', [function(){
        return {
            restrict: 'A',
            templateUrl: 'app/issuePage/templates/status-table.html'
        }
    }])
    .directive('ngIssueInfo', [function(){
        return {
            restrict: 'A',
            templateUrl: 'app/issuePage/templates/issue-info.html'
        }
    }]);