angular.module('issueTracker.home.service', [])
    .factory('homeService', [
        '$http', '$q', 'BASEURL',
        function ($http, $q, BASEURL) {

            function getUserIssues(pageParams){
                var deferred = $q.defer();
                var requestData = {
                    method: 'GET',
                    url: BASEURL + 'issues/me?orderBy=DueDate desc&pageSize=' + pageParams.pageSize + '&pageNumber=' + pageParams.pageNumber,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken
                    }
                };
                $http(requestData)
                    .then(
                        function success(data){
                            deferred.resolve(data.data);
                        },
                        function error(err){
                            deferred.resolve(err);
                        }
                    );

                return deferred.promise;
            }

            function getUserProjectsWhereIsLead(pageParams){
                var deferred = $q.defer();
                var id = JSON.parse(sessionStorage.currentUser).Id;
                var requestData = {
                    method: 'GET',
                    url: BASEURL + 'projects?filter=Lead.Id="' + id + '"&pageSize='+pageParams.pageSize + '&pageNumber=' + pageParams.pageNumber,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken
                    }
                };
                $http(requestData)
                    .then(
                        function success(data){
                            deferred.resolve(data.data);
                        },
                        function error(err){
                            deferred.resolve(err);
                        }
                    );

                return deferred.promise;
            }

            return{
                getUserIssues: getUserIssues,
                getUserProjects: getUserProjectsWhereIsLead
            }
    }]);