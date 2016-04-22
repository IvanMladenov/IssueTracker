angular.module('issueTracker.project.directives', [])
    .directive('ngProjectIssuesTable', [function(){
        return {
            restrict: 'A',
            templateUrl: 'app/project/templates/project-issues-table.html'
        }
    }])
    .directive('ngIssuesFilters', [function(){
        return {
            restrict: 'A',
            templateUrl: 'app/project/templates/issues-filters.html'
        }
    }])
    .directive('ngProjectInfo', [function(){
        return {
            restrict: 'A',
            templateUrl: 'app/project/templates/project-info.html'
        }
    }]);