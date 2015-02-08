'use strict';

angular.module( 'sillypointAngularNodeApp' )
    .controller( 'MainCtrl', [ '$scope', '$location', '$window', '$http', 
                    function( $scope, $location, $window, $http ) {

        $http.get('http://localhost:3001/scrape').
        success(function(data) {
            $scope.scores = data;
        });

        $scope.redirect = function( path ) {
            console.log('attempting to redirect to ' + path );
//            $location.path( path );
            $window.location.href = path;
        };

    }]);
