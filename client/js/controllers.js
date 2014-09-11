angular.module('shopListCtrl', [])
   .controller('shopCtrl', [ '$scope', 'shopListFactory', function($scope, shopListFactory ) {

      $scope.lists = [];
      $scope.isEditable = [];

      // get all Todo on Load
      shopListFactory.getList().then(function(data) {
         $scope.lists = data.data;
      });

      //save to server
      $scope.save = function($event) {
         if ($event.which === 13 && $scope.listInput) {

            shopListFactory.saveList({
               "list": $scope.listInput,
               "isCompleted": false
            }).then(function(data){
               $scope.lists.push(data.data);
            });
            $scope.listInput = '';
         }
      };

      //update the status of the Todo
      $scope.updateStatus = function($event, _id, i) {
         var cbk = $event.target.checked;
         var _t = $scope.lists[i];

         shopListFactory.updateList({
            _id: _id,
            isCompleted: cbk,
            list: _t.list
         }).then(function(data){
            if (data.data.updatedExisting){
                  _t.isCompleted = cbk;
            } else {
               alert('Oops something went wrong!');
            }
         });
      };

      //Update the edited List
      $scope.edit = function($event, i){
         if($event.which === 13 && $event.target.value.trim()){
            var _t = $scope.lists[i];
            shopListFactory.updateList({
               _id: _t._id,
               list: $event.target.value.trim(),
               isCompleted: _t.isCompleted
            }).then(function(data) {
               if (data.data.updatedExisting) {
                  _t.list = $event.target.value.trim();
                  $scope.isEditable[i] = false;
               }  else {
                     alert('Oops something went wrong');
                  }
            });
         }
      };

      //Delete a List
      $scope.delete = function(i) {
         shopListFactory.deleteList($scope.lists[i]._id).then(function(data){
            if (data.data) {
               $scope.lists.splice(i, 1);
            }
         });
      };
   }]);  