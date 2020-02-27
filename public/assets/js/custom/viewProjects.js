// alert('hello')
$(document).ready(function () {

    // console.log($('#val-username').val) 
    console.log('document is ready')
    viewProjectsDataTo();
})
function viewProjectsDataTo() {
    // 

    $.get("/projects/getAllProjects", function (data) {
        console.log('data ', data)
        const projects = data.projects;
        $('#allProjects').html(data.totalProjects)
        let rows = '';
        $.each(projects, function (i, v) {
            console.log(i, v)

            rows += `<tr id="${i}" role='row' class='odd'>`;
            rows += ` 
        <td class="d-none d-sm-table-cell">
                <span class="badge badge-success">${v.status}</span>
        </td>
         <td class="d-none d-sm-table-cell">
                <span>${v.name}</span>
        </td> 
        <td class="d-none d-sm-table-cell">
                ${v.date}
        </td>
        <td>
            <a >${v.details}</a>
        </td>
        <td>
        <a >${v.amount}</a>
    </td> 
         
        <td class="text-center">
            <div class="btn-group">
                <button  onclick="document.location.href='updateProject.html/${v._id}';" class="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit">
                    <i class="fa fa-pencil"></i>
                </button>
                <button onClick='deleteProject(${i},"${v._id}")' type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" title="Delete">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </td>
        </tr>`;
        });

        $('#data').append(rows)
    });
}

function deleteProject(domId, project_id) {
    // alert(id) 
    $(`#${domId}`).remove();
    $.ajax({
        url: `http://localhost:5000/projects/delete/${project_id}`,
        type: 'DELETE',  //<-----this should have to be an object.
        contentType: 'application/json',  // <---add this
        dataType: 'text',                // <---update this
        success: function (result) { console.log('result ', result) },
        error: function (result) { console.log('result ', result) }
    });
    viewProjectsDataTo();
}