// alert('hello')
$(document).ready(function () {
    console.log('inside add income')
    $.get("projects/getAllProjects", function (data) {
        const projects = data.projects;
        $.each(projects, function (i, v) {
            $('#project').append(`
                <option value='${v.name}'>${v.name}
                </option>
            `)
        })
    });

    $.get("clients/getAllClients", function (data) {
        const clients = data.clients;
        $.each(clients, function (i, v) {
            $('#client').append(`
                <option value='${v.name}'>${v.name}
                </option>
            `)
        })
    });

    $.get("developers/getAllDevelopers", function (data) {
        const developers = data.developers;
        $.each(developers, function (i, v) {
            $('#developer').append(`
                <option value='${v.name}'>${v.name}
                </option>
            `)
        })
    });
})
function addIncome() {
    console.log('inside add income');
    var data = $('#addIncome').serialize();
    data.split('developer=')[1].split('&')[0];
    console.log(data.split('developer=')[1].split('&')[0])
    alert(data)
    // $.post("incomes/add", data
    // );


}