angular.module('issueTracker.home.service', [])
    .factory('homeService', ['$http', '$q', 'BASEURL', function ($http, $q, BASEURL) {
        function getAllUsers() {
            var deferred = $q.defer();
            var request = {
                method: 'GET',
                url: BASEURL + 'Users/',
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.authToken
                }
            };
            $http(request)
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

        function makeAdmin(userId) {
            var deferred = $q.defer();
            var request = {
                method: 'PUT',
                url: BASEURL + 'Users/makeadmin',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.authToken,
                    'Content-Type': 'application/json'
                },
                data: {'UserId': userId}
            };
            $http(request)
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
            getAllUsers: getAllUsers,
            makeAdmin: makeAdmin
        }
    }]);