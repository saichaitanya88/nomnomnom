var nom3App = angular.module('nom3App', [
  'ngRoute', 'ngAnimate' ,'nom3Controllers', 'nom3Services'
]);

nom3App.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/', {
      templateUrl: '/assets/partials/index.html',
      controller: 'HomeCtrl',
      title: "Welcome"
    }).
  when('/recipe/:id', {
      templateUrl: '/assets/partials/recipe/index.html',
      controller: 'RecipeCtrl',
      title: "Recipe"
    }).
  // when('/user/update/:id', {
  //     templateUrl: '/assets/partials/users/edit.html',
  //     controller: 'UsersCtrl',
  //     title: "Users"
  //   }).
  // when('/user/create', {
  //     templateUrl: '/assets/partials/users/edit.html',
  //     controller: 'UsersCtrl',
  //     title: "Users"
  //   }).
  // when('/businesses', {
  //     templateUrl: '/assets/partials/businesses/index.html',
  //     controller: 'BusinessCtrl',
  //     title: "Businesses"
  //   }).
  // when('/business/update/:id', {
  //     templateUrl: '/assets/partials/businesses/edit.html',
  //     controller: 'BusinessCtrl',
  //     title: "Users"
  //   }).
  // when('/business/create', {
  //     templateUrl: '/assets/partials/businesses/edit.html',
  //     controller: 'BusinessCtrl',
  //     title: "Users"
  //   }).
  // when('/tasks', {
  //     templateUrl: '/assets/partials/tasks/index.html',
  //     controller: 'TasksCtrl',
  //     title: "Tasks"
  //   }).
  // when('/task/update/:id', {
  //     templateUrl: '/assets/partials/tasks/edit.html',
  //     controller: 'TasksCtrl',
  //     title: "Users"
  //   }).
  // when('/task/create', {
  //     templateUrl: '/assets/partials/tasks/edit.html',
  //     controller: 'TasksCtrl',
  //     title: "Users"
  //   }).
    when('/static/404', {
      templateUrl: '/assets/partials/static/404.html',
      controller: 'StaticCtrl',
      title: "Page Not Found"
    }).
    otherwise({
      redirectTo: '/static/404'
    });
}]);