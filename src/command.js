import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createExpense, deleteExpense, getAllExpenses, getSummary, updateExpense } from './expenses.js';
import { listExpense } from "./utils/index.js";

yargs(hideBin(process.argv))
    .command('add', 'add an expense with a description and amount.', yargs => {
        return yargs
            .option('description', {
                type: 'string',
                alias: ['d', 'desc'],
                demandOption: true,
                description: 'Short text describing the expense'
            })
            .option('amount', {
                type: 'number',
                alias: ['a', 'amt'],
                demandOption: true,
                description: 'Expense amount in numbers (e.g., 20, 49.99)'
            })
    }, async (argv) => {
        const expense = await createExpense(argv.description, argv.amount);
        console.log(`Expense added successfully (ID: ${expense.id})`)
    })
    .command('list', 'List all recorded expenses', () => { }, async () => {
        const expenses = await getAllExpenses();
        listExpense(expenses)
    })
    .command('summary', 'Show the total amount of all expenses', yargs => {
        return yargs
            .option('month', {
                type: 'number',
                alias: 'm',
                description: 'Month of the expense (1–12)'
            })
    }, async (argv) => {
        const summary = await getSummary(argv.month);
        console.info(`Total expenses: $${summary}`)
    })
    .command('update', 'Update an existing expense by ID (you can change description and/or amount)', yargs => {
        return yargs
            .option('description', {
                type: 'string',
                alias: ['d', 'desc'],
                description: 'Short text describing the expense'
            })
            .option('amount', {
                type: 'number',
                alias: ['a', 'amt'],
                description: 'Expense amount in numbers (e.g., 20, 49.99)'
            })
            .option('id', {
                type: 'string',
                demandOption: true,
                description: 'Update an expense by its ID or description'
            })

    }, async (argv) => {
        const expenses = await getAllExpenses();
        const expense = await updateExpense(expenses, argv.id, argv.description, argv.amount)
        console.log(expense)
    })
    .command('delete', 'Remove an expense by its ID or description', yargs => {
        return yargs
            .option('id', {
                type: 'string',
                demandOption: true,
                description: 'Remove an expense by its ID or description'
            })
    }, async (argv) => {
        await deleteExpense(argv.id);
        console.log('Expense deleted successfully')
    })
    .demandCommand(1)
    .parse()


