$(document).ready(function () {

    // console.log($('#val-username').val) 
    console.log('update document is ready');
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    // console.log('id', typeof id)
    $.get(`/clients/getSingleClient/${id}`, function (data) {
        console.log('data ', data);
        if (!data) {
            window.location.href = "../viewClients.html";
        }
        const client = data.client;
        $('#email').val(client.email);
        $('#name').val(client.name);
        $('#website').val(client.website);
        $('#contact').val(client.contact);
        $('#details').val(client.details);
        //line............. 
    })
})

function updateClient() {
    console.log('inside update client');
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    var prepObj = {};

    if ($('#contact').val()) {
        prepObj['contact'] = Number($('#contact').val());
    }
    if ($('#name').val()) {
        prepObj['name'] = $('#name').val();
    }
    if ($('#date').val()) {
        prepObj['date'] = $('#date').val();
    }
    if ($('#details').val()) {
        prepObj['details'] = $('#details').val();
    }
    if ($('#valueGenerated').val()) {
        prepObj['valueGenerated'] = $('#valueGenerated').val();
    }


    console.log(prepObj);
    const data = JSON.stringify(prepObj);
    console.log(data);
    // alert(prepObj);
    $.ajax({
        url: `../clients/update/${id}`,
        data: data,
        type: 'PATCH',
        contentType: 'application/json'
    })
}
