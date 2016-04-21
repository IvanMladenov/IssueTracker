angular.module('issueTracker.admin.controller', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin', {
            controller: 'AdminController',
            templateUrl: 'app/admin/templates/admin.html',
            access: {
                requiresAdmin: true
            }
        })
    }])
    .controller('AdminController', [
        '$scope', 'adminService', 'notifyService',
        function ($scope, adminService, notifyService) {
            $scope.allUsers();

            $scope.makeAdmin = function (userId) {
                adminService.makeAdmin(userId)
                    .then(
                        function success() {
                            $scope.allUsers();
                            notifyService.showInfo('Successfully made this user admin');
                        }
                    )
            };
        }]);