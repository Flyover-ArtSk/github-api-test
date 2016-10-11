angular
    .module('repoList')
    .directive('list', ListDirective);

/* @ngInject */
function ListDirective() {
    return {
        templateUrl: 'list.html'
    }
}