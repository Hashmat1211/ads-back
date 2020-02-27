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
    $('#expensesTable tr').remove();

    let expensesRows = '';
    let incomesRows = '';

    let startDate = $('#startDate').val();

    let endDate = $('#endDate').val();



    $.post("incomes/search",
        {
            startDate: `${startDate}`,
            endDate: `${endDate}`
        }
        ,
        function (data, status) {

            if (!data) {
                $('#totalIncome').html(0);
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
                        const expenseList = data.expenses;
                        console.log('expense list ', expenseList)
                        $.each(expenseList, function (i, v) {
                            console.log(i, v)
                            expensesRows += `<tr  role='row' class='odd'>`;
                            expensesRows += ` <td>
                        <a
                            class="font-w600"
                        >${v.date}</a
                        >
                        </td >
                            <td class="d-none d-sm-table-cell">
                                <span class="">${v.type}</span>
                            </td>
                            <td class="d-none d-sm-table-cell">
                                <span>${v.payee}</span>
                            </td>
                            <td >
                                ${v.amount}
                            </td>
                            <td>
                                ${v.details}
                            </td>
                            </tr>`
                        })
                        $('#expensesTable').append(expensesRows)

                        $('#totalExpense').html(expense);
                        getTotalRevenue(expense, 0);
                    });
                return;
            }
            const income = data.total;
            const incomesList = data.incomes
            console.log('incomesList ', incomesList)

            $.each(incomesList, function (i, v) {
                incomesRows += `<tr   role='row' class='odd'>`;
                incomesRows += `
                    <td class="text-center">
                    <span class="text-black">${v.amount}</span>
                    </td>
                    <td class="d-none d-sm-table-cell">
                            <span class="">${v.hours}</span>
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
                    
                     
                    </tr>`;
            });

            $('#totalIncome').html(income)
            $('#incomesTable').append(incomesRows);
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


                    const expenseList = data.expenses;
                    console.log('expense list ', expenseList)
                    $.each(expenseList, function (i, v) {
                        console.log(i, v)

                        expensesRows += `<tr  role='row' class='odd'>`;
                        expensesRows += ` <td>
 
                            <a
                                class="font-w600"
                            >${v.date}</a
                            >
                            </td >
                            <td class="d-none d-sm-table-cell">
                                <span class="">${v.type}</span>
                            </td>
                            <td class="d-none d-sm-table-cell">
                                <span>${v.payee}</span>
                            </td>
                            <td >
                                ${v.amount}
                            </td>
                            <td>
                                ${v.details}
                            </td>
                            </tr>`
                    })
                    $('#expensesTable').append(expensesRows);
                    $('#incomesTable').append(incomesRows);
                    const totalExpense = data.total;
                    console.log(incomesRows)
                    $('#totalExpense').html(totalExpense);
                    getTotalRevenue(totalExpense, income);

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


