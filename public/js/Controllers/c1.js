angular.module("Project").controller("HomeCtrl", ["$scope", "$filter", "API", function ($scope, $filter, API) {
    API.Employees.then(data => $scope.Employees = data.data, () => { })
    $scope.joinDate = new Date();

    $scope.addNewEmp = function () {
        API.AddEmp($scope.formData).then(() => {
            $scope.Employees.push($scope.formData);
            $scope.formData = "";
            $scope.formData.joinDate = new Date();
        }, () => { })
    }
    $scope.editEmp = function () {/*
        API.editEmp($scope.formData).then(() => {
            $scope.Employees.push($scope.formData);
            $scope.formData = "";
            $scope.formData.joinDate = new Date();
        }, () => { })*/
    }
    $scope.delEmp = function (index) { API.DelEmp($scope.Employees[index]); }

    $scope.sorting = (pattern) => {
        pattern = ($scope.flag = $scope.flag == "+" ? "-" : "+") + pattern;
        $scope.Employees = $filter("orderBy")($scope.Employees, pattern);
    }
}]);