app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, $route) {
    $scope.login = {};
    $scope.signup = {};
    $rootScope.user = {};
    $scope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $route.reload();
            }
            $scope.showNoty(results.status, results.message);
        });
    };
    $scope.signup = {email:'',password:'',name:'',phone:'',address:'',role:'1'};
    $scope.signUp = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $route.reload();
            }
            $scope.showNoty(results.status, results.message);
        });
    };
});

app.controller('logoutCtrl', function ($scope,$rootScope ,$location, Data, $route) {
    $scope.logout = function () {
        $rootScope.user = {};
        $rootScope.user.authenticated = false;
        Data.get('logout').then(function (results) {
            $scope.showNoty(results.status, results.message);
            $location.path('/', true);
        });
    };
});