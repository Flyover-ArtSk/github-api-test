angular
    .module('repoList')
    .controller('ListController', ListController);

/* @ngInject */
function ListController($scope, ListService) {
    $scope.items = [];
    $scope.waitToData = false;

    var lastIndex = 0;
    var data = [];

    var addItems = function() {
        for(var i = 0; i < 50; i++){
            if(!data[i]) break;
            $scope.items.push(data[i]);
            data.slice(0, 1);
        }
        $scope.waitToData = false;
    }

    $scope.loadMore = function() {
        if ($scope.waitToData) return;
        $scope.waitToData = true;

        if(data.length == 0){
            ListService.getData(lastIndex).then(function(response){
                data = response.data;
                lastIndex = response.data[response.data.length - 1].id;
                addItems();
            });
        }else{
            addItems();
        }
    }
}