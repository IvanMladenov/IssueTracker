angular.module('issueTracker.common.controller', [])
    .controller('MainCtrl', [
        '$scope',
        'identity',
        'authentication',
        'notifyService',
        function ($scope, identity, authentication, notifyService) {
            $scope.hasLoggedUser = identity.hasLoggedUser;

            $scope.logout = function(){
                authentication.logout()
                    .then(
                        function success(){
                            sessionStorage.clear();
                            notifyService.showInfo('Logout successfull');
                        },
                        function error(err){
                            notifyService.showError('Logout unsuccessfull', err);
                        }
                    )
            };
        }]);