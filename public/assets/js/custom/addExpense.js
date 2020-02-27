// alert('hello')
$(document).ready(function () {
    console.log('inside add expense')

})
function addExpense() {
    console.log('inside addExpense');

    const payee = $('#payee').val();
    const type = $('#type').val();
    const amount = Number($('#amount').val());
    const date = $('#date').val();
    const details = $('#details').val()
    console.log(typeof amount)
    const prepObj = {
        "payee": `${payee}`,
        "type": `${type}`,
        "amount": Number(amount),
        "date": `${date}`,
        "details": `${details}`
    }
    console.log('prep ', prepObj)

    $.post("expenses/add", prepObj, function (data) {
        window.location.href = "viewExpenses.html";
    }
    );

}