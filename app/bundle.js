angular.module('repoList', ['infinite-scroll'])

    .constant('appConfig', {
        apiBaseUrl: 'https://api.github.com',
    })
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
angular
    .module('repoList')
    .directive('list', ListDirective);

/* @ngInject */
function ListDirective() {
    return {
        template:'<div infinite-scroll="loadMore()" infinite-scroll-disabled="waitToData" infinite-scroll-distance="3" class="list-group"><div ng-repeat="item in items track by $index" class="list-group-item"><img src="{{item.owner.avatar_url}}" class="avatar pull-left"><h4 class="list-group-item-heading">{{item.name}}</h4><p class="full-name">{{item.full_name}}</p><hr><div class="list-group-item-text"><p>{{item.description}}</p><a href="{{item.html_url}}" target="_blank" class="btn btn-primary btn-block"><span class="glyphicon glyphicon-social-github" aria-hidden="true"></span> View on GitHub</a></div></div></div>'
    }
}
angular
    .module('repoList')
    .factory('ListService', ListService);

/* @ngInject */
function ListService($http, appConfig) {
    return {
        getData: getData
    };

    function getData(lastIndex) {
        return $http.get(appConfig.apiBaseUrl + '/repositories?since=' + lastIndex);
    }
}