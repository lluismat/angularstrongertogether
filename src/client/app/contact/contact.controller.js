(function() {
  'use strict';

  angular
    .module('app.contact')
    .controller('ContactController', ContactController);

    ContactController.$inject = ['$translatePartialLoader', '$q', 'dataservice','$state'];
  /* @ngInject */
  function ContactController($translatePartialLoader, $q, dataservice, $state) {
    var vm = this;

    vm.title = 'Contact';
    vm.inputName = '';
    vm.inputEmail = '';
    vm.inputSubject = '';
    vm.inputMessage = '';
    vm.sendContact = sendContact;

    $translatePartialLoader.addPart('contact');

    function sendContact() {
      console.log('sendContact');
      var data = {
        name: vm.inputName,
        from: vm.inputEmail,
        to: '',
        subject: vm.inputSubject,
        text: vm.inputMessage,
        type:'admin'
      };

      dataservice.sendemail(data).then(function(response) {

        if (response) {
            data.type='user';
            console.log(data);
            dataservice.sendemail(data).then(function (response) {

                if (response) {
                    vm.resultMessageOk = 'Su email ha sido enviado correctamente';
                    vm.inputName = '';
                    vm.inputEmail = '';
                    vm.inputSubject = '';
                    vm.inputMessage = '';
                    $state.go('main');
                } else {
                    vm.resultMessageFail =
                            'Ha habido un error al enviar el email, intentelo mas tarde';
                }
            });
        } else {
            vm.resultMessageFail =
                    'Ha habido un error al enviar el email, intentelo mas tarde';
        }
      });

    }

  }

})();
