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
                isAdmin: isAdmin
            }
        }]);