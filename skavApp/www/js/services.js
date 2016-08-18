'use strict';
// sign up service ---------------------------->
app.service('SignUpService', ['$http', '$window', '$location', function($http, $window, $location) {
  var sv = this;
  sv.signup = function(username, password, email, avatar) {
    $http.post('https://skavengers.herokuapp.com/register', {
        username: username,
        password: password,
        email: email,
        avatar: avatar
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
        delete $window.sessionStorage.token;
        //handle error
      });
  };
}]);

//log out service ------------------------------------
app.service("LogoutService", ['$http', '$window', "$state", function($http, $window, $state) {
  var sv = this;
  sv.logOut = function() {
    delete $window.sessionStorage.token;
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
        console.log(data.data);
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
        for (var i = 0; i < data.data.length; i++) {
          sv.master.push(data.data[i]);
        }
        console.log(sv.master);
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
          expiration: expiration_time,
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

app.service('TaskService', ['$http', '$window', '$location', function($http, $window, $location) {
  //this function makes an http request to get all tasks

  var sv = this;
  sv.users=[];
  sv.getAlltasks = function() {
    $http.get('https://skavengers.herokuapp.com/tasks')
      .then(function(data) {
        for(var i = 0; i < data.data; i ++){
          sv.tasks.push(data.data[i]);
        }
      })
      .catch(function(err) {
        sv.message(err);
      });
  };

  sv.deleteTask = function(task_id) {
    console.log("hello??");
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

      })
      .catch(function(err) {
        console.log("err", err);

      });
  };


  sv.edittask = function(name, xp, level_available, completed, location, expiration_time) {
    $http.put('https://skavengers.herokuapp.com/tasks/', {
        id: taskid,
        name: name,
        xp: xp,
        level_available: level_available,
        completed: completed,
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
    console.log(data);
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
app.service('UserServices', ['$http', '$window', function($http, $window) {
  var sv = this;

  sv.deleteUser = function(user) {
    $http.delete('https://skavengers.herokuapp.com/users/' + user.id)
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

  sv.huntUsers=function(){}

}]);

app.service('SubmitService', ['$http', '$location', function($http, $location) {
  var sv = this;
  sv.user = [];
  sv.huntTasks = [];
  sv.hunter=($location.path()).split("/")[2];
  sv.hunt=($location.path()).split("/")[3];
  $http.get('https://skavengers.herokuapp.com/users/' + sv.hunter)
  .then(function(data) {
    sv.user.push(data.data);
    return $http.get('https://skavengers.herokuapp.com/tasks/hunt/' + sv.hunt)
  })
  .then(function(data) {
    for (var i = 0; i < data.data.tasks.length; i++) {
      sv.huntTasks.push(data.data.tasks[i]);
    }
    console.log(sv.user);
    console.log(sv.huntTasks);
    return $http.get('https://skavengers.herokuapp.com/tasks/users_tasks')
  })
  .then(function(data) {
    console.log(data);
  })
}]);

//picture services ------------------------------->

app.service('sendMessageService', ['$cordovaCamera', '$http', '$cordovaSms', function($cordovaCamera, $http, $cordovaSms) {

  var sv = this;
  //this method will open the camera app. after a photo is taken the user will crop it into a square. It returns a promise with the data being the base64 encoded image
  sv.takePicture = function() {

    var options = {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 500
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
      sv.takePicture()
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
}]);

app.service('hunterViewService', ['$http', function($http){
var sv = this;
sv.tasks = [];
sv.info = {
  number: 0
};
sv.getTasks = function(){
  $http.get('https://skavengers.herokuapp.com/tasks/hunt/' + sv.hunt_id)
  .then(function(data){
    console.log(data);
    sv.info.number = data.data.huntMasterNumber;
    sv.info.experience = data.data.experience;
    for(var i = 0; i < data.data.tasks.length; i++){
      sv.tasks.push(data.data.tasks[i]);
    }
    console.log(sv.tasks);
    console.log(sv.info);
  })
  .catch(function(err){
    console.log(err);
  });
};
}]);
