$(document).ready(function () {

    // console.log($('#val-username').val) 
    console.log('update developer document is ready');
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    // console.log('id', typeof id)
    $.get(`/developers/getSingleDeveloper/${id}`, function (data) {
        console.log('data ', data);
        if (!data) {
            window.location.href = "../viewDeveloper.html";
        }
        const developer = data.developer;
        $('#email').val(developer.email);
        $('#name').val(developer.name);
        $('#date').val(developer.date);
        $('#details').val(developer.details);
        $('#valueGenerated').val(developer.valueGenerated);
        //line............. 
    })
})

function updateDeveloper() {
    console.log('inside update developer');
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    var prepObj = {};

    if ($('#email').val()) {
        prepObj['email'] = Number($('#email').val());
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
        url: `../developers/update/${id}`,
        data: data,
        type: 'PATCH',
        contentType: 'application/json'
    })
}
