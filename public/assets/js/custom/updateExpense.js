$(document).ready(function () {

    // console.log($('#val-userpayee').val) 
    console.log('update expense document is ready');
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    // console.log('id', typeof id)
    $.get(`/expenses/getSingleExpense/${id}`, function (data) {

        console.log('data ', data);
        if (!data) {
            window.location.href = "../viewExpenses.html";
        }
        const expense = data.expense;
        $('#type').val(expense.type);
        $('#payee').val(expense.payee);
        $('#date').val(expense.date);
        $('#details').val(expense.details);
        $('#amount').val(expense.amount);
        //line............. 
    })
})

function updateExpense() {
    console.log('inside update expense');
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    var prepObj = {};

    if ($('#type').val()) {
        prepObj['type'] = $('#type').val();
    }
    if ($('#amount').val()) {
        prepObj['amount'] = Number($('#amount').val());
    }
    if ($('#date').val()) {
        prepObj['date'] = $('#date').val();
    }
    if ($('#payee').val()) {
        prepObj['payee'] = $('#payee').val();
    }



    console.log(prepObj);
    const data = JSON.stringify(prepObj);
    console.log(data);
    // alert(prepObj);
    $.ajax({
        url: `../expenses/update/${id}`,
        data: data,
        type: 'PATCH',
        contentType: 'application/json'
    })
}
