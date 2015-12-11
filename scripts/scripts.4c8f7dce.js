"use strict";!function(){angular.module("filters",[])}(),function(){function a(a,c,d,e,f){a.$on("$routeChangeStart",function(a,b){b.requiresLogin&&!d.isUserLoggedIn()&&c.path("/login").replace()}),a.$on("$locationChangeStart",function(a,b){b.indexOf("/login")>-1&&d.isUserLoggedIn()&&a.preventDefault()}),e.whenPUT(/api\/courses\/(.+)/).respond(function(a,b,c){var d=angular.fromJson(c);return f.updateObject("courses",d),[200,d]}),e.whenPOST("/api/courses").respond(function(a,b,c){var d=angular.fromJson(c),e=f.addObject("courses",d);return[200,e]}),e.whenGET(/api\/courses\/(.+)/).respond(function(a,c){var d=b(c),e=f.getById("courses",d);return e?[200,e]:[404,{}]}),e.whenGET("/api/courses").respond(function(){var a=f.getCollection("courses");return[200,a]}),e.whenDELETE(/api\/courses\/(.+)/).respond(function(a,c){var d=b(c);return f.deleteObjectFromCollection("courses",d),[200,{}]}),e.whenGET(/\.html$/).passThrough()}function b(a){var b=/\d+/.exec(a);return b&&b.length?b.shift():null}var c=angular.module("courses",["ngResource","ngRoute","LocalStorageModule","ngMockE2E","filters","ngAnimate"]);c.run(["$rootScope","$location","authService","$httpBackend","clientStructuredDataStorage",a])}(),function(){function a(a,b,c,d){function e(c,d){var e=a.defer();return b(function(){var a=m.find(n,{login:c,password:d});if(a)e.resolve(a);else{var b=new Error("No user with such login/password");e.reject(b)}}),e.promise}function f(){return j&&j.login}function g(){return n}function h(a){j=a,k.set("userName",a.login)}function i(){j=null,k.remove("userName")}var j,k=d,l=k.get("userName"),m=c._,n=[{login:"demo",password:"demo123"}];return l&&(j=m.find(n,{login:l})),{getCurrentUserName:f,setCurrentUser:h,validateUser:e,signOut:i,getAllUsers:g,isUserLoggedIn:function(){return!!j}}}var b=angular.module("courses");b.factory("authService",["$q","$timeout","$window","localStorageService",a])}(),function(){function a(a,b,c){var d=this;d.showUserBlock=a.isUserLoggedIn(),b.$on("logout",function(){d.showUserBlock=!1,c.path("/login")})}var b=angular.module("courses");b.controller("MainController",["authService","$scope","$location",a])}(),function(){function a(a){function b(b){b.currentUrl=a.path(),b.$on("$locationChangeSuccess",function(){b.currentUrl=a.path()})}return{link:b,replace:!0,scope:{source:"="},templateUrl:"views/breadcrumbs.html"}}var b=angular.module("courses");b.directive("breadcrumbs",["$location",a])}(),function(){function a(a,b,c){var d=c.$parent.main;d.breadcrumbs=null;var e=this,f=b;e.doLogin=function(){f.validateUser(e.name,e.password).then(function(b){f.setCurrentUser(b),d.showUserBlock=!0,a.path("/courses")},function(){e.accessDenied=!0,e.password=""})},e.allUsers=f.getAllUsers()}var b=angular.module("courses");b.controller("LoginController",["$location","authService","$scope",a])}(),function(){function a(){function a(b){var c=Array.isArray(b)?[]:{};for(var d in b)b.hasOwnProperty(d)&&0!==d.indexOf("$")&&("object"!=typeof b[d]||b[d]instanceof Date?b[d]instanceof Date?c[d]={timestamp:b[d].getTime(),isDate:!0}:c[d]=b[d]:c[d]=a(b[d]));return c}function b(a){var c=Array.isArray(a)?[]:{};for(var d in a)if(a.hasOwnProperty(d))if("object"==typeof a[d]&&a[d].isDate){var e=new Date;e.setTime(a[d].timestamp),c[d]=e}else"object"==typeof a[d]?c[d]=b(a[d]):c[d]=a[d];return c}var c={};return c.prepare=a,c.restore=b,c}var b=angular.module("courses");b.factory("SerializationService",a)}(),function(){function a(a,b){function c(){var a;for(var b in i)if(i.hasOwnProperty(b)){a=b;var c=g.get(a);c?i[b].actualData=e(c):i[b].predefinedData&&(i[b].actualData=i[b].predefinedData,g.set(a,d(i[b].predefinedData)))}}function d(a){var b=a.map(h.prepare);return angular.toJson(b)}function e(a){var b,c=angular.fromJson(a);return b=c.map(h.restore)}var f={},g=a,h=b,i={courses:{predefinedData:[{id:1,title:"Course 1",duration:380,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",date:new Date(2015,11,31),authors:["Пушкин","Лермонтов"]},{id:2,title:"Course 2",duration:200,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",date:new Date(2014,11,17),authors:["Гоголь","Толстой"]},{id:3,title:"Course 3",duration:200,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",date:new Date(2013,0,22),authors:["Фет","Есенин"]}]}};return c(),f.getCollection=function(a){return i[a].actualData},f.deleteObjectFromCollection=function(a,b){b=+b;var c,e=i[a].actualData,f=e.some(function(a,d){return c=d,b===a.id});f&&(e.splice(c,1),g.set(a,d(e)))},f.getById=function(a,b){b=+b;var c,d,e=i[a].actualData;return d=e.some(function(a){var d=a.id===b;return d&&(c=a),d}),d?c:null},f.addObject=function(a,b){b.id=Date.now();var c=i[a].actualData;return c?c.push(b):i[a].actualData=[b],g.set(a,d(c)),b},f.updateObject=function(a,b){var c=i[a].actualData;if(c){var e,f=c.some(function(a,c){return e=c,a.id===b.id});f&&(c[e]=b,g.set(a,d(c)))}},f}var b=angular.module("courses");b.factory("clientStructuredDataStorage",["localStorageService","SerializationService",a])}(),function(){function a(a,b){function c(c,d){var e=a[0].createElement("div");angular.element(e).attr("role","alert").text(c).addClass("sr-only"),a.find("body").append(e),b(function(){angular.element(e).remove()},d)}return{notify:c}}var b=angular.module("courses");b.factory("srUtil",["$document","$timeout",a])}(),function(){function a(){function a(a,b,c,d){function e(){function a(a){var b=this,c=b.find("ul"),d=angular.element(document.createElement("li"));d.attr({"tab-index":"-1","aria-selected":"false",role:"option"}),d.text(a),c.append(d)}function b(){r.find("ul").empty(),n.forEach(a,r)}function c(){s.find("ul").empty(),o.forEach(a,s)}n=d.$modelValue,d.$setViewValue(n),b(),c()}function f(a){var b;"keydown"===a.type?b=h(a,r):"click"===a.type&&(b=i(a)),b&&(l=b)}function g(a){var b;"keydown"===a.type?b=h(a,s):"click"===a.type&&(b=i(a)),b&&(m=b)}function h(a,b){var c,d,e,f=b[0].querySelector(".active"),g=b[0].querySelector("li");switch(a.keyCode){case t.down:if(a.preventDefault(),f?(e=angular.element(f),e.removeClass("active").attr("aria-selected","false"),c=0!==e.next().length?e.next():g):g&&(c=g),c)return angular.element(c).addClass("active").attr("aria-selected","true");break;case t.up:if(a.preventDefault(),f?(e=angular.element(f),e.removeClass("active").attr("aria-selected","false"),d=f.previousSibling||e.parent().children()[e.parent().children().length-1]):g&&(d=g),d)return angular.element(d).addClass("active").attr("aria-selected","true")}}function i(a){var b=a.target;if("LI"===b.tagName){var c=angular.element(b),d=c.parent();return d.children().removeClass("active").attr("aria-selected","false"),c.addClass("active").attr("aria-selected","true"),c}}function j(){if(m){var b=m.text(),c=o.indexOf(b);c>=0&&(o.splice(c,1),n.push(b),e(),a.onChoose({author:b}))}}function k(){if(l){var b=l.text(),c=n.indexOf(b);c>=0&&(n.splice(c,1),o.push(b),e(),a.onRemove({author:b}))}}var l,m,n,o=angular.copy(a.source),p=angular.element(document.getElementById("list-input_choose-btn")),q=angular.element(document.getElementById("list-input_remove-btn")),r=angular.element(document.getElementById("list-input_chosen-options")),s=angular.element(document.getElementById("list-input_source-options"));r.on("click",f),r.on("keydown",f),s.on("click",g),s.on("keydown",g),p.on("click",j),s.on("keydown",function(a){(a.keyCode===t.left||a.keyCode===t.space)&&(a.preventDefault(),j())}),q.on("click",k),r.on("keydown",function(a){(a.keyCode===t.right||a.keyCode===t.space)&&(a.preventDefault(),k())});var t={space:32,left:37,up:38,right:39,down:40};d.$render=function(){o=o.filter(function(a){return-1===d.$modelValue.indexOf(a)}),e()}}var b='<div role="listbox"><div id="list-input_chosen-options" tabindex="0" aria-label="List of chosen options" class="list-container"><ul></ul></div><div class="buttons-container"><button type="button" id="list-input_remove-btn" aria-label="Remove currently selected option from the list of chosen options and return in to the list of available options">&gt;</button><button type="button" aria-label="Add currently selected option from the list of available options to the list of chosen options" id="list-input_choose-btn">&lt;</button></div><div id="list-input_source-options" tabindex="0" aria-label="List of available options" class="list-container"><ul ></ul></div></div>';return{restrict:"E",link:a,template:b,scope:{source:"=",onChoose:"&chooseCallback",onRemove:"&removeCallback"},require:"ngModel",replace:!0}}var b=angular.module("courses");b.directive("listInput",a)}(),function(){function a(a,b,c,d){var e,f,g=a("/api/courses/:id",{id:"@id"},{update:{method:"PUT"}}),h=d,i=c._;return f={getCourses:function(){var a=b.defer();return"undefined"==typeof e?(e=[],g.query().$promise.then(function(b){Array.prototype.push.apply(e,b),a.resolve(e)})):a.resolve(e),a.promise},deleteCourse:function(a){var c=b.defer();return g["delete"]({id:a.id}).$promise.then(function(){var b,d=e.some(function(c,d){return b=d,c.id===a.id});d&&(e.splice(b,1),c.resolve(!0))},function(a){c.reject(a)}),c.promise},saveCourse:function(a){var c=new g,d=h.prepare(a);angular.extend(c,d);var f=b.defer();return c.$save().then(function(a){var b=h.restore(a);e&&e.push(b),f.resolve(b)},function(a){f.reject(a)}),f.promise},getCourse:function(a){if(a=+a,"undefined"!=typeof e){var c=i.find(e,{id:a}),d=b.defer();return c?d.resolve(c):d.reject({status:404}),d.promise}return g.get({id:a}).$promise},updateCourse:function(a){var c=angular.copy(a),d=h.prepare(c),f=new g;angular.extend(f,d);var i=b.defer();return f.$update().then(function(a){var b=h.restore(a);if(e){var c,d=e.some(function(b,d){return c=d,b.id===a.id});d&&(e[c]=b,i.resolve(b))}else i.resolve(b)},function(){i.reject()}),i.promise}}}var b=angular.module("courses");b.factory("coursesService",["$resource","$q","$window","SerializationService",a])}(),function(){function a(){return{templateUrl:"views/user-block.html",controller:["authService","$scope",b],controllerAs:"auth",replace:!0}}function b(a,b){var c=this;c.userName=a.getCurrentUserName(),c.logOut=function(){a.signOut(),b.$emit("logout")}}var c=angular.module("courses");c.directive("userBlock",a)}(),function(){function a(a){function b(b,c){b=parseInt(b);var d=!Array.isArray(c)||3!==c.length;if(isNaN(b)||d)return void a.error("Wrong parameter passed to getEnding filter");if(b>=10&&20>=b)return c[2];var e=b%10;return 1===e?c[0]:e>1&&5>e?c[1]:c[2]}return b}var b=angular.module("filters");b.filter("getEnding",["$log",a])}(),function(){function a(a){function b(b){if(b=parseInt(b),!isNaN(b)){0>=b&&(b=0);var c=Math.floor(b/60),d=0!==c?b%60:b,e="";return c?(e=+c+" "+a("getEnding")(c,["час","часа","часов"]),d&&(e+=" "+d+" "+a("getEnding")(d,["минута","минуты","минут"]))):e+=d+" "+a("getEnding")(d,["минута","минуты","минут"]),e}}return b}angular.module("filters").filter("timeFormatter",["$filter",a])}(),function(){function a(a,b){var c=this;c.filterString="",c.filterCourses=function(){c.searchCourseTitle=c.filterString},a.$watch(angular.bind(c,function(){return this.filterString}),function(a){""===a&&c.filterCourses()}),a.$parent.main.breadcrumbs=[{url:"#/courses",title:"Курсы"}],c.congfirmDelete=function(a){c.courseToDelete=a,angular.element("#confirm_delete_course").modal()},c.deleteCourse=function(){b.deleteCourse(c.courseToDelete).then(function(){c.closeConfirmationWindow()})},c.closeConfirmationWindow=function(){angular.element("#confirm_delete_course").modal("hide")},b.getCourses().then(function(a){c.list=a})}var b=angular.module("courses");b.controller("CoursesListController",["$scope","coursesService",a])}(),function(){function a(a,b){function c(c,d,e,f){var g=b[0].createElement("span"),h=angular.element(g);h.attr("role","presentation");var i=d.next();0===i.length?d.parent().append(g):d.parent()[0].insertBefore(g,i[0]);var j=e.formatTime;c.$watch(function(){return f.$modelValue},function(b){var c=b?a(j)(b):"";h.text(c)}),d[0].style.display="inline-block",d[0].style.width="auto",d[0].style.marginRight="10px"}return{restrict:"A",link:c,require:"ngModel"}}var b=angular.module("courses");b.directive("formatTime",["$filter","$document",a])}(),function(){function a(){function a(a,c,d,e){function f(a){var c,f,g,h;return a?(c=b(a.length,d.mask),f=new RegExp(c),g=f.exec(a),h=g?g.shift():e.$modelValue,e.$setViewValue(h),e.$render(),h):a}e.$parsers.unshift(f)}function b(a,b){if(a>b.length)return b;for(var c=0,d=0;d<b.length&&a>c;d++)"\\"!==b[d]&&c++;return b.substr(0,d)}return{link:a,restrict:"A",require:"ngModel"}}var b=angular.module("courses");b.directive("mask",a)}(),function(){function a(a){function b(b,c,d,e){function f(a){var b;if(!a.match(/^\d{2}\.\d{2}\.\d{4}$/))return!1;var c=a.split("."),d=c.pop(),e=c.pop(),f=c.pop();return b=d+"-"+e+"-"+f}function g(b){var c=new Date(b);if(isNaN(c))return!1;var d=a("date")(c,"yyyy-MM-dd");return d===b}var h=d.dateFormat;e.$formatters.push(function(b){return b?a("date")(b,h):""}),e.$parsers.push(function(a){var b=f(a);return b&&g(b)?new Date(b):a}),e.$validators.correctDate=function(a){if(a instanceof Date)return!0;if("undefined"==typeof a||""===a)return!0;var b;return"dd.MM.yyyy"===h?b=f(a):"yyyy-MM-dd"===h&&(b=a),g(b)}}return{link:b,restrict:"A",require:"ngModel"}}var b=angular.module("courses");b.directive("dateFormat",["$filter",a])}(),function(){function a(a,b,c,d,e,f){function g(a){e.$parent.main.breadcrumbs=[{url:"#/courses",title:"Курсы"},{url:"#"+c.path(),title:a}]}var h=this,i=f.current.locals.course;"undefined"==typeof i?(h.course={authors:[]},h.isNewCourse=!0,g("Новый курс")):404===i?(h.courseNotFound=!0,g("Курс не найден")):(h.course=i,g(i.title)),e.$watch(angular.bind(h,function(){return this.course.title}),function(a,b){var c,d=25;return"undefined"==typeof b&&h.isNewCourse?!1:("string"==typeof a&&(c=a.length>d?a.substr(0,d)+"...":a),void g(c))}),h.availableAuthors=["Пушкин","Лермонтов","Гоголь","Толстой","Достоевский","Горький","Чехов","Есенин","Фет"],h.submitIfValid=function(b){return b.$invalid?!1:void(h.isNewCourse?a.saveCourse(h.course).then(function(){c.path("/courses")},function(a){d.error(a)}):h.course.id&&a.updateCourse(h.course).then(function(){c.path("/courses")}))},h.srNotifyAuthorSelected=function(a){var c="Автор "+a+" был добавлен в список выбранных авторов";b.notify(c,5e3)},h.srNotifyAuthorRemoved=function(a){var c="Автор "+a+" был удален из списка выбранных авторов";b.notify(c,5e3)}}var b=angular.module("courses");b.controller("CourseController",["coursesService","srUtil","$location","$log","$scope","$route",a])}(),angular.module("courses").config(["$routeProvider",function(a){a.when("/login",{templateUrl:"views/login.html",controller:"LoginController",controllerAs:"login"}).when("/courses",{templateUrl:"views/courses-list.html",controller:"CoursesListController",controllerAs:"courses",requiresLogin:!0}).when("/courses/new",{templateUrl:"views/course.html",controller:"CourseController",controllerAs:"ctrl",requiresLogin:!0}).when("/courses/:id",{templateUrl:"views/course.html",controller:"CourseController",controllerAs:"ctrl",requiresLogin:!0,resolve:{course:["coursesService","$route","$q",function(a,b,c){var d=b.current.params.id,e=/^\d+$/,f=e.test(d),g=c.defer();return f?a.getCourse(d).then(function(a){g.resolve(a)},function(){g.resolve(404)}):g.resolve(404),g.promise}]}}).otherwise({redirectTo:"/courses"})}]),angular.module("courses").run(["$templateCache",function(a){a.put("views/breadcrumbs.html",'<div role="navigation" class="breadcrumbs"> <ul class="nav nav-pills"> <li ng-repeat="item in source" ng-class="{active: item.url === \'#\' + currentUrl }"> <a ng-if="item.url !== \'#\' + currentUrl" ng-href="{{ item.url }}">{{ item.title }}</a> <a ng-if="item.url === \'#\' + currentUrl">{{ item.title }}</a> </li> </ul> </div>'),a.put("views/confirm-delete.html",'<div class="modal fade" id="confirm_delete_course" tabindex="-1" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">Подтвердите удаление</h4> </div> <div class="modal-body"> <p>Вы уверены, что хотите удалить курс <strong>{{ courses.courseToDelete.title }}</strong>?</p> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="courses.courseToDelete = null">Я передумал </button> <button type="button" class="btn btn-primary" ng-click="courses.deleteCourse()">Удалить</button> </div> </div><!-- /.modal-content --> </div><!-- /.modal-dialog --> </div><!-- /.modal -->'),a.put("views/course.html",'<div class="container course-container" ng-hide="ctrl.courseNotFound"> <form name="courseForm" ng-submit="ctrl.submitIfValid(courseForm)" class="form-horizontal" novalidate> <div ng-class="{ \'has-error\': courseForm.title.$invalid && (courseForm.title.$touched || courseForm.$submitted), \'form-group\': true }"> <label for="course_name" class="col-sm-2">Название</label> <div class="col-sm-5"><input type="text" id="course_name" required name="title" ng-model="ctrl.course.title" placeholder="Название" class="form-control"></div> <div class="text-danger col-sm-3" ng-show="courseForm.title.$error.required && (courseForm.title.$touched || courseForm.$submitted)">*Это поле обязательно </div> </div> <div ng-class="{ \'has-error\': courseForm.description.$invalid && (courseForm.description.$touched || courseForm.$submitted), \'form-group\': true }"> <label for="description" class="col-sm-2">Описание</label> <div class="col-sm-8"> <textarea name="description" required id="description" ng-model="ctrl.course.description" class="form-control" placeholder="Описание"></textarea> </div> <div ng-show="courseForm.description.$error.required && (courseForm.description.$touched || courseForm.$submitted)" class="text-danger col-sm-8 col-sm-push-2 pt-5">*Это поле обязательно </div> </div> <div ng-class="{ \'has-error\': courseForm.date.$invalid && (courseForm.date.$touched || courseForm.$submitted), \'form-group\': true }"> <label for="date" class="col-sm-2">Дата</label> <div class="col-sm-10"> <input type="text" class="form-control" id="date" name="date" size="8" required mask="\\d\\d\\.\\d\\d\\.\\d\\d\\d\\d" date-format="dd.MM.yyyy" placeholder="дд.мм.гггг" ng-model="ctrl.course.date" ng-model-options="{ allowInvalid: true }"> <span class="text-danger ml-30" ng-show="courseForm.date.$error.correctDate && (courseForm.date.$touched || courseForm.$submitted)">Некорректная дата </span> <span class="text-danger ml-30" ng-show="courseForm.date.$error.required && (courseForm.date.$touched || courseForm.$submitted)">*Это поле обязательно </span> </div> </div> <div ng-class="{ \'has-error\': courseForm.duration.$invalid && (courseForm.duration.$touched || courseForm.$submitted), \'form-group\': true }"> <label for="duration" class="col-sm-2">Продолжительность</label> <div class="col-sm-6"><input size="5" format-time="timeFormatter" type="text" name="duration" mask="\\d\\d\\d\\d" id="duration" required min="1" ng-model="ctrl.course.duration" placeholder="минуты" class="form-control"> <span class="text-danger" ng-show="courseForm.duration.$error.required && (courseForm.duration.$touched || courseForm.$submitted)">*Это поле обязательно</span> <span class="text-danger" ng-show="courseForm.duration.$error.number && (courseForm.duration.$touched || courseForm.$submitted)">Введите количество минут числом</span> <span class="text-danger" ng-show="courseForm.duration.$error.min && (courseForm.duration.$touched || courseForm.$submitted)">Минимальное значение 1 минута</span> </div> </div> <div class="form-group"> <label class="col-sm-2">Авторы</label> <div class="col-sm-10"> <list-input ng-model="ctrl.course.authors" source="ctrl.availableAuthors" choose-callback="ctrl.course.srNotifyAuthorSelected(author)" remove-callback="ctrl.course.srNotifyAuthorRemoved(author)"> </list-input> </div> <div class="col-sm-12">{{ ctrl.course.authors.length }} {{ ctrl.course.authors.length | getEnding:[\'автор\', \'автора\', \'авторов\'] }}<span ng-if="ctrl.course.authors.length">:</span> {{ ctrl.course.authors.join(\', \') }} </div> </div> <div class="row"> <div class="text-danger col-sm-push-2 col-sm-10" ng-show="!ctrl.course.authors.length && courseForm.$submitted"> *Укажите хотя бы одного автора </div> </div> <div class="form-group buttons"> <div class="col-sm-push-2 col-sm-10"> <button type="submit" class="btn btn-success">Сохранить</button> <a class="btn btn-danger" href="#/courses">Отмена</a> </div> </div> </form> </div> <div class="container not-found-container" ng-if="ctrl.courseNotFound"><h1>404</h1> <p role="alert">The resource you are looking for is not here...</p></div>'),a.put("views/courses-list.html",'<div class="container"> <div class="top-block container-fluid"> <div class="row"> <form class="form-inline col-sm-6 pull-left" novalidate ng-submit="courses.filterCourses()"> <div class="form-group"> <input type="text" placeholder="Название курса" ng-model="courses.filterString" class="form-control"> </div> <button type="submit" class="btn btn-primary" ng-disabled="!courses.filterString">Найти</button> </form> <div class="col-sm-6 course-add-btn"><a href="#/courses/new" class="btn-success btn"><span class="glyphicon glyphicon-plus-sign"></span> Добавить курс</a></div> </div> </div> <div class="courses"> <div ng-repeat="course in courses.list | filter:{title:courses.searchCourseTitle} | orderBy: \'-date\'" class="course-item-container" ng-show="courses.list.length"> <div class="course-item"> <div class="container-fluid outer-border"> <div class="col-sm-9"> <div class="header-row"> <h4 class="course-name"> {{ course.title }} </h4> <div class="course-duration"> {{ course.duration | timeFormatter }} </div> <div class="release-date pull-right">{{ course.date | date:\'yyyy-MM-dd\' }}</div> </div> <div class="body-block"> <p> {{ course.description | limitTo:350 }} </p> <p><strong>Авторы:</strong> {{ course.authors.join(\', \') }} </p> </div> </div> <div class="col-sm-3 actions"> <a ng-href="#/courses/{{ course.id }}" class="btn btn-lg btn-default btn-block">Редактировать</a> <button class="btn btn-lg btn-danger btn-block" ng-click="courses.congfirmDelete(course)">Удалить</button> </div> </div> </div> </div> <div ng-hide="courses.list.length" class="animate-hide">Пока не добавлено ни одного курса.</div> </div> </div> <ng-include src="\'views/confirm-delete.html\'"></ng-include>'),a.put("views/login.html",'<div class="container login-container"> <form novalidate name="loginForm" ng-submit="login.doLogin()" class="form-horizontal"> <div class="alert alert-warning" role="alert" ng-show="login.accessDenied">Неправильный логин или пароль</div> <div ng-class="{ \'has-error\': loginForm.login.$invalid && loginForm.login.$dirty, \'form-group\': true }"> <label for="login" class="col-sm-2 loginController">Логин</label> <div class="col-sm-8"><input placeholder="Логин" name="login" required type="text" ng-pattern="/^[a-zA-Z]+$/" ng-model="login.name" class="form-control" id="login" ng-blur="loginForm.login.$setDirty()"></div> <div class="col-sm-2 text-danger" ng-show="loginForm.login.$error.required && loginForm.login.$dirty">*введите </div> </div> <div ng-class="{ \'has-error\': loginForm.password.$invalid && loginForm.password.$dirty, \'form-group\': true }"> <label for="login" class="col-sm-2 loginController">Пароль</label> <div class="col-sm-8"><input name="password" type="password" placeholder="Пароль" ng-pattern="/^[a-zA-Z0-9]+$/" required ng-model="login.password" class="form-control" id="password" ng-blur="loginForm.password.$setDirty()" ng-focus="loginForm.password.focus = true"></div> <div class="col-sm-2 text-danger" ng-show="loginForm.password.$error.required && loginForm.password.$dirty"> *введите </div> </div> <div class="form-group"> <div class="submit-btn-container col-sm-push-2 col-sm-10"> <button type="submit" class="btn btn-default" ng-disabled="loginForm.$invalid">Войти</button> </div> </div> <div>Доступные пользователи:</div> <ul> <li ng-repeat="user in login.allUsers"> {{user.login}}/{{user.password}} </li> </ul> <div class="alert alert-danger" ng-show="loginForm.login.$error.pattern"> Поле «Логин» может содержать, только латинские буквы. </div> <div class="alert alert-danger" ng-show="loginForm.password.$error.pattern"> Поле «Пароль» может содержать, латинские буквы и цифры. </div> </form> </div>'),a.put("views/user-block.html",'<div class="login-block"> <span class="name">{{ auth.userName }}</span><br> <a ng-click="auth.logOut()">Выход</a> </div>')}]);