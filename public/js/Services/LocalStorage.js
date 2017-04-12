App.factory('LocalStorage', ['$rootScope', function ($rootScope) {
    return {
        set: (key, value) => {
            delete value.password; delete value.pass2;
            localStorage.setItem(key, JSON.stringify(value));
        },
        get: key => JSON.parse(localStorage.getItem(key))
    }
}]);