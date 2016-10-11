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