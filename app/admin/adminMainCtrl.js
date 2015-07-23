app.controller('adminMainCtrl', function ($rootScope, $scope, $location, $filter, Data) {

    if($rootScope.user.authenticated === true && $rootScope.user.role == 0){

    }else{
        $rootScope.errorMessage = 'У вас нет права доступа к данному разделу сайта...'
        $rootScope.go('/error');
    }

});