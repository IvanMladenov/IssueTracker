angular.module('issueTracker.editIssue.service', [])
    .factory('editIssueService', [
        '$http', '$q', 'BASEURL',
        function($http, $q, BASEURL){
            function editIssue(issue, id){
                var deferred = $q.defer();
                var dataLabels = '';
                issue.Labels.forEach(function(label, index) {
                    dataLabels += '&labels[' + index + '].Name=' + label.trim();
                });

                var data = 'Title=' + issue.Title +
                    '&Description=' + issue.Description +
                    '&DueDate=' + issue.DueDate.toLocaleString()  +
                    '&AssigneeId=' + issue.AssigneeId +
                    '&PriorityId=' + issue.PriorityId +
                    dataLabels;
                console.log(data);
                var requestData = {
                    method: 'PUT',
                    url: BASEURL + 'issues/' + id,
                    data: data,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                $http(requestData)
                    .then(
                        function success(data){
                            deferred.resolve(data);
                        },
                        function error(err){
                            deferred.reject(err);
                        }
                    );


                return deferred.promise;
            }

            return {
                editIssue: editIssue
            }
        }
    ]);