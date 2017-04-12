App.controller("LoginCtrl", ["$scope", "LocalStorage", "API", function ($scope, LS, API) {
    $scope.Login = function () {
        API.Login($scope.User).then(data => {
            if (data.data.correct) {
                LS.set("User", data.data.user);
                window.location = "/admincp";
                html_resp("Login successfully!", "text-success");
            } else html_resp("Failed to login!", "text-danger")
        }, () => html_resp("Failed to login!", "text-danger"));
    }
    $scope.Register = function () {
        if ($scope.User.password == $scope.User.pass2)
            API.AddUser($scope.User).then(data => {
                LS.set("User", $scope.User);
                window.location = "/admincp";
                html_resp("Register successfully!", "text-success");
            }, () => html_resp("Failed to register!", "text-danger"));
        else html_resp("Failed to register!", "text-danger")
    }
}]);