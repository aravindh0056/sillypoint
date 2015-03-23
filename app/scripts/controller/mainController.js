'use strict';

angular.module( 'sillypointAngularNodeApp' )
    .controller( 'MainCtrl', [ '$scope', '$location', '$window', '$http', 
                    function( $scope, $location, $window, $http ) {

        $scope.key = false;

        $http.get('http://localhost:3001/livescore').
        success(function(data) {
            $scope.scores = data;
            $scope.refreshScorecard(data[0]);
            $scope.key = true;
        });

        $scope.redirect = function( path ) {
            console.log('attempting to redirect to ' + path );
//            $location.path( path );
            $window.location.href = path;
        };

        $scope.refreshScorecard = function( score ) {
            $scope.innings1 = {
                batting : score.innings1Batting,
                bowling : score.innings1Bowling
            }

            $scope.innings2 = {
                batting : score.innings2Batting,
                bowling : score.innings2Bowling
            }
        }
    }])
    .controller( 'AboutCtrl', [ '$scope', '$location', '$window', '$http', 
                    function( $scope, $location, $window, $http ) {

    }])
