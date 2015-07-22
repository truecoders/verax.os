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

    if(angular.isDefined($rootScope.user)){

    }else{
        $rootScope.user = {};
    }

    $rootScope.$on("$routeChangeStart", function (event, next, current){ //проверяем сессию(авторизацию) пользователя
        var nextUrl = next.$$route.originalPath;
        Data.get('session').then(function (results){
            if(results.uid){
                if(!$rootScope.user.authenticated){
                    Data.post('user-data', {'uid': results.uid}).then(function(result){
                        if(result.data[0].active) { //если пользователь active
                            $rootScope.user = result.data[0];
                            $rootScope.user.authenticated = true;
                        }else{
                            $rootScope.errorMessage = 'Ваша учетная запись не активна, к сожалению.';
                            $rootScope.go('/error');
                        }
                    });
                }
            }else{

            }
        });
    });

    if(!angular.isDefined($rootScope.siteSettings)){ // достаем настройки сайта из БД на страте
        $rootScope.siteSettings = {};
        Data.get('site-settings').then(function(data){
            angular.forEach(data.settings['data'], function(s, i){
                this[s.setting_name] = s;

            }, $rootScope.siteSettings);
            //angular.forEach(data.customersRoles['data'], function(r, i){
            //    this[r.role_key] = r;
            //},$rootScope.$userRoles);
            $rootScope.$userRoles = data.customersRoles['data'];
            $rootScope.$siteName = $rootScope.siteSettings['siteName'].value;
            $rootScope.$siteLongName = $rootScope.siteSettings['siteLongName'].value;
            $rootScope.$siteTheme = $rootScope.siteSettings['siteTheme'].value;
            $rootScope.$siteDescription = $rootScope.siteSettings['siteDescription'].value;
        });
    }

    $rootScope.timeStamp = new Date();

});

app.config(function($mdThemingProvider){

    $mdThemingProvider.theme('brown')
        .primaryPalette('brown')
        .accentPalette('grey')
        .warnPalette('deep-orange',{
            'default': '800'
        });

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
        .accentPalette('purple',{
            'default': '100'
        });

    $mdThemingProvider.theme('orange')
        .primaryPalette('deep-orange',{
            'default': '900'
        })
        .accentPalette('orange')
        .warnPalette('purple',{
            'default': '800'
        });

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
        .accentPalette('orange')
        .backgroundPalette('blue')
        .dark();

    $mdThemingProvider.alwaysWatchTheme(true);

});
    