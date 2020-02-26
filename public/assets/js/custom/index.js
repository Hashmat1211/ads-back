$(document).ready(function () {
    console.log('inside dashboard');
    getReportsFromDB();
})
function getReportsFromDB() {
    $.get('incomes/getAllIncomes', function (data) {
        const incomes = data.totalIncomes;
        $('#totalIncomes').html(incomes)
    })
    $.get('expenses/getAllExpenses', function (data) {
        const expenses = data.totalExpenses;
        $('#totalExpenses').html(expenses)
    })
    $.get('projects/getAllProjects', function (data) {
        const projects = data.totalProjects;
        $('#totalProjects').html(projects)
    })
    $.get('clients/getAllClients', function (data) {
        const clients = data.totalClients;
        $('#totalClients').html(clients)
    })
    let currentDateInMonth = new Date(), y = currentDateInMonth.getFullYear(), m = currentDateInMonth.getMonth();
    let firstDayOfMonth = new Date(y, m, 1);



    /* getting incomes in a month */
    $.post("incomes/search",
        {
            startDate: `${firstDayOfMonth}`,
            endDate: `${currentDateInMonth}`
        },
        function (data, status) {
            if (!data) {
                $('#incomesInAMonth').html('No Incomes in this month')
            }
            $('#incomesInAMonth').html(data.total)
        });

    $.post("expenses/search",
        {
            startDate: `${firstDayOfMonth}`,
            endDate: `${currentDateInMonth}`
        },
        function (data, status) {
            if (!data) {
                $('#expenseInAMonth').html('No expenses in this month')
            }
            $('#expenseInAMonth').html(data.total)
        });
}

function getReport() {

    let startDate = $('#startDate').val();

    let endDate = $('#endDate').val();


    /* getting by given date in a month */
    $.post("incomes/search",
        {
            startDate: `${startDate}`,
            endDate: `${endDate}`
        }
        ,
        function (data, status) {
            if (!data) {
                $('#totalIncome').html(0)
                $.post("expenses/search",
                    {
                        startDate: `${startDate}`,
                        endDate: `${endDate}`
                    }
                    ,
                    function (data, status) {
                        if (!data) {
                            $('#totalExpense').html(0)

                            getTotalRevenue(0, 0);
                            return;
                        }
                        const expense = data.total;
                        console.log(expense)
                        $('#totalExpense').html(expense);
                        getTotalRevenue(expense, 0);
                    });
                return;
            }
            const income = data.total;
            console.log(income)
            $('#totalIncome').html(income)
            $.post("expenses/search",
                {
                    startDate: `${startDate}`,
                    endDate: `${endDate}`
                }
                ,
                function (data, status) {
                    if (!data) {
                        $('#totalExpense').html(0)

                        getTotalRevenue(0, income);
                        return;
                    }
                    const expense = data.total;
                    console.log(expense)
                    $('#totalExpense').html(expense);
                    getTotalRevenue(expense, income);
                });

        });

}

function getTotalRevenue(expenses, incomes) {

    console.log('income ', Number(incomes))
    if (Number(expenses) > Number(incomes)) {
        console.log('heree e')
        console.log('expense ', Number(expenses))
        console.log('income ', Number(incomes))
        let profit = (Number(expenses) - Number(incomes));
        profit += ' loss';
        console.log(profit)
        $('#netIncome').html(profit)
    } else {
        console.log('he r re')
        console.log('expense ', Number(expenses))
        console.log('income ', Number(incomes))
        let profit = (Number(incomes) - Number(expenses));
        profit += ' profit'
        console.log(profit)
        $('#netIncome').html(profit)
    }
}


/* put data into tables */

function viewExpensesDataTo() {
    // 

    $.get("/expenses/getAllExpenses", function (data) {
        console.log('data in expenses', data)
        let rows = '';
        const expenses = data.expenses;
        $.each(expenses, function (i, v) {
            console.log(i, v)


            rows += `<tr id="${i}" role='row' class='odd'>`;
            rows += ` <td>
            <a
                class="font-w600" 
            >${v._id}</a
            >
        </td>
        <td class="d-none d-sm-table-cell">
                <span class="badge badge-success">${v.type}</span>
        </td>
         <td class="d-none d-sm-table-cell">
                <span>${v.payee}</span>
        </td> 
        <td class="d-none d-sm-table-cell">
                ${v.date}
        </td>
        <td>
            <a >${v.details}</a>
        </td>
        <td>
        <a >${v.amount}</a>
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