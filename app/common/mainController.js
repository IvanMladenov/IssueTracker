angular.module('issueTracker.common.controller', [])
    .controller('MainCtrl', [
        '$scope',
        'identity',
        function ($scope, identity) {
            $scope.hasLoggedUser = identity.hasLoggedUser;
        }]);