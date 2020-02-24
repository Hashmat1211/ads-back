// alert('hello')


$(document).ready(function () {
    console.log('inside add income')
    getSelectorsFromDB();
})

function addIncome() {
    console.log('inside add income');
    const hours = $('#hours').val();
    const amount = $('#amount').val();
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();

    const developer = $('#developer').val();;
    console.log(developer)
    const client = $('#client').val();;
    console.log(client)
    const project = $('#project').val();
    console.log('projectid ', project);



    const prepObj = {
        "developer": `${developer}`,
        "client": `${client}`,
        "project": `${project}`,
        "hours": hours,
        "amount": amount,
        "startDate": `${startDate}`,
        "endDate": `${endDate}`
    }

    $.post("incomes/add", prepObj
    );


}

function getSelectorsFromDB() {
    $.get("projects/getAllProjects", function (data) {
        const projects = data.projects;
        $.each(projects, function (i, v) {
            $('#project').append(`
                <option value='${v._id}'>${v.name}
                </option>
            `)
        })
    });

    $.get("clients/getAllClients", function (data) {
        const clients = data.clients;
        $.each(clients, function (i, v) {
            $('#client').append(`
                <option value='${v._id}'>${v.name}
                </option>
            `)
        })
    });

    $.get("developers/getAllDevelopers", function (data) {
        const developers = data.developers;
        $.each(developers, function (i, v) {
            $('#developer').append(`
                <option value='${v._id}'>${v.name}
                </option>
            `)
        })
    });
}

function getClientIdByNameFromDB(name) {
    // const clientId = $.post("clients/getClientIdByClientName", name) 
    // console.log('clientId ', clientId);
    $.post("clients/getClientIdByClientName",
        {
            name: name,
        },
        function (data, status) {
            console.log("Data: " + data.client._id + "\nStatus: " + status);
        });
}
function getDeveloperIdByNameFromDB(name, cb) {
    // let id = {}
    $.post("developers/getDeveloperIdByDeveloperName",
        {
            name: name,
        },
        function (data, status) {
            console.log("Data:... " + data.developer._id + "\nStatus: " + status);

            cb(null, data.developer._id);
            // getProjectIdByNameFromDB()
        });

}
function getProjectIdByNameFromDB(name) {
    $.post("projects/getProjectIdByProjectName",
        {
            name: name,
        },
        function (data, status) {
            console.log("Data: " + data.project._id + "\nStatus: " + status);
        });
}