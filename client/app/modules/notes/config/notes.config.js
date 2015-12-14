(function () {
  'use strict';
  angular
    .module('com.module.notes')
    .run(function ($rootScope, Note, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Notes'), 'app.notes.list', 'fa-file-o');
      //$rootScope.addMenu(gettextCatalog.getString('Timeline'), 'app.notes.timeline', 'fa-history');

      Note.find(function (data) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Notes'), 'bg-green', 'ion-clipboard', data.length, 'app.notes.list');
      });

    });

})();
