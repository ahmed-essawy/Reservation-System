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