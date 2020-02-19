$(document).ready(function () {

    // console.log($('#val-username').val) 
    console.log('update document is ready');
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    // console.log('id', typeof id)
    $.get(`/incomes/getSingleIncome/${id}`, function (data) {
        const income = data.income;
        console.log('data in incomes', income.hours)
        $('#hours').val(income.hours);
        $('#amount').val(income.amount);
        $('#startDate').val(income.startDate);
        $('#endDate').val(income.endDate);
    })
})

function updateIncome() {
    console.log('inside update income');
    // let url = window.location.pathname;
    // let id = url.substring(url.lastIndexOf('/') + 1);
    // let data = $('#addIncome').serialize();
    // let datainJson = JSON.parse(data);
    // console.log(datainJson);
    // console.log(typeof datainJson)
    // alert(data);
    // $.ajax({
    //     url: `incomes/update/${id}`,
    //     data: ,
    //     type: 'PATCH',
    //     contentType: 'application/json'
    // })
}