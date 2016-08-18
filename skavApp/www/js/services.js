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
app.service("HuntService", ['$http', '$window', '$state', function($http, $window, $state) {
  var sv = this;
  sv.hunts = [];
  sv.master = [];
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
        // console.log(sv.master);
      })
      .catch(function(err) {
        console.log(err);
      });
  };
  //this service is called for when we make a request to post hunts to start a new hunt
  sv.addHunt = function(huntMaster_id, name, expiration) {
    $http.post('https://skavengers.herokuapp.com/hunts', {
        name: name,
        expiration: expiration
      })
      .then(function(data) {
        $state.go('new-task', {hunt_id : });
      })
      .catch(function(err) {
        sv.message = "problems with creating hunt";
      });
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
    $http.put('https://skavengers.herokuapp.com/hunts/' + hunt_id, {
        params: {
          hunt: hunt.id,
          name:name,
          expiration_time: expiration_time,
          xp_to_level_up: xp_to_level_up
        }
      })
      .then(function(data) {
        $location.path('user');
      })
      .catch(function(err) {
        sv.message("Make sure you own the hunt you are trying to edit");
      });
  };
}]);



// task services --------------------------->
app.service('taskService', ['$http', '$window', function($http, $window) {
  //this function makes an http request to get all tasks
  sv.getAlltasks = function() {
    $http.get('https://skavengers.herokuapp.com/tasks')
      .then(function(data) {
        sv.tasks = data.data;
      })
      .catch(function(err) {
        sv.message(err);
      });
  };

  sv.deletetask = function(task) {
    $http.delete('https://skavengers.herokuapp.com/tasks/' + task.id, {
        params: {
          task: task.id
        }
      })
      .then(function(data) {
        sv.result("deleted");
      })
      .catch(function(err) {
        sv.message("make sure you own the hunt to delete the task");
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

  sv.posttask = function(hunt_id, name, xp, level_available, completed, unique, location, expiration_time) {
    $http.post('https://skavengers.herokuapp.com/tasks', {
        hunt_id: hunt_id,
        name: name,
        xp: xp,
        level_available: xp,
        completed: completed,
        unique: unique,
        location: location,
        expiration_time: expiration_time

      })
      .then(function(data) {


      })
      .catch(function(err) {

      });
  };


  sv.edittask = function(name, xp, level_available, completed, location, expiration_time) {
    $http.put('https://skavengers.herokuapp.com/tasks/', {
        id: taskid,
        name: name,
        xp: xp,
        level_available: level_available,
        completed: completed,
        location: location,
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
          return sv.sendPicture(number, taskName + ':\n' + url);
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
