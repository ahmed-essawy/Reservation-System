var App = angular.module("Cpanel", ["ngRoute"]);
App.config(function ($routeProvider, $locationProvider, $interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
    $routeProvider
        .when("/", { templateUrl: "/admincp", controller: "CPHomeCtrl", activeactivetab: "CPanel" })
        .when("/profile", { templateUrl: "/profile", controller: "ProfileCtrl", activeactivetab: "Profile", caseInsensitiveMatch: true })
        .when("/permission", { template: "<h2 class=\"text-center alert alert-danger\">You don't have permission to view this page.</h2>" })
        .otherwise({ redirectTo: "/permission" })
    $locationProvider.html5Mode({ enabled: true, requireBase: true }).hashPrefix("")
});