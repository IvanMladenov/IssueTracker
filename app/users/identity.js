angular.module('issueTracker.users.identity', [])
    .factory('identity',['BASEURL', '$q', '$http', function(BASEURL, $q, $http){
        var deferred = $q.defer(),
            currentUser = undefined;
        var request = {
            method: 'GET',
            url: BASEURL + 'users/me',
            headers:{'Authorization': 'Bearer ' + sessionStorage.authToken}
        };

        //$http(request)
        //    .then(function(responce){
        //        currentUser = responce.data;
        //        console.log(responce);
        //        $q.resolve(responce);
        //    }, function(err){
        //        $q.reject(err);
        //    });

        return{
            getCurrentUser: function(){
                if (currentUser){
                    return $q.when(currentUser);
                }else {
                    return $q.promise;
                }
            }
        }
    }]);