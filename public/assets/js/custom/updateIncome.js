$(document).ready(function () {

    // console.log($('#val-username').val) 
    console.log('update document is ready');
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    // console.log('id', typeof id)
    $.get(`/incomes/getSingleIncome/${id}`, function (data) {
        console.log('data ', data);
        if (!data) {
            window.location.href = "../viewIncomes.html";
        }
        const income = data.income;
        console.log('data in incomes', income.hours)
        $('#hours').val(income.hours);
        $('#amount').val(income.amount);
        $('#startDate').val(income.startDate);
        $('#endDate').val(income.endDate);
        $('#endDate').val(income.endDate);
        //line............. 
    })
    getSelectorsFromDB();
})

function updateIncome() {
    console.log('inside update income');
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    var prepObj = {};

    if ($('#hours').val()) {
        prepObj['hours'] = Number($('#hours').val());
    }
    if ($('#amount').val()) {
        prepObj['amount'] = Number($('#amount').val());
    }
    if ($('#startDate').val()) {
        prepObj['startDate'] = $('#startDate').val();
    }
    if ($('#endDate').val()) {
        prepObj['endDate'] = $('#endDate').val();
    }
    if ($('#client').val()) {
        prepObj['client'] = $('#client').val();
    }
    if ($('#project').val()) {
        prepObj['project'] = $('#project').val();
    }
    if ($('#developer').val()) {
        prepObj['developer'] = $('#developer').val();
    }

    console.log(prepObj);
    const data = JSON.stringify(prepObj);
    console.log(data);
    // alert(prepObj);
    $.ajax({
        url: `../incomes/update/${id}`,
        data: data,
        type: 'PATCH',
        contentType: 'application/json'
    })
}

function getSelectorsFromDB() {
    $.get("../projects/getAllProjects", function (data) {
        const projects = data.projects;
        $.each(projects, function (i, v) {
            $('#project').append(`
                <option value='${v._id}'>${v.name}
                </option>
            `)
        })
    });

    $.get("../clients/getAllClients", function (data) {
        const clients = data.clients;
        $.each(clients, function (i, v) {
            $('#client').append(`
                <option value='${v._id}'>${v.name}
                </option>
            `)
        })
    });

    $.get("../developers/getAllDevelopers", function (data) {
        const developers = data.developers;
        $.each(developers, function (i, v) {
            $('#developer').append(`
                <option value='${v._id}'>${v.name}
                </option>
            `)
        })
    });
}