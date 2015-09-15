var demoApp = angular.module('demoApp', [
    'ngRoute'
]);

demoApp.config(function ($routeProvider) {
    'use strict';
    $routeProvider
        .when('/demo',
            {
                controller: 'DemoController',
                templateUrl: 'public/demo.html'
            })
        .otherwise({ redirectTo: '/demo' });
});

demoApp.controller('DemoController', function ($scope, $http) {
    'use strict';
    $scope.users = [];

    function init() {
        //$scope.users.push({name: 'steli'});
        $http.get('/api/listUsers').
            success (function (users) {
                $scope.users = users;
            });
    }
    init();

    $scope.addUser = function () {
        $scope.users.push({name: $scope.User});
        $http.post('/api/createUser', {
            name: $scope.User
        }).success (function (user) {
            $scope.User = '';
        });
    };

    $scope.deleteUser = function($index) {
        var deletedElemName = $scope.users.splice($index, 1)[0].name;
        $http.delete('/api/deleteUser/' + deletedElemName).
            success (function (user) {
                $scope.User = '';
        });
    };

});
