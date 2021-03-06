angular.module('issueTracker.common.service',[])
    .factory('mainService', ['$http','$q','BASEURL',function($http, $q, BASEURL){
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
        return{
            getAllUsers: getAllUsers
        }
    }]);