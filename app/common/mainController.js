angular.module('issueTracker.common.controller', [])
    .controller('MainCtrl', [
        '$scope',
        'identity',
        'authentication',
        'notifyService',
        'mainService',
        function ($scope, identity, authentication, notifyService, mainService) {

            $scope.hasLoggedUser = identity.hasLoggedUser;

            $scope.isAdmin = identity.isAdmin;

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

            $scope.allUsers = function(){
                mainService.getAllUsers()
                    .then(
                        function success(data){
                            $scope.users = data.data;
                        },
                        function error(err){
                            console.log(err);
                        }
                    );
            };
        }]);