angular.module("tasker", [])
.controller("taskCtrlr", function($scope, $window) {
    var starttime, endtime, tasks, timer = false, diff = 0;
    
    function init() {
        tasks = $window.localStorage.getItem("tasks");
        if (tasks === null) {
            tasks = {"tasks":[]};
            $window.localStorage.setItem("tasks", JSON.stringify(tasks));
        } else {
            tasks = JSON.parse(tasks);
        }
        $scope.tasks = tasks.tasks;
    }
    
    init();
    
    $scope.beginTask = function() {
        if ($scope.mytask && !timer) {
            starttime = new Date();
            diff = 0;
            timer = true;
        }
    };
    
    $scope.endTask = function() {
        if (timer) {
            endtime = new Date();
            timer = false;
            processTask();
            $scope.timer = "";
            $scope.mytask = "";
        }
    };
    
    function processTask() {
        var task = {
            "id":$scope.tasks.length,
            "task" : $scope.mytask,
            "start" : starttime,
            "end" : endtime,
            "actual" : $scope.timer
        }
        $scope.tasks.push(task);
        updateLocalStorage();
    }
    
    function updateLocalStorage() {
        $window.localStorage.setItem("tasks", JSON.stringify({"tasks" : $scope.tasks}));
    }
    function pad(val) {
        return val > 9 ? val : "0" + val;
    }

    function formatTime(msec) {
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;
        
        return pad(hh) + " : " + pad(mm) + " : " + pad(ss);
    };
    
    $scope.updateTimer = function() {
        if (timer) {
            $scope.timer = formatTime(new Date() - starttime);
            $scope.$apply();
        }
    };
                                      
    setInterval($scope.updateTimer, 1000);
})


