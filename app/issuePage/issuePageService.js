angular.module('issueTracker.issuePage.service', [])
    .factory('issuePageService', [
        '$http', '$q', 'BASEURL',
        function ($http, $q, BASEURL) {
            function getIssueById(issueId) {
                var deferred = $q.defer();
                var requestData = {
                    method: 'GET',
                    url: BASEURL + 'Issues/' + issueId,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken
                    }
                };
                $http(requestData)
                    .then(
                        function success(data) {
                            deferred.resolve(data);
                        },
                        function error(err) {
                            deferred.reject(err);
                        }
                    );

                return deferred.promise;
            }

            function getIssueComments (issueId){
                var deferred = $q.defer();
                var requestData = {
                    method: 'GET',
                    url: BASEURL + 'Issues/' + issueId + '/comments',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken
                    }
                };
                $http(requestData)
                    .then(
                        function success(data) {
                            deferred.resolve(data);
                        },
                        function error(err) {
                            deferred.reject(err);
                        }
                    );

                return deferred.promise;
            }

            function changeIssueStatus (issueId, statusId){
                var deferred = $q.defer();
                var requestData = {
                    method: 'PUT',
                    url: BASEURL + 'Issues/' + issueId + '/changestatus?statusid=' + statusId,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken
                    }
                };
                $http(requestData)
                    .then(
                        function success(data) {
                            deferred.resolve(data);
                        },
                        function error(err) {
                            deferred.reject(err);
                        }
                    );

                return deferred.promise;
            }

            function addComment (comment, issueId){
                var deferred = $q.defer();
                var requestData = {
                    method: 'POST',
                    url: BASEURL + 'Issues/' + issueId + '/comments',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken
                    },
                    data:{'Text': comment}
                };
                $http(requestData)
                    .then(
                        function success(data) {
                            deferred.resolve(data);
                        },
                        function error(err) {
                            deferred.reject(err);
                        }
                    );

                return deferred.promise;
            }

            return {
                getIssueById: getIssueById,
                changeIssueStatus: changeIssueStatus,
                getIssueComments: getIssueComments,
                addComment: addComment
            }
        }
    ]);