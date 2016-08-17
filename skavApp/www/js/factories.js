'use strict';

'use strict';
app.factory('authInterceptor', ['$q', '$window', function($q, $window){
  return{
    request:function(config){
      config.headers=config.headers || {};
      if($window.localStorage.token){
        config.headers.Authorization= 'Bearer ' + $window.localStorage.token;
      }
      return config;
    },
    response: function(response){
      if(response.status===401){
        delete $window.localStorage.token;
        $window.path('/login');

      }
      return response || $q.when(response);
    }
  };
}]);
