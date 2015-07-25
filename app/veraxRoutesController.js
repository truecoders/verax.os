'use strict';

app.controller('veraxRoutesController', function ($scope, $rootScope, $filter, Data, $route, $routeParams, $location, $mdSidenav, $mdDialog) {
    $scope.veraxRouteCollection = {}; // массив для заполнения в контроллере

    $scope.veraxRoutes = {}; // коллекция форматированных роутов. Работать во фронтэнде нужно с этим массивом

// partials должны быть в папке admin
    $scope.veraxRouteCollection.admin = { // location.path - admin. Если корневая, то veraxRootUrl
        start: {
            id: 0, name: 'Настройки', theme: 'teal', child:{ // страница в папке admin/start/admin-start.html
                settings: {id: 0, name: 'Основные настройки'}, // страница admin/start/settings/admin-start-settings.html
                themes: {id:1, name: 'Темы'},
                routes: {id:2, name: 'Routes(разделы сайта)'}
            }
        },
        products: {
            id: 1, name: 'Товары', theme: 'brown', child:{
                all:{id: 0, name: 'Все товары'},
                categories:{id: 1, name: 'Категории товаров'},
                'import':{id: 2, name: 'Импорт товаров'},
                'export':{id: 3, name: 'Прайс лист и экспорт'},
                senders:{id: 4, name: 'Поставщики'}
            }
        },
        blog: {
            id: 2, name: 'Блог', theme: 'orange', child: {
                all: {id: 0, name: 'Все записи'},
                'new-post': {id: 1, name: 'Новая запись'}
            }
        },
        forum: {
            id: 3, name: 'Форум', theme: 'purple'
        },
        users: {
            id: 4, name: 'Пользователи', theme: 'green'
        },
        help: {
            id: 5, name: 'Помощь', theme: 'blue'
        }
    };

    $scope.veraxRouteCollection.on = {
        'start': {
            id: 0, name: 'Информация', theme: 'teal', child:{
                activity: {id: 0, name: 'Сводка новостей'},
                about: {id: 1, name: 'О сайте'}
            }
        },
        'products': {
            id: 1, name: 'Магазин', theme: 'brown', child:{
                popular:{id: 0, name: 'Популярные товары'},
                all:{id: 1, name: 'Все товары'},
                discount:{id: 2, name: 'Акции'}
            }
        },
        'blog': {
            id: 2, name: 'Блог', theme: 'orange'
        },
        'forum': {
            id: 3, name: 'Форум', theme: 'purple'
        },
        'user': {
            id: 4, name: 'Личный кабинет', theme: 'green'
        },
        'help': {
            id: 5, name: 'Помощь', theme: 'blue'
        }
    };


    // превращаем $scope.veraxRouteCollection в $scope.veraxRoutes
    // добавляя в массив url и адреса страниц-partials.
    function doFormattedVeraxRoutes(){
        angular.forEach($scope.veraxRouteCollection, function(mainRoute, mainKey){
            mainKey == 'veraxRootUrl' ? mainKey = '' : '';
            var formatted = {};
            angular.forEach(mainRoute, function(route, routeKey){
                var mainUrl = mainKey + '/' + routeKey;
                var mainPartial = 'app/' + mainKey + '/' + routeKey + '/' + mainKey + '-' + routeKey + '.html';
                var child = route.child || false;
                if(child){ //если есть дочерние направления
                    var allChildes = {};
                    angular.forEach(child, function(r, rKey){
                        var cUrl = mainUrl + '/' + rKey;
                        var cPartial = 'app/' + mainKey + '/' + routeKey + '/' + rKey + '/' + mainKey + '-' + routeKey + '-' + rKey + '.html';
                        allChildes[rKey] = {id: r.id, name: r.name, url: cUrl, partial: cPartial};
                    });
                }else{
                    var allChildes = false;
                }
                this[routeKey] = {id: route.id, name: route.name, theme: route.theme, url: mainUrl, partial: mainPartial, child: allChildes};
            }, formatted);
            this[mainKey] = formatted;
        }, $scope.veraxRoutes)
    }

    doFormattedVeraxRoutes();

    // работа с идентификацией содержимого в зависимости от URL
    $scope.routeParams = $routeParams;
    $scope.urlStr = $location.url();
    var urlStr = $location.url(); // достаем значения адресной строки для маршрутизации
    urlStr = urlStr[0] == '/' ? urlStr.slice(1) : urlStr;
    urlStr = urlStr.charAt(urlStr.length) == '/' ? urlStr.slice(urlStr.length) : urlStr;
    $scope.urlObj = urlStr.split('/');

     var currentRootRout = $scope.urlObj[0] || 'veraxRootUrl'; // вычисляем главный маршрут forum или products, например
    var currentMainRout = $scope.urlObj[1] || false;
    var currentChildRout = $scope.urlObj[2] || false;

    $scope.activeMainRouteId = 0;
    $scope.activeChildRouteId = 0;

    if(currentRootRout in $scope.veraxRoutes){
        var rootRoute = $scope.veraxRoutes[currentRootRout];
        console.log('currentRootRout - ' + currentRootRout);
        if(currentMainRout in rootRoute){
            var mainRoute = rootRoute[currentMainRout];
            console.log('currentMainRout - ' + currentMainRout);
            $scope.activeMainRouteId = mainRoute.id;
            if(mainRoute.child){
                if(currentChildRout in mainRoute.child){
                    console.log('currentChildRout - ' + currentChildRout);
                    $scope.activeChildRouteId = mainRoute.child[currentChildRout].id;
                }
            }
        }else{
            $rootScope.errorMessage = 'Ошибка доступа. Раздел сайта "'+ currentMainRout +'" неактивен, был удален или никогда не существовал';
            $location.url('/error');
        }
    }else{
        $rootScope.errorMessage = 'Ошибка доступа. Раздел сайта "'+ currentRootRout +'" неактивен, был удален или никогда не существовал';
        $location.url('/error');
    }

    // работа после выбора роута
    $scope.routeOnSelect = function(route, parentRoute){
        $rootScope.breadCrumbs = parentRoute ? parentRoute.name + ' / ' + route.name : route.name;
        $rootScope.mainRouteContentPartial = parentRoute ? parentRoute.partial : route.partial;
        $rootScope.$siteTheme = !parentRoute ? route.theme : $rootScope.$siteTheme;
        if($location.url() != route.url){
            $scope.setUrlNotReload(route.url);
        }
    };

    var original = $location.path;  //костыли для НЕперезагрузки контроллера при смене location.path
    $scope.setUrlNotReload = function (path) {
        var lastRoute = $route.current;
        var un = $rootScope.$on('$locationChangeSuccess', function () {
            $route.current = lastRoute;
            un();
        });
        return original.apply($location, [path]);
    };

});