'use strict';

app.controller('globalCtrl', function ($scope, $rootScope, $filter, Data, $route, $routeParams, $location, $mdSidenav, $mdDialog) {

    $scope.locationAbsUrl = $location.absUrl();
    $scope.locationUrl = $location.url();
    $scope.locationPath = $location.path();
    $scope.locationHash = $location.hash();
    $scope.blured = false;


    $rootScope.go = function(url){
        url != $location.url() ? $location.url(url) : $rootScope.showNoty('warning', 'Вы уже на этой странице');
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



    //title - заголовок для big vxEdit, если его нет, то будет строчное редактирование
    //target - массив вида [tableName,searchId,id,rowName]
    //data - data
    //html - если есть, то wyswig, иначе text
    $rootScope.vxEdit = function(data, target, title, html){
        var body = angular.element(document.body);
        var rc = angular.element('#root-content');
        $mdDialog.show({
            parent: body,
            templateUrl: 'app/vx-edit.html',
            onComplete: function(){

            },
            clickOutsideToClose: false,
            escapeToClose: false,
            controller: function dialogController($rootScope, $scope, $mdDialog, $route){

                $scope.closeDialog = function(){
                    rc.removeClass('vx-blur');
                    $mdDialog.hide();
                    //data = $scope.content;
                    //$scope.$apply(data);
                    //$route.reload();
                    //Data.post('vx-select', {table: target[0], search: {id: target[2]}}).then(function(result){
                    //    result.data[0]);
                    //});

                };

                $scope.content = data;

                $scope.updateData = function(){
                    Data.post('vx-post', {table: target[0], searchId: target[1], id: target[2],row: target[3], data: $scope.content}).then(function (result) {
                        $scope.vxEditResult = result;
                        $rootScope.showNoty(result.status, result.message);
                        data = $scope.content;
                        $scope.closeDialog();
                    });
                };

                $scope.html = html || false;
                $scope.title = title;

                $scope.theme = $rootScope.$siteTheme;
                rc.addClass('vx-blur');
            }
        });
    };

    // table - таблица
    // rows - ряды которые нужны или пусто
    // search - массив для поиска {id: 10} или пусто
    //$rootScope.vxSelect = function(table, where){
    //    Data.post('vx-select', {table: table}).then(function(result){
    //        return result;
    //    });
    //};


    $scope.vxUpdateData = function(updLink, data){ // универсальный апдейтер. ссылка (строка) типа ':tableName/:searchRow/:id' и data - ассоциативный массив {изменяемый ряд => значение}
        Data.post('vx-update-data/' + updLink, data).then(function (result) {
            $scope.vxUpdateResult = result;
            $rootScope.showNoty(result.status, result.message);
        });
    };

    $rootScope.showNoty = function(type, message){
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

    $scope.scroll = '';
    angular.element('#childRoute').on('scroll', function() {
        $scope.scroll = window.pageYOffset || document.documentElement.scrollTop;
    });


    //$scope.setSiteTheme = function(theme){
    //    $mdThemingProvider.setDefaultTheme(theme);
    //};
    //$scope.setSiteTheme($scope.siteSettings[3].value);

});