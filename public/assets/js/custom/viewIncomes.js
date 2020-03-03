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
            let startDate = v.startDate;
            startDate = startDate.substr(0, 10);
            let endDate = v.endDate;
            endDate = endDate.substr(0, 10);
            $.get(`developers/getSingleDeveloper/${v.developer}`, function (data) {
                let developerName = data.developer.name;
                $.get(`clients/getSingleClient/${v.client}`, function (data) {
                    let clientName = data.client.name;
                    $.get(`projects/getSingleProject/${v.project}`, function (data) {
                        let projectName = data.project.name;
                        rows += `<tr id="${i}" role='row' class='odd'>`;
                        rows += `
                            <td class="d-none d-sm-table-cell">
                                    <span >${v.hours}</span>
                            </td>
                            <td class="d-none d-sm-table-cell">
                                    <span>${developerName}</span>
                            </td> 
                            <td class="d-none d-sm-table-cell">
                                    ${clientName}
                            </td>
                            <td>
                                 ${projectName}
                            </td>
                            <td class="text-center">
                                    <span class="text-black">${v.details}</span>
                            </td>
                            <td class="text-center">
                                    <span class="text-black">${startDate}</span>
                            </td>
                            <td class="text-center">
                                    <span class="text-black">${endDate}</span>
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
                        $('#data').append(rows);
                    });

                })
            })
        })




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

function getDeveloper(developerId) {
    $.get(`developers/getSingleDeveloper/${developerId}`, function (data) {
        let developerName = data.name;
        return developerName;
    })
}

function getProject() {


}
function getClient() {

}