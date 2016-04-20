angular.module('issueTracker.editIssue.controller', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/issues/edit/:id', {
            controller: 'EditIssueController',
            templateUrl: 'app/editIssue/templates/edit-issue.html'
        })
    }])
    .controller('EditIssueController', [
        '$scope', '$routeParams', '$location', 'editIssueService', 'issuePageService', 'projectService', 'notifyService',
        function($scope, $routeParams, $location, editIssueService, issuePageService, projectService, notifyService){
            $scope.allUsers();

            issuePageService.getIssueById($routeParams.id)
                .then(
                    function success(issue){
                        console.log(issue);
                        $scope.currentIssue = issue.data;
                        $scope.currentIssueDueDateLocal =new Date(issue.data.DueDate);
                        $scope.issuePriority = issue.data.Priority.Id;
                        $scope.currentIssueLabels = [];

                        issue.data.Labels.forEach(function(label) {
                            $scope.currentIssueLabels.push(label.Name);
                        });

                        projectService.getProjectById(issue.data.Project.Id)
                            .then(function success(project) {
                                console.log(project);
                                $scope.projectPriorities = project.data.Priorities;
                            });
                    },
                    function error(err){

                    }
                );

            $scope.editIssue = function(){
                if(typeof $scope.currentIssueLabels === 'string') {
                    $scope.currentIssueLabels = $scope.currentIssueLabels.split(',')
                }

                var issueToEdit = {
                    Title: $scope.currentIssue.Title,
                    Description: $scope.currentIssue.Description,
                    DueDate: $scope.currentIssueDueDateLocal,
                    AssigneeId: $scope.currentIssue.Assignee.Id,
                    PriorityId: $scope.issuePriority,
                    Labels: $scope.currentIssueLabels
                };

                editIssueService.editIssue(issueToEdit, $routeParams.id)
                    .then(
                        function success(responce){
                            $location.path('issues/' + responce.Id)
                        },
                        function error(err){
                            console.log(err);
                            notifyService.showError('Cannot edit issue at the moment', err);
                        }
                    )
            }
        }]);