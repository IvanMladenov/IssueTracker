angular.module('issueTracker.projects.service', [])
    .factory('allProjectsService', ['$http', '$q', 'BASEURL',
        function ($http, $q, BASEURL) {
            getAllProject = function (projectsParams) {
                var deferred = $q.defer();
                var requestData = {
                    method: 'GET',
                    url: BASEURL + 'projects?filter=&pageSize=' + projectsParams.pageSize + '&pageNumber=' + projectsParams.pageNumber,
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