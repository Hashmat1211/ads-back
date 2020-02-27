// alert('hello')
$(document).ready(function () {
    console.log('inside add project')
})
function addProject() {
    console.log('inside add Project');
    var data = $('#add').serialize();
    $.post("projects/add", data, function (data) {
        window.location.href = "viewProjects.html";
    }
    );

}