angular.module('issueTracker.issuePage.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id', {
            controller: 'IssuePageController',
            templateUrl: 'app/issuePage/templates/issue-page.html',
            access: {
                requiresLoggedUser: true
            }
        })
    }])
    .controller('IssuePageController', [
        '$scope', '$routeParams', '$location', 'issuePageService', 'identity', 'notifyService',
        function ($scope, $routeParams, $location, issuePageService, identity, notifyService) {

            $scope.changeStatus = function (statusId) {
                issuePageService.changeIssueStatus($scope.currentIssue.Id, statusId)
                    .then(
                        function success() {
                            getIssue();
                        },
                        function error(err) {
                            notifyService.showError('Cannot change status at the moment', err)
                        }
                    )
            };

            function getIssue() {
                issuePageService.getIssueById($routeParams.id)
                    .then(
                        function success(issue) {
                            $scope.currentIssue = issue.data;
                            $scope.currentIssueLabels = [];
                            issue.data.Labels.forEach(function (label) {
                                $scope.currentIssueLabels.push(label.Name);
                            });
                            identity.setProjectLeader($scope.currentIssue.Project.Id)
                                .then(
                                    function success() {
                                        $scope.isProjectLeader = identity.isProjectLeader();
                                    }
                                );
                        },
                        function error(err) {
                            notifyService.showError('Cannot load issue at the moment', err)
                        }
                    );
            }

            getIssue();

        }]);