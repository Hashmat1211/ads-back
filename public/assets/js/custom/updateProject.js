$(document).ready(function () {

    // console.log($('#val-username').val) 
    console.log('update project document is ready');
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    // console.log('id', typeof id)
    $.get(`/projects/getSingleProject/${id}`, function (data) {
        if (!data) {
            window.location.href = "../viewProjects.html";
        }
        const project = data.project;
        $('#name').val(project.name);
        //line............. 
    })
})

function updateProject() {
    console.log('inside update project');
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    var prepObj = {};


    if ($('#name').val()) {
        prepObj['name'] = $('#name').val();
    }
    if ($('#details').val()) {
        prepObj['details'] = $('#details').val();
    }


    console.log(prepObj);
    const data = JSON.stringify(prepObj);
    console.log(data);
    // alert(prepObj);
    $.ajax({
        url: `../projects/update/${id}`,
        data: data,
        type: 'PATCH',
        contentType: 'application/json'
    })
}
