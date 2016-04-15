angular.module('issueTracker.changePassword.service', [])
    .factory('changePasswordService', ['$q', '$http', 'BASEURL',
        function ($q, $http, BASEURL) {

        function changePassword(data) {
            var deferred = $q.defer();
            var requestData = 'OldPassword=' + data.oldPassword + '&NewPassword=' + data.newPassword + '&ConfirmPassword=' + data.confirmNewPassword;
            var request = {
                method: 'POST',
                url: BASEURL + 'api/Account/ChangePassword',
                data: requestData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + sessionStorage.authToken
                }
            };
            $http(request)
                .then(
                    function (data) {
                        deferred.resolve(data);
                    },
                    function (err) {
                        deferred.reject(err);
                    }
                );
            return deferred.promise;
        }

        return {
            changePassword: changePassword
        }
    }]);
