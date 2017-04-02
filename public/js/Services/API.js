angular.module('Project').factory('API', function ($http) {
    return {
        Employees: $http.get('http://localhost:3685/API/Employees'),
        AddEmp: object => $http.post('http://localhost:3685/API/Employee', object, { headers: { 'Content-Type': 'application/json;charset=utf-8' } }),
        DelEmp: object => $http.post('http://localhost:3685/API/DelEmp', object, { headers: { 'Content-Type': 'application/json;charset=utf-8' } }),
    }
})