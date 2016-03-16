var viewerApp = angular.module("viewerApp", []);

viewerApp.controller("mainCtrl", function($scope, $http) {
    $scope.teamText = "";
    $scope.messages = [];

    var seeds = [];

    $http.get('static/assets/preds.json').then(function (res) {
        seeds = res.data["seeds"];
        var u = {},
            team = "";

        var keys = ["team_one", "team_two"];
        for (var i = 0; i < seeds.length; i++) {
            for (var j = 0; j < keys.length; j++) {
                team = seeds[i][keys[j]];
                if (u.hasOwnProperty(team)) {
                    continue;
                }
                u[team] = 1;
            }
        }
    });

    var wordInPrediction = function(words, gameData) {
        for (var j=0; j<words.length; j++){
            var hasThisWord = false;
            if (gameData['team_one'].toLowerCase().indexOf(words[j]) >= 0){
                hasThisWord = true;
            } else if (gameData['team_two'].toLowerCase().indexOf(words[j]) >= 0){
                hasThisWord = true;
            }
            if (!hasThisWord){
                return false
            }

        }
        return true
    };

    $scope.updateMessages = function () {
        $scope.messages = [];
        if ($scope.teamText.length === 0){
            return
        }
        var words = $scope.teamText.toLowerCase().split(" ");
        for (var i=0; i<seeds.length; i++){
            if (wordInPrediction(words, seeds[i])){
                $scope.messages.push(makeMessage(seeds[i]))
            }
        }
    };

    var makeMessage = function(gameData){
        var pred = gameData["prediction"],
            winner = "",
            loser = "",
            prefix = "",
            suffix = ".";
        if(pred > 50) {
            winner = gameData["team_one"];
            loser = gameData["team_two"];
        } else {
            winner = gameData["team_two"];
            loser = gameData["team_one"];
            pred = 100 - pred;
        }
        if(winner == "(4) Duke"){
            prefix = "Unfortunately, ";
        } else if (winner === "(1) North Carolina") {
            suffix = ". Go Heels!";
        } else if (winner === "(6) Notre Dame") {
            suffix = ". Go Irish!";
        }
         return prefix + winner + " has a " + pred.toFixed(1) + "% chance of beating " + loser + suffix
    };

    $scope.updateMessages();
});
