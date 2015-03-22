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
