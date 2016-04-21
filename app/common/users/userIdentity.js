angular.module('issueTracker.users.identity', [])
    .factory('identity', ['BASEURL', '$q', '$http',
        function (BASEURL, $q, $http) {


            function getCurrentUser(){
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASEURL + 'users/me',
                    headers: {'Authorization': 'Bearer ' + sessionStorage.authToken}
                };
                $http(request)
                    .then(function (data) {
                        deferred.resolve(data.data);
                    }, function (err) {
                        deferred.reject(err)
                    });
                return deferred.promise;
            }

            var projectLeader = false;

            function setProjectLeader (projectId){
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASEURL + 'projects/' + projectId,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.authToken}
                };
                $http(request)
                    .then(function (data) {
                        projectLeader = data.data.Lead.Id===JSON.parse(sessionStorage.currentUser).Id;
                        deferred.resolve();
                    }, function (err) {
                        deferred.reject(err)
                    });
                return deferred.promise;

            }

            function isProjectLeader(){
                return projectLeader;
            }

            var isAdministrator = function(){
                var curretnUser = undefined;
                getCurrentUser()
                    .then(
                        function(data){
                            curretnUser = data.isAdmin;
                        }
                    );
                return curretnUser;
            };

            function isAdmin (){
                if (sessionStorage['currentUser']){
                    var current = JSON.parse(sessionStorage.currentUser);
                    return current.isAdmin;
                }
            }

            function hasLoggedUser() {
                return sessionStorage.authToken !== undefined;
            }

            return {
                hasLoggedUser: hasLoggedUser,
                getCurrentUser: getCurrentUser,
                isAdmin: isAdmin,
                setProjectLeader: setProjectLeader,
                isProjectLeader: isProjectLeader
            }
        }]);