angular.module('issueTracker.users.identity', [])
    .factory('identity', ['BASEURL', '$q', '$http',
        function (BASEURL, $q, $http) {

            function hasLoggedUser() {
                return sessionStorage.authToken !== undefined;
            };
            //var deferred = $q.defer();
            //var request = {
            //    method: 'GET',
            //    url: BASEURL + 'users/me',
            //    headers:{'Authorization': 'Bearer ' + sessionStorage.authToken}
            //};

            //$http(request)
            //    .then(function(responce){
            //        currentUser = responce.data;
            //        console.log(responce);
            //        $q.resolve(responce);
            //    }, function(err){
            //        $q.reject(err);
            //    });

            return {
                hasLoggedUser: hasLoggedUser
                //getCurrentUser: function(){
                //    if (currentUser){
                //        return $q.when(currentUser);
                //    }else {
                //        return $q.promise;
                //    }
                //}
            }
        }]);