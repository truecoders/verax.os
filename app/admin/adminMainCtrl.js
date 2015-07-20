app.controller('adminMainCtrl', function ($rootScope, $scope, $location, $filter, Data) {

    if(!$rootScope.user.authenticated === true && !$rootScope.user.role == 0){
        $location.path('/on/start');
    }

});