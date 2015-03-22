'use strict';

angular.module( 'sillypointAngularNodeApp', [ 'ui.bootstrap'])
    .config( [ '$routeProvider', '$locationProvider', function ( $routeProvider, $locationProvider ) {
        $routeProvider
        .when( '/', {
            // @todo fix this
            templateUrl: 'views/livescores.html',
            controller: 'MainCtrl'
        })
        .when( '/about', {
            // @todo fix this
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        })
        .when( '/contact', {
            // @todo fix this
            templateUrl: 'views/contact.html',
            controller: 'AboutCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode( true );
    }]);
