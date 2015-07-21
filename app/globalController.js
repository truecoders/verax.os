'use strict';

app.controller('globalCtrl', function ($scope, $rootScope, $filter, Data, $route, $routeParams, $location, $mdSidenav, $mdDialog) {

    $scope.locationAbsUrl = $location.absUrl();
    $scope.locationUrl = $location.url();
    $scope.locationHost = $location.host();
    $scope.locationPath = $location.path();
    $scope.locationHash = $location.hash();
    $scope.blured = false;


    $rootScope.go = function(url){
        url != $location.url() ? $location.url(url) : $scope.showNoty('warning', 'Вы уже на этой странице');
    };

    $scope.siteThemes = [
        'default', 'blue','purple', 'orange', 'ello', 'brown', 'teal', 'red', 'amber', 'green', 'grey'
    ];

    $scope.toggleLeftSidebar = function(){
        $mdSidenav('left').toggle();
        $scope.bluredToggle();
    };
    $scope.toggleRightSidebar = function(){
        $mdSidenav('right').toggle();
        $scope.bluredToggle();
    };

    $scope.bluredToggle = function(){
        //$scope.blured ? $scope.blured = false : $scope.blured = true;
    };

    $rootScope.showDialog = function(title, content){
        var body = angular.element(document.body);
        $mdDialog.show({
            parent: body,
            templateUrl: 'app/md-dialog-big.html',
            onComplete: function(){

            },
            clickOutsideToClose: false,
            controller: function dialogController($rootScope, $scope, $mdDialog){
                $scope.closeDialog = function(){
                    $mdDialog.hide();
                };
                $scope.title = title;
                $scope.content = content;
                $scope.theme = $rootScope.$siteTheme;
                angular.element('#ng-view').addClass('vx-blur');
                $scope.disableBlur = function(){
                    angular.element('#ng-view').removeClass('vx-blur');
                };
            }
        });
    };


    $scope.vxUpdateData = function(updLink, data){ // универсальный апдейтер. ссылка (строка) типа ':tableName/:searchRow/:id' и data - ассоциативный массив {изменяемый ряд => значение}
        Data.post('vx-update-data/' + updLink, data).then(function (result) {
            $scope.vxUpdateResult = result;
            $scope.showNoty(result.status, result.message);
        });
    };

    $scope.showNoty = function(type, message){
        var hd, title, toastClass, cm, icon;
        if(type == 'error'){
            toastClass = 'md-warn'; title = "Ошибка!"; hd = false; cm = '<span title="'+ type +'">Произошла ошибка!!! :(</span>';
            icon = 'error_outline';
            console.error(message);
        }else if(type == 'warning'){
            toastClass = 'md-accent'; title = "Предупреждение!"; hd = 5000; cm = '<span title="'+ type +'">Данные НЕ обновлены!</span>';
            icon = 'warning';
            console.warn(message);
        }else if(type == 'success'){
            toastClass = 'md-primary'; title = "Успешно!"; hd = 2500; cm = '<span title="'+ type +'">Данные успешно обновлены! </span>';
            icon = 'check';
            console.info(message);
        }
        noty({
            type: type,
            theme: false,
            template: '<md-card class="md-whiteframe-z3" layout="column"><md-card-content>'+
            '<md-button flex class="'+ toastClass +' md-button md-'+ $rootScope.$siteTheme +'-theme md-title">'+ title +
            '<md-button flex aria-label="noty" class="md-fab md-'+ $rootScope.$siteTheme +'-theme '+ toastClass +'"><i class="material-icons">'+ icon +'</i></md-button>' +
            '</md-button>'+
            '<h3 flex class="md-title '+ toastClass +'">'+ message +'</h3>'+
            '</md-card-content></md-card>',
            speed: 200,
            timeout: hd
        });
    };

    //$scope.setSiteTheme = function(theme){
    //    $mdThemingProvider.setDefaultTheme(theme);
    //};
    //$scope.setSiteTheme($scope.siteSettings[3].value);

});