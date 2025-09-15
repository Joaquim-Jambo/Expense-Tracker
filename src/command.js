import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createExpense, deleteAllExpenses, deleteExpense, getAllExpenses, getSummary, updateExpense } from './expenses.js';
import { listExpense } from "./utils/index.js";

yargs(hideBin(process.argv))
    .command('add', '➕ Adicionar uma despesa com descrição e valor.', yargs => {
        return yargs
            .option('description', {
                type: 'string',
                alias: ['d', 'desc'],
                demandOption: true,
                description: '📝 Texto curto descrevendo a despesa'
            })
            .option('amount', {
                type: 'number',
                alias: ['a', 'amt'],
                demandOption: true,
                description: '💰 Valor da despesa em números (ex.: 20, 49.99)'
            })
    }, async (argv) => {
        const expense = await createExpense(argv.description, argv.amount);
        console.log(`✅ Despesa adicionada com sucesso (🆔 ${expense.id})`);
    })
    .command('list', '📋 Listar todas as despesas registradas', () => { }, async () => {
        const expenses = await getAllExpenses();
        listExpense(expenses);
    })
    .command('summary', '📊 Mostrar o total de todas as despesas', yargs => {
        return yargs
            .option('month', {
                type: 'number',
                alias: 'm',
                description: '🗓️ Mês da despesa (1–12)'
            })
    }, async (argv) => {
        const summary = await getSummary(argv.month);
        console.info(`💵 Total de despesas: ${summary} KZ`);
    })
    .command('update', '✏️ Atualizar uma despesa existente pelo ID (pode alterar descrição e/ou valor)', yargs => {
        return yargs
            .option('description', {
                type: 'string',
                alias: ['d', 'desc'],
                description: '📝 Texto curto descrevendo a despesa'
            })
            .option('amount', {
                type: 'number',
                alias: ['a', 'amt'],
                description: '💰 Valor da despesa em números (ex.: 20, 49.99)'
            })
            .option('id', {
                type: 'string',
                demandOption: true,
                description: '🆔 Atualizar uma despesa pelo seu ID'
            })

    }, async (argv) => {
        const expenses = await getAllExpenses();
        const expense = await updateExpense(expenses, argv.id, argv.description, argv.amount);
        console.log(`🔄 Despesa atualizada:`, expense);
    })
    .command('delete', '🗑️ Remover uma despesa pelo seu ID ou mesmo remover todas as despesas', yargs => {
        return yargs
            .option('id', {
                type: 'string',
                description: '🆔 Remover uma despesa pelo seu ID'
            })
            .option('all', {
                type: 'boolean',
                default: false,
                description: '❌ Remover todas as despesas !'
            })
    }, async (argv) => {
        if (argv.id) {
            await deleteExpense(argv.id);
            console.log('❌ Despesa removida com sucesso');
        }
        if (argv.all) {
            await deleteAllExpenses();
            console.log("❌ Despesas removidas com sucesso")
        }
    })

    .demandCommand(1)
    .parse();