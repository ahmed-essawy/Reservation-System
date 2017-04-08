App.factory('API', function ($http) {
    return {
        Employees: $http.get('http://localhost:3685/API/Employees'),
        AddEmp: object => $http({ method: 'POST', url: 'http://localhost:3685/API/Employee', data: object, headers: { "Content-Type": "application/json;charset=utf-8" } }),
        EditEmp: object => $http({ method: 'PUT', url: 'http://localhost:3685/API/Employee', data: object, headers: { "Content-Type": "application/json;charset=utf-8" } }),
        DelEmp: object => $http({ method: 'DELETE', url: 'http://localhost:3685/API/Employee', data: object, headers: { "Content-Type": "application/json;charset=utf-8" } })
    }
})