angular.module('issueTracker.users.authentication',[])
    .factory('authentication', ['$http', '$q', 'BASEURL',
    function($http, $q, BASEURL){
        function register(userData){
            var deferred = $q.defer();
            var request = {
                method: 'POST',
                url: BASEURL + 'api/Account/Register',
                data: {
                    'Email': userData.username,
                    'Password': userData.password,
                    'ConfirmPassword': userData.confirmPassword
                },
                headers: {'Content-Type': 'application/json'}
            };
            $http(request)
                .then(function(responce){
                    deferred.resolve(responce);
                },
                function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function login(userData){
            var deferred = $q.defer();
            var loginData = "grant_type=password&username=" + userData.username + "&password=" + userData.password;
            var request = {
                method: 'POST',
                url: BASEURL + 'api/Token',
                data: loginData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            };
            $http(request)
                .then(function (responce){
                    deferred.resolve(responce.data);
                },
                function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function logout(){
            var deferred = $q.defer();
            var request = {
                method: 'POST',
                url: BASEURL + 'api/Account/Logout',
                headers:{'Authorization': 'Bearer ' + sessionStorage.authToken}
            };

            $http(request)
                .then(function(){
                    deferred.resolve();
                }, function(err){
                    deferred.reject(err)
                });

            return deferred.promise;
        }


        return{
            register: register,
            login: login,
            logout: logout
        }
    }]);