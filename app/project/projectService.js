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

            function editProject(project){
                var deferred = $q.defer();
                var dataLabels = '';
                project.Labels.forEach(function(label, index) {
                    dataLabels += '&labels[' + index + '].Name=' + label.trim();
                });
                var dataPriorities='';
                project.Priorities.forEach(function(priority, index) {
                    dataPriorities += '&priorities[' + index + '].Name=' + priority.trim();
                });
                var data = 'Name=' + project.Name +
                    '&Description=' + project.Description +
                    dataLabels + dataPriorities +
                    '&LeadId=' + project.LeadId;
                var requestData = {
                    method: 'PUT',
                    url: BASEURL + 'projects/' + project.Id,
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.authToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: data
                };
                $http(requestData)
                    .then(
                        function success(data){
                            deferred.resolve(data);
                        },
                        function error (err){
                            deferred.reject(err);
                        }
                    );

                return deferred.promise;
            }

            return {
                getProjectById: getProjectById,
                getProjectIssues: getProjectIssues,
                editProject: editProject
            }
        }
    ]);