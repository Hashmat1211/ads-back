// alert('hello')
$(document).ready(function () {

    // console.log($('#val-username').val) 
    console.log('document is ready')
    viewDevelopersDataTo();
})
function viewDevelopersDataTo() {
    // 

    $.get("/developers/getAllDevelopers", function (data) {
        console.log('data in developers', data)
        const developers = data.developers;
        $('#allDevelopers').html(data.totalDevelopers)
        $.each(developers, function (i, v) {
            console.log(i, v)
            $('#developersTable >tbody:last-child')
                .append('<tr>').append(` <td>
                <a
                    class="font-w600"
                    href="be_pages_ecom_project_edit.html"
                >${v._id}</a
                >
            </td>`)
                .append(`<td class="d-none d-sm-table-cell">
                <span class="badge badge-success">${v.email}</span>
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
                .append('<tr>');
        });
    });
}


