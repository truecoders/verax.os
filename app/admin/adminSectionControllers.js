app.controller('adminMainCtrl', function ($rootScope, $scope, $location, $filter, Data) {

    if($rootScope.user.role === 0){

    }else{
        //$rootScope.errorMessage = 'У вас нет права доступа к данному разделу сайта.'
        //$rootScope.go('/error');
    }

});

app.controller('adminBlogCtrl', function ($rootScope, $scope, $location, $filter, Data) {

    $scope.blogPosts = {};

    Data.post('select', {table: 'blog_posts'}).then(function(result){
        angular.forEach(result.data, function(post, i){
            this[post.id] = post;
        }, $scope.blogPosts);
    });

});