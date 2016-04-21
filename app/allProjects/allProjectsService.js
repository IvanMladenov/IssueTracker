angular.module('issueTracker.projects.service', [])
    .factory('allProjectsService', ['$http', '$q', 'BASEURL',
        function ($http, $q, BASEURL) {
            getAllProject = function () {
                var deferred = $q.defer();
                var requestData = {
                    method: 'GET',
                    url: BASEURL + 'projects',
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken
                    }
                };
                $http(requestData)
                    .then(
                        function success(data) {
                            deferred.resolve(data);
                        },
                        function err(err) {
                            deferred.reject(err);
                        }
                    );

                return deferred.promise;
            };
            return {
                getAllProjects: getAllProject
            }
        }]);