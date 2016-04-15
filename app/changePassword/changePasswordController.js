angular.module('issueTracker.changePassword.controller', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/profile/password', {
            templateUrl: 'app/changePassword/templates/change-password.html',
            controller: 'ChangePasswordCtrl'
        })
    }])
    .controller('ChangePasswordCtrl', ['$scope', 'changePasswordService', 'notifyService',
        function($scope, changePasswordService, notifyService){
            $scope.changeUserPassword = function(data){
                changePasswordService.changePassword(data)
                    .then(
                        function success(){
                            notifyService.showInfo('Password successfully changed.');
                        },
                        function error(err){
                            notifyService.showError('Something went wrong', err);
                        }
                    )
            };
    }]);