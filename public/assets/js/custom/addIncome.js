// alert('hello')
$(document).ready(function () {
    console.log('inside add income')

})
function addIncome() {
    console.log('inside add income');
    var data = $('#addIncome').serialize();
    alert(data)
    $.post("incomes/add", data
    );

}