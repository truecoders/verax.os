'use strict';



//target - массив вида [tableName,searchId,id,rowName]
//data - data
//html - если есть, то wyswig, иначе text
app.directive('vxEdit', ['$rootScope','Data', function($rootScope, Data){
    var body = angular.element(document.body);
    var rc = angular.element('#root-content');
    return {
        restrict: 'A',
        scope: {
            data: '=',
            target: '=',
            html: '='
        },
        templateUrl: 'app/vx-edit-directive.html',
        replace: true,
        link: function(scope, element, attrs){
            scope.updateData = function(){
                Data.post('vx-post', {table: scope.target[0], searchId: scope.target[1], id: scope.target[2],row: scope.target[3], data: scope.data}).then(function (result) {
                    scope.result = result;
                    scope.edit = false;
                    $rootScope.showNoty(result.status, result.message)
                });
            };
            scope.edit = false;
            scope.html = scope.html || false;
            scope.et = function(){ // toggle переменной для редактирования
                scope.edit ? scope.edit = false : scope.edit = true;
            }
        }
    }
}]);

app.directive('vxEditable', function() {
    //updatefn="vxUpdateData('site_settings/id/' + v.id, {'value': v.value})" // пример updatefn
    return {
        restrict: 'EA',
        scope: {
            vxFn: '&updatefn',
            vxdata: '=data',
            dataType: '@edit'
        },
        template: '<div ng-hide="startEdit" style="border-bottom: 1px dotted;cursor: pointer;" ng-dblclick="startEdit = true;" ng-bind-html="vxdata">{{vxdata ? "" : "ввести"}}</div>'+
        '<span ng-show="startEdit">'+
        '<md-button style="float: right;" class="md-fab md-mini md-warn" ng-click="startEdit=false;"><i class="fa fa-times"></i></md-button>'+
        '<div ng-if="dataType == \'html\'" text-angular ng-model="vxdata"></div>{{vxdata}}'+
        '<input ng-if="dataType != \'html\'" type="text" name="ta" style="width: 100%" ng-model="vxdata" ng-blur="vxFn();startEdit=false;" />'+
        '<md-button style="float: right;" class="md-fab md-mini" ng-click="vxFn();startEdit=false;"><i class="fa fa-pencil-square-o"></i></md-button>'+
        '</span>',
        link: function(scope, element, attrs){
            element.css({
                padding: '0 6px',
                width: '100%'
            });
        }
    };
});

app.directive('onlyNumbers', function() {
    return function(scope, element, attrs) {
        var keyCode = [8,9,13,37,39,46,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,110,190];
        element.bind("keydown", function(event) {
            if($.inArray(event.which,keyCode) == -1) {
                scope.$apply(function(){
                    scope.$eval(attrs.onlyNum);
                    event.preventDefault();
                });
                event.preventDefault();
            }

        });
    };
});

app.directive('focus', function() {
    return function(scope, element) {
        element[0].focus();
    };
});

app.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs, control) {
            var checker = function () {

                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel);

                //get the value of the other password
                var e2 = scope.$eval(attrs.passwordMatch);
                if(e2!=null)
                    return e1 == e2;
            };
            scope.$watch(checker, function (n) {
                //set the form control to valid if both
                //passwords are the same, else invalid
                control.$setValidity("passwordNoMatch", n);
            });
        }
    };
}]);

app.directive('animateOnChange', function($animate) {
  return function(scope, elem, attr) {
      scope.$watch(attr.animateOnChange, function(nv,ov) {
        if (nv!=ov) {
              var c = 'change-up';
              $animate.addClass(elem,c, function() {
              $animate.removeClass(elem,c);
          });
        }
      });  
  };
});


app.directive('fileChange', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            var fileChangeHandler = scope.$eval(attrs.fileChange);
            element.bind('change', fileChangeHandler);
        }
    };
});

app.directive('vxDraggable', ['$document', function($document) {
    return {
        link: function(scope, element, attr) {
            var startX = 0, startY = 0, x = 0, y = 0;

            element.css({
                position: 'relative',
                border: '1px solid red',
                backgroundColor: 'lightgrey',
                cursor: 'pointer'
            });

            element.on('mousedown', function(event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left:  x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        }
    };
}]);