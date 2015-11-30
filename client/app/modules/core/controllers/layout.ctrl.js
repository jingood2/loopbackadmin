(function () {
  'use strict';
  angular
    .module('com.module.core')
  /**
   * @ngdoc function
   * @name com.module.core.controller:LayoutCtrl
   * @description Layout controller
   * @requires $scope
   * @requires $rootScope
   * @requires CoreService
   * @requires gettextCatalog
   **/
    .controller('LayoutCtrl', function ($scope, $rootScope, $cookies, CoreService, gettextCatalog) {

      // angular translate
      $scope.locale = {
        isopen: false
      };

      $scope.locales = $rootScope.locales;
      $scope.selectLocale = $rootScope.locale;

      $scope.setLocale = function (locale) {
        // set the current lang
        $scope.locale = $scope.locales[locale];
        $scope.selectLocale = $scope.locale;
        $rootScope.locale = $scope.locale;
        $cookies.lang = $scope.locale.lang;

        // You can change the language during runtime
        $scope.locale.isopen = !$scope.locale.isopen;

        gettextCatalog.setCurrentLanguage($scope.locale.lang);
      };

      $scope.appName = 'Call Planner';
      $scope.apiUrl = CoreService.env.apiUrl;
      $scope.appTheme = 'skin-black';
      $scope.appThemes = [
        {
          'name': 'Black',
          'class': 'skin-black'
        },
        {
          'name': 'Blue',
          'class': 'skin-blue'
        }
      ];
      $scope.appLayout = '';
      $scope.appLayouts = [
        {
          'name': 'Fixed',
          'class': 'not-fixed'
        },
        {
          'name': 'Scrolling',
          'class': 'not-fixed'
        }
      ];

      $scope.toggleSidebar = function () {
        var $ = angular.element;

        var screenSizes = {
              xs: 480,
              sm: 768,
              md: 992,
              lg: 1200
            }


        if ($(window).width() > (screenSizes.sm - 1)) {
          if ($("body").hasClass('sidebar-collapse')) {
            //$("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
            $("body").removeClass('sidebar-collapse');
          } else {
            //$("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
            $("body").addClass('sidebar-collapse');
          }
        }
        //Handle sidebar push menu for small screens
        else {
          if ($("body").hasClass('sidebar-open')) {
            //$("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
            $("body").removeClass('sidebar-open').removeClass('sidebar-collapse');
          } else {
            //$("body").addClass('sidebar-open').trigger('expanded.pushMenu');
            $("body").addClass('sidebar-open');
          }
        }

        /*
        if ($(window).width() <= 992) {
          $('.row-offcanvas').toggleClass('active');
          $('.left-side').removeClass('collapse-left');
          $('.right-side').removeClass('strech');
          $('.row-offcanvas').toggleClass('relative');
        } else {
          // Else, enable content streching
          $('.left-side').toggleClass('collapse-left');
          $('.right-side').toggleClass('strech');
        }
        */
      };

      $scope.expandOnHover = function() {

        var $ = angular.element;

        var screenSizes = {
              xs: 480,
              sm: 768,
              md: 992,
              lg: 1200
            }

        var screenWidth = screenSizes.sm - 1;    

        if ($('body').hasClass('sidebar-mini')
              && $("body").hasClass('sidebar-collapse')
              && $(window).width() > screenWidth) {
          $("body").removeClass('sidebar-collapse');
        }      

        /*
        if ($('body').hasClass('sidebar-mini')
                && $(window).width() > screenWidth) {
          $('body').addClass('sidebar-collapse');
        }
        */
      };

      $scope.collapseOnLeave = function() {

        var $ = angular.element;

        var screenSizes = {
              xs: 480,
              sm: 768,
              md: 992,
              lg: 1200
            }

        var screenWidth = screenSizes.sm - 1;

        if ($('body').hasClass('sidebar-mini')
                && $(window).width() > screenWidth) {
          $('body').addClass('sidebar-collapse');
        }

      }

      $scope.settings = $rootScope.settings;

      $rootScope.loadSettings();

    });

})();
