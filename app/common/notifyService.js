angular.module('issueTracker.common.notifyService', [])
    .factory('notifyService', [function(){
        function showInfo(msg){
            noty({
                text: msg,
                type: 'success',
                layout: 'topCenter',
                timeout: 1000
            })
        }

        function showError (msg, serverError){
            var errors = [];
            if (serverError && serverError.data.error_description) {
                errors.push(serverError.data.error_description);
            }
            if (serverError && serverError.data.Message) {
                errors.push(serverError.data.Message);
            }
            if (serverError && serverError.data.ModelState) {
                var modelStateErrors = serverError.data.ModelState;
                for (var propertyName in modelStateErrors) {
                    var errorMessages = modelStateErrors[propertyName];
                    var trimmedName =
                        propertyName.substr(propertyName.indexOf('.') + 1);
                    for (var i = 0; i < errorMessages.length; i++) {
                        var currentError = errorMessages[i];
                        errors.push(trimmedName + ' - ' + currentError);
                    }
                }
            }
            if (errors.length > 0) {
                msg = msg + ":<br>" + errors.join("<br>");
            }
            noty({
                text: msg,
                type: 'error',
                layout: 'topCenter',
                timeout: 5000}
            );
        }

        return{
            showInfo: showInfo,
            showError: showError
        }
    }]);