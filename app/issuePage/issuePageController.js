angular.module('issueTracker.issuePage.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id', {
            controller: 'IssuePageController',
            templateUrl: 'app/issuePage/templates/issue-page.html'
        })
    }])
    .controller('IssuePageController', [
        '$scope', '$routeParams', 'issuePageService', 'notifyService',
        function ($scope, $routeParams, issuePageService, notifyService) {
            issuePageService.getIssueById($routeParams.id)
                .then(
                    function success(issue) {
                        $scope.currentIssue = issue.data;
                        $scope.currentIssueLabels = [];
                        issue.data.Labels.forEach(function(label) {
                            $scope.currentIssueLabels.push(label.Name);
                        })
                    },
                    function error(err) {
                        notifyService.showError('Cannot load issue at the moment', err)
                    }
                );

        }]);