// alert('hello')
$(document).ready(function () {

    // console.log($('#val-username').val) 
    console.log('document is ready')
    viewClientsDataTo();
})
function viewClientsDataTo() {
    // 
    let rows = '';
    $.get("/clients/getAllClients", function (data) {
        console.log('data ', data)
        const clients = data.clients;
        $('#allClients').html(data.totalClients)
        $.each(clients, function (i, v) {
            console.log(i, v)

            rows += `<tr id="${i}" role='row' class='odd'>`;
            rows += `  
        <td class="d-none d-sm-table-cell">
                <span class="badge badge-success">${v.email}</span>
        </td>
         <td class="d-none d-sm-table-cell">
                <span>${v.name}</span>
        </td> 
        <td class="d-none d-sm-table-cell">
                <span>${v.website}</span>
        </td>  
        <td class="text-left">
                <span class="text-black">${v.contact}</span>
        </td>
        <td>
            <a >${v.details}</a>
        </td>
         
        
        
        <td class="text-center">
            <div class="btn-group">
                <button  onclick="document.location.href='updateClient.html/${v._id}';" class="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit">
                    <i class="fa fa-pencil"></i>
                </button>
                <button onClick='deleteClient(${i},"${v._id}")' type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" title="Delete">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </td>
        </tr>`;
        });
        $('#data').append(rows);

    });
}

function deleteClient(domId, client_id) {
    // alert(id) 
    $(`#${domId}`).remove();
    $.ajax({
        url: `http://localhost:5000/clients/delete/${client_id}`,
        type: 'DELETE',  //<-----this should have to be an object.
        contentType: 'application/json',  // <---add this
        dataType: 'text',                // <---update this
        success: function (result) { console.log('result ', result) },
        error: function (result) { console.log('result ', result) }
    });
    viewClientsDataTo();

}










