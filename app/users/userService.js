angular.module('issueTracker.users.service',[])
    .factory('userService', ['$http', '$q', 'BASEURL',
    function($http, $q, BASEURL){
        function register(userData){
            var deferred = $q.defer();
            var data = {
                Email:userData.username,
                Password: userData.password,
                ConfirmPassword: userData.confirmPassword
            };
            $http.post(BASEURL + 'api/Account/Register', data)
                .then(function(responce){
                    deferred.resolve(responce);
                });

            return deferred.promise;
        }

        function login(userData){
            var deferred = $q.defer();
            var data = "grant_type=password&username=" + userData.username + "&password=" + userData.password;
            $http.post(BASEURL + 'api/Token', data)
                .then(function (responce){
                    deferred.resolve(responce.data);
                });

            return deferred.promise;
        }

        function logout(){
            var deferred = $q.defer();

            $http.post(BASEURL + 'api/Account/Logout');

            return deferred.promise;
        }

        return{
            register: register,
            login: login,
            logout: logout
        }
    }]);