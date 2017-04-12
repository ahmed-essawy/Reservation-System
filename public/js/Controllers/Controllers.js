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
App.controller("CPHomeCtrl", ["$scope", "$filter", "API", function ($scope, $filter, API) {
    API.Employees.then(data => $scope.Employees = data.data, () => html_resp("Failed Retrieving Employees!", "text-danger"))

    $scope.addNewEmp = function () {
        API.AddEmp($scope.formData).then(data => {
            $scope.Employees.push(data.data[0]);
            $scope.formData = "";
            html_resp("Employee added successfully!", "text-success");
        }, () => html_resp("Failed Adding Employee!", "text-danger"));
    }
    $scope.editEmp = function (index, id) {
        if ($("#" + id + " a.btn-info").text() == "Edit") {
            $("#" + id + " .inputs").removeAttr("readonly").toggleClass("inputs").toggleClass("temp-inputs");
            $("#" + id + " a.btn-info").text("Save");
        }
        else if ($("#" + id + " a.btn-info").text() == "Save") {
            var user = {
                "_id": id[0][0],
                "name": $("#" + id + " input[name=name]").val(),
                "dept": $("#" + id + " input[name=dept]").val(),
                "joinDate": $("#" + id + " input[name=joinDate]").val(),
                "salary": $("#" + id + " input[name=salary]").val(),
                "eval": $("#" + id + " input[name=eval]").val()
            };
            API.EditEmp(user).then(data => {
                $("#" + id + " .temp-inputs").attr("readonly", true).toggleClass("inputs").toggleClass("temp-inputs");
                $("#" + id + " a.btn-info").text("Edit");
                $scope.Employees[index] = data.config.data;
                $("#" + id + " a.btn-info").text("Edit");
                html_resp("Employee edited successfully!", "text-success");
            }, () => html_resp("Failed Editing Employee!", "text-danger"));
        }
    }
    $scope.delEmp = function (id) { API.DelEmp({ _id: id[0][0] }).then(() => html_resp("Employee deleted successfully!", "text-success"), () => html_resp("Failed deleting Employee!", "text-danger")); }

    $scope.sorting = (pattern) => {
        pattern = ($scope.sign = $scope.sign == "+" ? "-" : "+") + pattern;
        $scope.Employees = $filter("orderBy")($scope.Employees, pattern);
    }
}]);
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