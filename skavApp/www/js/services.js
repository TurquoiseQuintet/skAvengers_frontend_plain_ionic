'use strict';
// sign up service ---------------------------->
app.service('SignUpService', ['$http', '$window', '$location', function($http, $window, $location) {
  var sv = this;
  sv.signup = function(username, password, email, avatar, phone) {
    $http.post('https://skavengers.herokuapp.com/register', {
        username: username,
        password: password,
        email: email,
        avatar: avatar,
        phone_number: phone
      })
      .then(function(response) {
        console.log(response);
        //path to login or does signup log you in and path to user home?
        $window.localStorage.token = response.data.token;

        $location.path('/user');
      })
      .catch(function(err) {
        console.log(err);
        //need to add section for thorough error handling
      });
  };

}]);
// log in service --------------------------------->
app.service("LogInService", ['$http', '$window', '$state', function($http, $window, $state) {
  var sv = this;
  sv.login = function(username, password) {
    console.log('fire');
    $http.post('https://skavengers.herokuapp.com/login', {
        username: username,
        password: password
      })
      .then(function(response) {
        console.log(response);
        //localstorage
        $window.localStorage.token = response.data.token;
        // path somewhere...to their page with their hunts?
        $state.go('user');
      })
      .catch(function(err) {
        console.log(err.message);
        delete $window.localStorage.token;
        //handle error
      });
  };
}]);

//log out service ------------------------------------
app.service("LogoutService", ['$http', '$window', "$state", function($http, $window, $state) {
  var sv = this;
  sv.logOut = function() {
    delete $window.localStorage.token;
    $state.go('index');
  };
}]);

// hunt services -------------------------------------->
app.service("HuntService", ['$http', '$window', '$state','$location', function($http, $window, $state, $location) {
  var sv = this;
  sv.hunts = [];
  sv.master = [];
  sv.users = [];
  sv.getAllHunts = function() {
    // console.log("2");
    $http.get('https://skavengers.herokuapp.com/hunts/all')
      .then(function(data) {
        for (var i = 0; i < data.data.length; i++) {
          sv.hunts.push(data.data[i]);
        }
      })
      .catch(function(err) {
        //handle it
        sv.message = "problems in the oceans";
      });
  };
  sv.masterOf = function() {
    $http.get('https://skavengers.herokuapp.com/hunts/mine')
      .then(function(data) {
        sv.master.length = 0;
        for (var i = 0; i < data.data.length; i++) {
          sv.master.push(data.data[i]);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };
  //this service is called for when we make a request to post hunts to start a new hunt
  sv.addHunt = function(name, expiration) {
    console.log(sv.users);
    $http.post('https://skavengers.herokuapp.com/hunts', {
        name: name,
        expiration: expiration,
        users: sv.users
        //something to assign this hunt to the users added in view
      })
      .then(function(data) {
        console.log(data);
        $state.go('new-task',{hunt_id: data.data[0]});
      })
      .catch(function(err) {
        sv.message = "problems with creating hunt";
      });
  };
  sv.addUser = function(user_id){
    sv.users.push(user_id);
  };
  //this is used to get ONE particular hunt
  //my logic may be redundant but this is how I did it in the past and when I have done it other ways it didnt
  //work
  sv.getHunt = function(hunt) {
    $http.get('https://skavengers.herokuapp.com/hunts/' + hunt.id, {
        params: {
          hunt: hunt.id
        }
      })
      .then(function(data) {
        sv.hunt = data.data;
      })
      .catch(function(err) {
        //handle yo shit
        sv.message = "What a dilemma the hunt could not be found";
      });
  };


  // should this happen in a specific controller?
  // sv.getAllhunts();




  sv.deleteHunt = function(hunt) {
    $http.delete('https://skavengers.herokuapp.com/hunts/' + hunt.id, {
        params: {
          hunt: hunt.id
        }
      })
      .then(function(data) {
        $location.path('/user');
      })
      .catch(function(err) {
        sv.message("a problem with the delete. Make sure you own the hunt");
      });
  };

  sv.editHunt = function(name, expiration_time, xp_to_level_up) {
    $http.put('https://skavengers.herokuapp.com/hunts/'+ $location.path().split("/")[2], {
          name:name,
          expiration: expiration_time
        // xp_to_level_up: xp_to_level_up
      })
      .then(function(data) {
        console.log(data);
        $location.path('user');
      })
      .catch(function(err) {
        sv.message("Make sure you own the hunt you are trying to edit");
      });
  };
}]);



// task services --------------------------->

app.service('TaskService', ['$http', '$window', '$location', '$state', function($http, $window, $location, $state) {
  //this function makes an http request to get all tasks

  var sv = this;
  sv.users=[];
  sv.tasks = [];
  sv.getAlltasks = function() {
    $http.get('https://skavengers.herokuapp.com/tasks')
      .then(function(data) {
        sv.tasks.length = 0;
        for(var i = 0; i < data.data; i ++){
          sv.tasks.push(data.data[i]);
        }
      })
      .catch(function(err) {
        sv.message(err);
      });
  };

  sv.deleteTask = function(task_id) {
    $http.delete('https://skavengers.herokuapp.com/tasks/' + task_id)
      .then(function(data) {
        // sv.result("deleted");
        $window.location.reload('/edit-hunt');
      })
      .catch(function(err) {
        console.log(err);
        // sv.message("make sure you own the hunt to delete the task");
      });
  };

  sv.gettask = function(task) {
    $http.put('https://skavengers.herokuapp.com/tasks/' + task.id, {
        params: {
          task: task.id
        }
      })
      .then(function(data) {
        sv.task = data.data;

      })
      .catch(function(err) {
        sv.message = "troubling waters";
      });
  };

  sv.posttask = function(task) {
    task.hunt_id = ($location.path()).split("/")[2];
    task.completed = false;

    console.log(task);
    $http.post('https://skavengers.herokuapp.com/tasks', task)
      .then(function(data) {
        console.log(data);
        if(confirm("success! Would you like to add another task?")){
          $state.go('new-task', {hunt_id: task.hunt_id.id});
        } else {
          $state.go('huntmaster-view', {hunt_id: task.hunt_id.id});
        }

      })
      .catch(function(err) {
        console.log("err", err);

      });
  };


  sv.edittask = function(name, expiration_time) {
    $http.put('https://skavengers.herokuapp.com/tasks/', {
        name: name,
        expiration_time: expiration_time
      })
      .then(function(data) {
        //where do I want this to go?
        // $window.path('/')
      })
      .catch(function(err) {
        sv.message = "you do not have permission to edit that";
      });
  };
sv.huntTasks=function(){
  $http.get('http://skavengers.herokuapp.com/tasks/hunt/'+ $location.path().split("/")[2])
  .then(function(data){
    sv.users.length = 0;
    for(var i=0; i<data.data.length; i++){
      sv.users.push(data.data[i]);
    }
  })
  .catch(function(err){
    console.log(err);
  });
};


}]);


// user services -------------------------------->
app.service('UserServices', ['$http', '$window', '$location', 'UserInfo', function($http, $window, $location, UserInfo) {
  var sv = this;
  sv.usershunt=[];
  sv.deleteUser = function(user_id) {
    console.log(user_id);
    $http.delete('https://skavengers.herokuapp.com/users/' + user_id)
      .then(function(data) {
        sv.result = "that user is trashed";
      })
      .catch(function(err) {
        sv.message = "That user will remain. Make ure you have permissions to delete them";
      });
  };

  sv.editUser = function(user) {
    $http.put('https://skavengers.herokuapp.com/users/' + user.id)
      .then(function(data) {
        $window.path('/user');
      })
      .catch(function(err) {
        sv.message = "You don't have permission to edit that user";
      });
  };
  sv.users=[];
  sv.getAllUsers = function() {
    $http.get('https://skavengers.herokuapp.com/users')
      .then(function(data) {
        sv.users.length = 0;
        for(var i = 0; i < data.data.length; i++){
          sv.users.push(data.data[i]);
        }
      })
      .catch(function(err) {
        sv.message = "problems getting users";
      });
  };

  sv.getUser = function(user) {
    http.get('https://skavengers.herokuapp.com/user/' + user.id)
      .then(function(data) {

      })
      .catch(function(err) {

      });
  };

  sv.huntUsers=function(){
    console.log($location.path().split("/")[2]);
    $http.get('https://skavengers.herokuapp.com/hunts/users/'+$location.path().split("/")[2])
    .then(function(data){
      console.log("LOOK HERE:  ", data);
      sv.usershunt.length = 0;
      for(var i=0; i<data.data.length; i++){
        sv.usershunt.push(data.data[i]);
      }
    })
    .catch(function(err){
      console.log(err);
    });

};
}]);

app.service('SubmitService', ['$http', '$location', '$state', function($http, $location, $state) {
  var sv = this;
  sv.user = [];
  sv.huntTasks = [];
  sv.userTasks = [];
  sv.hunter=($location.path()).split("/")[2];
  sv.hunt=($location.path()).split("/")[3];
  $http.get('https://skavengers.herokuapp.com/users/' + sv.hunter)
  .then(function(data) {
    sv.user.push(data.data);
    return $http.get('https://skavengers.herokuapp.com/tasks/hunt/' + sv.hunt)
  })
  .then(function(data) {
    sv.huntTasks.length = 0;
    for (var i = 0; i < data.data.length; i++) {
      sv.huntTasks.push(data.data[i]);
    }
    return $http.get('https://skavengers.herokuapp.com/tasks/users_tasks')
  })
  .then(function(data) {
    sv.userTasks.length = 0;
    for (var i = 0; i < data.data.length; i++) {
      sv.userTasks.push(data.data[i]);
    }
    for (var i = 0; i < sv.userTasks.length; i++) {
      if (sv.userTasks[i].users_id == sv.user[0].id) {
        for (var j = 0; j < sv.huntTasks.length; j++) {
          if (sv.userTasks[i].tasks_id == sv.huntTasks[j].id) {
            sv.huntTasks[j].completed = sv.userTasks[i].completed;
          }
        }
      }
    }
  })
  .catch(function(err) {
    console.log(err);
  });
  sv.submit = function(user_id, task_id) {
    $http.put('https://skavengers.herokuapp.com/submit/' + user_id +'/' + task_id)
    .then(function() {
      $state.go('user');
    })
    .catch(function(err) {
      console.log(err);
    });
  }
}]);

//picture services ------------------------------->

app.service('sendMessageService', ['$cordovaCamera', '$http', '$cordovaSms', function($cordovaCamera, $http, $cordovaSms) {

  var sv = this;
  sv.picture = {
    avatar: ''
  };
  //this method will open the camera app. after a photo is taken the user will crop it into a square. It returns a promise with the data being the base64 encoded image
  sv.takePicture = function(height) {

    var options = {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      allowEdit: true,
      targetWidth: height,
      targetHeight: height
    };
    return $cordovaCamera.getPicture(options)
      .then(function(data) {
        return 'data:image/jpeg;base64,' + data;
      });
  };
  //this method uploads the image passed into it as base64 and returns a promise where the data is an object of information about the image. the url can be accessed at data.data.secure_url
  sv.uploadPicture = function(imageInfo) {
    return $http.post('https://api.cloudinary.com/v1_1/dppfalbij/auto/upload', {
        file: imageInfo,
        upload_preset: 'addub85x'
      })
      .then(function(data) {
        return data.data.secure_url;
      });
  };

  //this method sends a text to the given number with a message, and the imageURL passed in.
  sv.sendPicture = function(number, message) {
    var options = {
      replaceLineBreaks: true, // true to replace \n by a new line, false by default
      android: {
        intent: ''
      }
    };

    return $cordovaSms.send(number, message, options)
  }

  sv.takeAndSubmit = function(taskName, username, number) {
    var url;
    if (confirm('Please take a picture of ' + taskName)) {
      sv.takePicture(1000)
        .then(function(image) {
          return sv.uploadPicture(image);
        })
        .then(function(_url) {
          url = _url;
          return sv.sendPicture(number, username + ' has submitted the following picture of ' + taskName + ' for review');
        })
        .then(function() {
          return sv.sendPicture(number, url);
        })
        .then(function() {
          alert(taskName + ' was successfully submitted.');
        })
        .catch(function(err) {
          alert('there was an issue submitting ' + taskName);
        });
    }
  };

  sv.takeProfilePicture = function(){
    sv.takePicture(500)
    .then(function(image) {
      return sv.uploadPicture(image);
    })
    .then(function(data){
      sv.picture.avatar = data;
    })
    .catch(function(err){
      console.log(err);
    });
  };
}]);

app.service('hunterViewService', ['$http', function($http){
var sv = this;
sv.tasks = [];
sv.info = {
  number: 0
};
sv.getTasks = function(){
  $http.get('https://skavengers.herokuapp.com/tasks/hunter/hunt/' + sv.hunt_id)
  .then(function(data){
    sv.info.number = data.data.huntMasterNumber;
    sv.info.experience = data.data.experience;
    sv.tasks.length = 0;
    for(var i = 0; i < data.data.tasks.length; i++){
      sv.tasks.push(data.data.tasks[i]);
    }
  })
  .catch(function(err){
    console.log(err);
  });
};
}]);

app.service('HuntmasterService', ['$http', function($http){
  var sv = this;
  sv.hunts = [];
  sv.master = [];
  sv.users = [];
  sv.getAllHunts = function() {
    // console.log("2");
    $http.get('https://skavengers.herokuapp.com/hunts/all')
      .then(function(data) {
        sv.hunts.length = 0;
        for (var i = 0; i < data.data.length; i++) {
          sv.hunts.push(data.data[i]);
        }
        console.log(sv.hunts);
      })
      .catch(function(err) {
        //handle it
        sv.message = "problems in the oceans";
      });
  };
  sv.masterOf = function() {
    $http.get('https://skavengers.herokuapp.com/hunts/mine')
      .then(function(data) {
        sv.master.length = 0;
        for (var i = 0; i < data.data.length; i++) {
          sv.master.push(data.data[i]);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}]);

app.service('UserInfo', ['$window', function($window){
  var sv = this;
  sv.getInfo = function(){
    sv.userInfo = (JSON.parse(atob($window.localStorage.token.split('.').slice(1,2))));
  }
}])
