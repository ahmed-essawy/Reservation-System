App.controller("ContactCtrl", ["$scope", "API", "LocalStorage", "$location", function ($scope, API, LS, $location) {
    if (LS.get("User"))
        $scope.Contact = LS.get("User");
    $scope.Submit = function () {
        console.log($scope.Contact.name);
        API.SendMsg($scope.Contact).then(data => {
            alert("Thank you\nWe receive your message.");
            $scope.Contact = null;
            $location.path("/home");
            html_resp("Send Message successfully!", "text-success");
        }, () => html_resp("Failed to send Message!", "text-danger"));
    }
}]);