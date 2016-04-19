angular.module('issueTracker.addProject.service', [])
    .factory('addProjectService', [
        '$http', '$q', 'BASEURL',
        function($http, $q, BASEURL){
            function addProject(project){
                var deferred = $q.defer();
                var dataLabels = '';
                project.labels.forEach(function(label, index) {
                    dataLabels += '&labels[' + index + '].Name=' + label.trim();
                });
                var dataPriorities='';
                project.priorities.forEach(function(priority, index) {
                    dataPriorities += '&priorities[' + index + '].Name=' + priority.trim();
                });
                var data = 'Name=' + project.name +
                    '&Description=' + project.description +
                    '&ProjectKey=' + project.key +
                    dataLabels + dataPriorities +
                    '&LeadId=' + project.leadId;
                var requestData = {
                    method: 'POST',
                    url: BASEURL + 'projects',
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

            return{
                addProject: addProject
            }
        }
    ]);