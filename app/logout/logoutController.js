angular.module('issueTracker.logout.controller', [])
    .controller('LogoutController', ['$scope', 'authentication', 'notifyService', function($scope, authentication, notifyService){
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