// alert('hello')
$(document).ready(function () {
    console.log('inside add client')

})
function addClient() {
    console.log('inside add client');
    var data = $('#addClient').serialize();
    alert(data)
    $.post("clients/add", data
    );
}