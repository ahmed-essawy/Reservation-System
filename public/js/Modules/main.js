var App = angular.module("Main", ["ngRoute"]);
App.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", { templateUrl: "/home", activeactivetab: "Home" })
        .when("/home", { templateUrl: "/home", activeactivetab: "Home" })
        .when("/login", { templateUrl: "/login", controller: "LoginCtrl", activeactivetab: "Login", caseInsensitiveMatch: true })
        .when("/register", { templateUrl: "/register", controller: "LoginCtrl", activeactivetab: "Register", caseInsensitiveMatch: true })
        .when("/about", { templateUrl: "/about", activeactivetab: "About", caseInsensitiveMatch: true })
        .when("/contact", { templateUrl: "/contact", controller: "ContactCtrl", activeactivetab: "Contact", caseInsensitiveMatch: true })
        .when("/admincp/profile", { template: "<meta http-equiv=\"refresh\" content=\"0; url=/admincp/#/profile\" />" })
        .when("/404", { template: "<h2 class=\"text-center alert alert-danger\">Page not found.</h2>" })
        .otherwise({ redirectTo: "/404" })
    $locationProvider.html5Mode({ enabled: true }).hashPrefix("");
}]);