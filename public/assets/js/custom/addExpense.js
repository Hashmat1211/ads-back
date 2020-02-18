// alert('hello')
$(document).ready(function () {
    console.log('inside add expense')

})
function addExpense() {
    console.log('inside addExpense');
    var data = $('#addExpense').serialize();
    alert(data)
    $.post("expenses/add", data
    );

}