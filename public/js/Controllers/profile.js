App.controller("ProfileCtrl", ["$scope", "LocalStorage", "API", function ($scope, LS, API) {
    $scope.User = LS.get("User");
    $scope.Submit = function () {
        if ($scope.User.password == $scope.User.pass2) {
            API.EditUser($scope.User).then(data => {
                LS.set("User", $scope.User);
                html_resp("Edit User successfully!", "text-success");
            },
                () => html_resp("Failed edit User!", "text-danger"));
        } else {
            html_resp("Failed edit User!", "text-danger");
        }
    }
}]);