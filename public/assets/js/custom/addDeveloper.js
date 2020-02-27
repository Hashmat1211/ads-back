// alert('hello')
$(document).ready(function () {
    console.log('inside add developer')

})
function addDeveloper() {
    console.log('inside add developer');
    var data = $('#addDeveloper').serialize();
    alert(data)
    $.post("developers/add", data, function (data) {
        window.location.href = "viewDevelopers.html";
    }
    );

}