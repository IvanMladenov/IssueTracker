angular.module('issueTracker.projectView.service', [])
    .factory('projectService', [
        '$http', '$q', 'BASEURL',
        function($http, $q, BASEURL){
            function getProjectById(id){
                var deferred = $q.defer();
                var requestData = {
                    method: 'GET',
                    url: BASEURL + 'projects/' + id,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken
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

            function getProjectIssues(projectId){
                var deferred = $q.defer();
                var requestData = {
                    method: 'GET',
                    url: BASEURL + 'projects/' + projectId + '/Issues',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken
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
                getProjectById: getProjectById,
                getProjectIssues: getProjectIssues
            }
        }
    ]);