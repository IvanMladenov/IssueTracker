angular.module('issueTracker.changePassword.controller', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/profile/password', {
            templateUrl: 'app/changePassword/templates/change-password.html',
            controller: 'ChangePasswordCtrl'
        })
    }])
    .controller('ChangePasswordCtrl', ['$scope', 'changePasswordService', 'notifyService',
        function($scope, changePasswordService, notifyService){
        $scope.changePassword = function changePassword (data){
            changePasswordService.changePassword(data)
                .then(
                    function(){
                        notifyService.showInfo('Your password has been changed');
                    },
                    function(err){
                        notifyService.showError('Something went wrong', err);
                    }
                )
        }
    }]);