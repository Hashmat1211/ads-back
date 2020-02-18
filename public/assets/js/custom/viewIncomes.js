// alert('hello')
$(document).ready(function () {

    // console.log($('#val-username').val) 
    console.log('document is ready')
    viewIncomesDataTo();
})
function viewIncomesDataTo() {
    // 

    $.get("/incomes/getAllIncomes", function (data) {
        console.log('data in incomes', data)
        const incomes = data.incomes;
        $('#allIncomes').html(data.totalIncomes)
        $.each(incomes, function (i, v) {
            console.log(i, v)
            $('#incomesTable >tbody:last-child')
                .append('<tr>').append(` <td>
                <a
                    class="font-w600"
                    href="be_pages_ecom_project_edit.html"
                >${v._id}</a
                >
            </td>`)
                .append(`<td class="d-none d-sm-table-cell">
                <span class="badge badge-success">${v.hours}</span>
            </td>`)
                .append(`<td class="d-none d-sm-table-cell">
                <span>${v.developer}</span>
            </td>`)
                .append(` <td class="d-none d-sm-table-cell">
                ${v.client}
        </td>`)
                .append(` <td>
                <a href="be_pages_ecom_project_edit.html">${v.project}</a>
            </td>`)
                .append(` <td class="text-center">
                <span class="text-black">${v.details}</span>
            </td>`)
                .append(` <td class="text-center">
                <span class="text-black">${v.startDate}</span>
            </td>`)
                .append(` <td class="text-center">
                <span class="text-black">${v.endDate}</span>
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


