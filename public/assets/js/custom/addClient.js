// alert('hello')
$(document).ready(function () {
    console.log('inside add client')

})
function addClient() {
    console.log('inside add client');
    var data = $('#addClient').serialize();
    $.post("clients/add", data, function (data) {

        window.location.href = "viewClients.html";
    }
    );
}