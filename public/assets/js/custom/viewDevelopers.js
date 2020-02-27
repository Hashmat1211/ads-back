// alert('hello')
$(document).ready(function () {

    // console.log($('#val-username').val) 
    console.log('document update developer is ready')
    viewDevelopersDataTo();
})
function viewDevelopersDataTo() {
    // 

    $.get("/developers/getAllDevelopers", function (data) {
        console.log('data in developers', data)
        const developers = data.developers;
        $('#allDevelopers').html(data.totalDevelopers);
        let rows = '';
        $.each(developers, function (i, v) {
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
                ${v.date}
        </td>
        <td>
            <a >${v.salary}</a>
        </td>
        <td>
            <a >${v.website}</a>
        </td>
         
        <td class="text-center">
            <div class="btn-group">
                <button  onclick="document.location.href='updateDeveloper.html/${v._id}';" class="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit">
                    <i class="fa fa-pencil"></i>
                </button>
                <button onClick='deleteDeveloper(${i},"${v._id}")' type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" title="Delete">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </td>
        </tr>`;
        });
        $('#data').append(rows)
    })
}

function deleteDeveloper(domId, developer_id) {
    // alert(id) 
    $(`#${domId}`).remove();
    $.ajax({
        url: `http://localhost:5000/developers/delete/${developer_id}`,
        type: 'DELETE',  //<-----this should have to be an object.
        contentType: 'application/json',  // <---add this
        dataType: 'text',                // <---update this
        success: function (result) { console.log('result ', result) },
        error: function (result) { console.log('result ', result) }
    });
    viewDevelopersDataTo();
}