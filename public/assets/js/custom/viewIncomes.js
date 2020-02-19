// alert('hello')
$(document).ready(function () {

    // console.log($('#val-username').val) 
    console.log('document is ready')
    viewIncomesDataTo();
})
function viewIncomesDataTo() {
    // 
    let rows = '';

    $.get("/incomes/getAllIncomes", function (data) {
        // console.log('data in incomes', data)
        const incomes = data.incomes;
        $('#allIncomes').html(data.totalIncomes)
        $.each(incomes, function (i, v) {
            rows += `<tr id="${i}" role='row' class='odd'>`;
            rows += ` <td>
            <a
                class="font-w600"
                href="be_pages_ecom_project_edit.html"
            >${v._id}</a
            >
        </td>
        <td class="d-none d-sm-table-cell">
                <span class="badge badge-success">${v.hours}</span>
        </td>
         <td class="d-none d-sm-table-cell">
                <span>${v.developer}</span>
        </td> 
        <td class="d-none d-sm-table-cell">
                ${v.client}
        </td>
        <td>
            <a href="be_pages_ecom_project_edit.html">${v.project}</a>
        </td>
        <td class="text-center">
                <span class="text-black">${v.details}</span>
        </td>
        <td class="text-center">
                <span class="text-black">${v.startDate}</span>
        </td>
        <td class="text-center">
                <span class="text-black">${v.endDate}</span>
        </td>
        <td class="text-center">
                <span class="text-black">${v.amount}</span>
        </td>
        <td class="text-center">
            <div class="btn-group">
                <button  onclick="document.location.href='updateIncome.html/${v._id}';" class="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit">
                    <i class="fa fa-pencil"></i>
                </button>
                <button onClick='deleteIncome(${i},"${v._id}")' type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" title="Delete">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </td>
        </tr>`;
        });
        $('#data').append(rows);


    });
}

function deleteIncome(domId, income_id) {
    // alert(id) 
    $(`#${domId}`).remove();
    $.ajax({
        url: `http://localhost:5000/incomes/delete/${income_id}`,
        type: 'DELETE',  //<-----this should have to be an object.
        contentType: 'application/json',  // <---add this
        dataType: 'text',                // <---update this
        success: function (result) { console.log('result ', result) },
        error: function (result) { console.log('result ', result) }
    });
    viewIncomesDataTo();

}

function updateIncome(income_id) {

}
