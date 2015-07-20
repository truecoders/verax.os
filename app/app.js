var app = angular.module('verax', ['ngRoute', 'ngAnimate', 'ngMaterial', 'toaster']);

app.config(['$routeProvider', '$locationProvider',//рабочие роуты
  function($routeProvider, $locationProvider) {
      $routeProvider
          .when('/', {
              redirectTo: 'on/start'
            })
          .when('/admin/:mainRoute', {
                title: 'Админка',
                templateUrl: 'app/admin/admin-index.html',
                controller: 'globalCtrl'
            })
          .when('/admin/:mainRoute/:childRoute', {
                title: 'Админка',
                templateUrl: 'app/admin/admin-index.html',
                controller: 'globalCtrl'
            })
          .when('/on/:mainRoute', {
                title: 'Клиент',
                templateUrl: 'app/on/client-index.html',
                controller: 'globalCtrl'
            })
          .when('/on/:mainRoute/:childRoute', {
                title: 'Клиент',
                templateUrl: 'app/on/client-index.html',
                controller: 'globalCtrl'
            })
          .when('/error', {
                title: 'Ошибка',
                templateUrl: 'app/error.html'
            })
          .otherwise({
          redirectTo: '/on/start'
          });
      $locationProvider.html5Mode(false).hashPrefix("!");
}]);

app.run(function ($rootScope, $route, $location, Data, $templateCache) {

    angular.isDefined($rootScope.user) ? '' : $rootScope.user = {};

    $rootScope.$on("$routeChangeStart", function (event, next, current){ //проверяем сессию(авторизацию) пользователя
        var nextUrl = next.$$route.originalPath;
        Data.get('session').then(function (results){
            if(results.uid){
                if(!$rootScope.user.authenticated){
                    Data.post('user-data', {'uid': results.uid}).then(function(result){
                        $rootScope.user = result.data[0];
                        $rootScope.user.authenticated = true;
                    });
                }
            }else{

            }
        });
    });

    if(!angular.isDefined($rootScope.siteSettings)){ // достаем настройки сайта из БД на страте
        $rootScope.siteSettings = {};
        Data.get('site-settings').then(function(data){
            angular.forEach(data.data, function(s, i){
                this[s.setting_name] = s;

            }, $rootScope.siteSettings);
            $rootScope.$siteName = $rootScope.siteSettings['shortName'].value;
            $rootScope.$siteLongName = $rootScope.siteSettings['longName'].value;
            $rootScope.$siteTheme = $rootScope.siteSettings['siteTheme'].value;
        });
    }

    $rootScope.timeStamp = new Date();

});

app.config(function($mdThemingProvider){

    $mdThemingProvider.theme('brown')
        .primaryPalette('brown')
        .accentPalette('grey');

    $mdThemingProvider.theme('brown-dark')
        .primaryPalette('brown')
        .accentPalette('grey')
        .dark();

    $mdThemingProvider.theme('blue')
        .primaryPalette('blue',{
            'default': '700'
        })
        .accentPalette('light-blue');

    $mdThemingProvider.theme('purple')
        .primaryPalette('deep-purple')
        .accentPalette('purple');

    $mdThemingProvider.theme('orange')
        .primaryPalette('deep-orange')
        .accentPalette('orange');

    $mdThemingProvider.theme('teal')
        .primaryPalette('teal')
        .accentPalette('green');

    $mdThemingProvider.theme('red')
        .primaryPalette('red')
        .accentPalette('pink')
        .warnPalette('deep-purple');

    $mdThemingProvider.theme('amber')
        .primaryPalette('amber')
        .accentPalette('lime')
    .warnPalette('deep-orange');

    $mdThemingProvider.theme('green')
        .primaryPalette('green')
        .accentPalette('light-green');

    $mdThemingProvider.theme('grey')
        .primaryPalette('grey')
        .accentPalette('blue-grey');

    $mdThemingProvider.theme('ello', 'default')
        .primaryPalette('yellow')
        .dark();

    $mdThemingProvider.alwaysWatchTheme(true);

});
    