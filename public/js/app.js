angular.module("Project", ["ngRoute"])
    .config(($routeProvider, $locationProvider) => {
        $routeProvider.when("", { templateUrl: "", controller: "" }).otherwise({ redirectTo: "" });
        $locationProvider.hashPrefix('');
    });