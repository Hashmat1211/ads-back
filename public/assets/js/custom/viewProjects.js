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
        $.each(projects, function (i, v) {
            console.log(i, v)
            $('#projectsTable >tbody:last-child')
                .append('<tr>').append(` <td>
                <a
                    class="font-w600"
                    href="be_pages_ecom_project_edit.html"
                >${v._id}</a
                >
            </td>`)
                .append(`<td class="d-none d-sm-table-cell">
                <span class="badge badge-success">${v.status}</span>
            </td>`)
                .append(`<td class="d-none d-sm-table-cell">
                <span>${v.name}</span>
            </td>`)
                .append(` <td class="d-none d-sm-table-cell">
                ${v.date}
        </td>`)
                .append(` <td>
                <a href="be_pages_ecom_project_edit.html">${v.details}</a>
            </td>`)
                .append(` <td class="text-center">
                <span class="text-black">${v.amount}</span>
            </td>`)
                .append(`<td class="text-center">
            <div class="btn-group">
                <button type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit">
                    <i class="fa fa-pencil"></i>
                </button>
                <button type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" title="Delete">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </td>`)
                .append('<tr>');
        });
    });
}
function showProducts() {

}















{/* <tr> 
    <td>
        <a
            class="font-w600"
            href="be_pages_ecom_project_edit.html"
        >PID.412</a
        >
    </td>
    <td class="d-none d-sm-table-cell">
        <span class="badge badge-success">Available</span>
    </td>
    <td class="d-none d-sm-table-cell">
        <span>project1</span>
    </td>
    <td class="d-none d-sm-table-cell">
        2017/09/15
</td>
    <td>
        <a href="be_pages_ecom_project_edit.html">Project #12</a>
    </td>

    <td class="text-center">
        <span class="text-black">$43</span>
    </td>
</tr>

*/}