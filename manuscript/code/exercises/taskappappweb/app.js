 angular.module('ShareCoffeeTaskListApp', []);

angular.module('ShareCoffeeTaskListApp')
.service('taskListService', function($http) {
      return {
        loadTasks: function(onTasksLoaded, onError) {
          var properties;
          properties = ShareCoffee.REST.build.read["for"].angularJS({
            url: "web/lists/GetByTitle('Tasks')/items?$Select=Id,Title,Status"
          });
          return $http(properties).success(onTasksLoaded).error(onError);
        },
        addTask: function(taskName, onTaskAdded, onError) {
          var newTask, properties;
          newTask = {
            '__metadata': {
              'type': 'SP.Data.TasksListItem'
            },
            'Title': taskName,
            'Status': "Not Started"
          };
          properties = ShareCoffee.REST.build.create["for"].angularJS({
            url: "web/lists/GetByTitle('Tasks')/items",
            payload: newTask
          });
          return $http(properties).success(onTaskAdded).error(onError);
        },
        toggleTask: function(task, onTaskToggled, onError) {
          var properties, updateTask;
          updateTask = {
            '__metadata': {
              'type': 'SP.Data.TasksListItem'
            },
            'Status': task.Status,
            'PercentComplete': task.PercentComplete
          };
          properties = ShareCoffee.REST.build.update["for"].angularJS({
            url: "web/lists/GetByTitle('Tasks')/items/GetById(" + task.Id + ")",
            payload: updateTask
          });
          return $http(properties).success(onTaskToggled).error(onError);
        }
      };
    }
);

 angular.module('ShareCoffeeTaskListApp')
    .controller('taskListController', function($scope, taskListService) {
      $scope.tasks = [];
      $scope.newTask = 'Add another task ...';
      $scope.reverse = true;
      $scope.filterTerm = '';
      $scope.init = function() {
        var onTasksLoaded;
        onTasksLoaded = function(data) {
          return $scope.tasks = data.d.results;
        };
        return taskListService.loadTasks(onTasksLoaded);
      };
      $scope.addTask = function() {
        var onTaskAdded;
        onTaskAdded = function(data) {
          $scope.tasks.push(data.d);
          return $scope.newTask = 'Add another task...';
        };
        return taskListService.addTask($scope.newTask, onTaskAdded);
      };
      $scope.toggle = function(task) {
        var onError, onTaskToggled;
        onTaskToggled = function(data) {
          return console.log(data);
        };
        onError = function(data) {
          return console.log(data);
        };
        if (task.Status === 'Completed') {
          task.Status = 'Not Started';
          task.PercentComplete = 0;
        } else {
          task.Status = 'Completed';
          task.PercentComplete = 1;
        }
        return taskListService.toggleTask(task, onTaskToggled, onError);
      };
      return $scope.init();
    }
);