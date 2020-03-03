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
        function (incomeData, status) {

            if (!incomeData) {
                $('#totalIncome').html(0);
                $.post("expenses/search",
                    {
                        startDate: `${startDate}`,
                        endDate: `${endDate}`
                    }
                    ,
                    function (expenseData, status) {
                        if (!expenseData) {
                            $('#totalExpense').html(0)

                            getTotalRevenue(0, 0);
                            return;
                        }

                        const expense = expenseData.total;
                        const expenseList = expenseData.expenses;
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
            } else {
                const income = incomeData.total;
                const incomesList = incomeData.incomes

                $.each(incomesList, function (i, v) {
                    let startDate = v.startDate;
                    startDate = startDate.substr(0, 10);
                    let endDate = v.endDate;
                    endDate = endDate.substr(0, 10);
                    /* get developer name and client and project name */
                    $.get(`developers/getSingleDeveloper/${v.developer}`, function (developerData) {
                        let developerName = developerData.developer.name;
                        $.get(`clients/getSingleClient/${v.client}`, function (clientData) {
                            let clientName = clientData.client.name;
                            $.get(`projects/getSingleProject/${v.project}`, function (projectData) {
                                let projectName = projectData.project.name;
                                incomesRows += `<tr   role='row' class='odd'>`;
                                incomesRows += `
    
                                <td class="text-center">
                                <span class="text-black">${clientName}</span>
                                </td>
                                <td class="text-center">
                                <span class="text-black">${projectName}</span>
                                </td>
                                <td class="text-center">
                                <span class="text-black">${developerName}</span>
                                </td>
                            
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
                                        <span class="text-black">${startDate}</span>
                                </td>
                                <td class="text-center">
                                        <span class="text-black">${endDate}</span>
                                </td>
                                
                                
                                </tr>`;
                                $('#incomesTable').append(incomesRows);

                            })
                        })
                    })
                });

                $('#totalIncome').html(income)
                $('#incomesTable').append(incomesRows);
                $.post("expenses/search",
                    {
                        startDate: `${startDate}`,
                        endDate: `${endDate}`
                    }
                    ,
                    function (expenseData, status) {
                        if (!expenseData) {
                            $('#totalExpense').html(0)

                            getTotalRevenue(0, income);
                            return;
                        }

                        const totalExpense = expenseData.total;
                        const expenseList = expenseData.expenses;
                        $.each(expenseList, function (i, v) {
                            let date = v.date;
                            date = date.substr(0, 10);

                            expensesRows += `<tr  role='row' class='odd'>`;
                            expensesRows += ` <td>
     
                                <a
                                    class="font-w600"
                                >${date}</a
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
                        $('#totalExpense').html(totalExpense);
                        getTotalRevenue(totalExpense, income);

                    });

            }

        });

}

function getTotalRevenue(expenses, incomes) {

    console.log('income ', Number(incomes))
    if (Number(expenses) > Number(incomes)) {
        /* console.log('heree e')
        console.log('expense ', Number(expenses))
        console.log('income ', Number(incomes)) */
        let profit = (Number(expenses) - Number(incomes));
        profit += ' loss';
        $('#netIncome').html(profit)
    } else {
        /* console.log('he r re')
         console.log('expense ', Number(expenses))
         console.log('income ', Number(incomes)) */
        let profit = (Number(incomes) - Number(expenses));
        profit += ' profit'
        console.log(profit)
        $('#netIncome').html(profit)
    }
}


