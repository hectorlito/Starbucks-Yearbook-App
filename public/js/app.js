const app = angular.module('starbucks_app', []);

app.controller('MainController', ['$http', function($http) {


  this.user = {};
  this.registerForm = {};
  this.loginForm = {};
  this.logged = false; //if true, add, edit and delete buttons will appear
  this.baristas = []; //this array will hold all barista information
  this.regulars = []; //this array will hold all regular information

  //LOGIN
  this.login = () => {
    $http({
      method: '/post',
      url: '/sessions/login',
      data: this.loginForm
    }).then(response => {
      console.log(response.data);
      this.user = response.data;
      this.logged = true;
    }).catch(err => console.error('Catch:', err.message));
  }

  //REGISTER
  this.register = () => {
    $http({
      method: 'post',
      url: '/users',
      data: this.registerForm
    }).then(response => {
      console.log(response.data);

      this.user = response.data;
      this.logged = true;
    }).catch( err => console.error('Catch:', err.message));
  }

  //CHECK TO SEE IF USER IS LOGGED IN
  $http({
    method: 'get',
    url: '/sessions'
  }).then(response => {
    if (response.data.user) {
      this.user = response.data.user;
      console.log(this.user);
      this.logged = true;
    }
  }).catch(err => console.error('Catch:', err.message));

  //LOAD ALL BARISTA INFORMATION
  this.getBaristas = () => {
    $http({
      method: 'get',
      url: '/baristas'
    }).then(response => {
      console.log(response.data);
      this.baristas = response.data;
    })catch(err => console.error('Catch:', err));
  }

  this.getBaristas();

  //LOAD ALL REGULARS INFORMATION
  this.getRegulars = () => {
    $http({
      method: 'get',
      url: '/regulars'
    }).then(response => {
      console.log(response.data);
      this.regulars = response.data;
    }).catch(err => console.error('Catch:', err));
  }

  this.getRegulars();

}]);
