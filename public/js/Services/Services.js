App.factory('API', ["$http", function ($http) {
    return {
        Employees: $http.get('http://localhost:3685/API/Employees'),
        AddEmp: object => $http({ method: 'POST', url: 'http://localhost:3685/API/Employee', data: object, headers: { "Content-Type": "application/json;charset=utf-8" } }),
        EditEmp: object => $http({ method: 'PUT', url: 'http://localhost:3685/API/Employee', data: object, headers: { "Content-Type": "application/json;charset=utf-8" } }),
        DelEmp: object => $http({ method: 'DELETE', url: 'http://localhost:3685/API/Employee', data: object, headers: { "Content-Type": "application/json;charset=utf-8" } }),
        Login: object => $http({ method: 'POST', url: 'http://localhost:3685/API/Login', data: object, headers: { "Content-Type": "application/json;charset=utf-8" } }),
        AddUser: object => $http({ method: 'POST', url: 'http://localhost:3685/API/User', data: object, headers: { "Content-Type": "application/json;charset=utf-8" } }),
        EditUser: object => $http({ method: 'PUT', url: 'http://localhost:3685/API/User', data: object, headers: { "Content-Type": "application/json;charset=utf-8" } }),
        SendMsg: object => $http({ method: 'POST', url: 'http://localhost:3685/API/Message', data: object, headers: { "Content-Type": "application/json;charset=utf-8" } })
    }
}]);
App.factory('LocalStorage', ['$rootScope', function ($rootScope) {
    return {
        set: (key, value) => {
            delete value.password; delete value.pass2;
            localStorage.setItem(key, JSON.stringify(value));
        },
        get: key => JSON.parse(localStorage.getItem(key))
    }
}]);