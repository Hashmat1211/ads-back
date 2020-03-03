// alert('hello')
$(document).ready(function () {

    // console.log($('#val-username').val) 
    console.log('document expense update is ready')
    viewExpensesDataTo();
})
function viewExpensesDataTo() {
    // 

    $.get("/expenses/getAllExpenses", function (data) {
        console.log('data in expenses', data)
        let rows = '';
        const expenses = data.expenses;
        $('#allExpenses').html(data.totalExpenses)
        $.each(expenses, function (i, v) {
            console.log(i, v)
            let date = v.date;
            date = date.substr(0, 10);

            rows += `<tr id="${i}" role='row' class='odd'>`;
            rows += ` <td>
            <a
                class="font-w600" 
            >${date}</a
            >
        </td>
        <td class="d-none d-sm-table-cell">
                <span class="badge badge-success">${v.type}</span>
        </td>
         <td class="d-none d-sm-table-cell">
                <span>${v.payee}</span>
        </td> 
        <td >
        ${v.amount} 
    </td> 
        <td class="d-none d-sm-table-cell">
            ${v.details} 
        </td>
        
         
        <td class="text-center">
            <div class="btn-group">
                <button  onclick="document.location.href='updateExpense.html/${v._id}';" class="btn btn-sm btn-secondary" data-toggle="tooltip" title="Edit">
                    <i class="fa fa-pencil"></i>
                </button>
                <button onClick='deleteExpenses(${i},"${v._id}")' type="button" class="btn btn-sm btn-secondary" data-toggle="tooltip" title="Delete">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </td>
        </tr>`;
        });
        $('#data').append(rows)
    });
}

function deleteExpenses(domId, income_id) {
    // alert(id) 
    $(`#${domId}`).remove();
    $.ajax({
        url: `http://localhost:5000/expenses/delete/${income_id}`,
        type: 'DELETE',  //<-----this should have to be an object.
        contentType: 'application/json',  // <---add this
        dataType: 'text',                // <---update this
        success: function (result) { console.log('result ', result) },
        error: function (result) { console.log('result ', result) }
    });
    viewIncomesDataTo();
}


