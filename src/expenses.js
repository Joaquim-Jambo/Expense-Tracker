import { getDb, insertDb, saveDb } from "./db.js"
import { v4 as uuidv4 } from 'uuid';
export const createExpense = async (description, amount) => {
    const newExpense = {
        id: uuidv4(),
        Description: description,
        Amount: amount,
        Date: new Date().toLocaleDateString('pt-PT')
    }
    await insertDb(newExpense);
    return (newExpense);
}

export const getAllExpenses = async () => {
    const { expenses } = await getDb();
    return (expenses)
}

export const getExpensesByMonth = async (expenses, month) => {
    if (!month) return expenses;
    const new_expenses = [];
    for (const exp of expenses) {
        if (month == exp.Date.split('/')[1]) {
            new_expenses.push(exp);
        }
    }
    return new_expenses;
}

export const getSummary = async (month) => {
    const expenses = await getAllExpenses()
    const exp = await getExpensesByMonth(expenses, month);

    const summary = exp.reduce((accumulator, { Amount }) =>
        accumulator + (Amount || 0), 0);
    return (`${new Intl.NumberFormat("pt-AO", {
        style: "currency",
        currency: "AOA"
    }).format(summary)}`);
}

export const deleteExpense = async (id) => {
    const expenses = await getAllExpenses();
    const match = expenses.find((expense) => expense.id === id)
    if (match) {
        const newExpenses = expenses.filter(expense => expense.id != id);
        await saveDb({ expenses: newExpenses })
        return (id);
    }
}

export const updateExpense = async (expenses, id, description, amout) => {
    const index = expenses.findIndex(exp => exp.id === id);
    const expense = {};
    if (index === -1) {
        console.log("⚠️ Despesa não encontrada.");
        return;
    }
    if (description && !amout) {
        expenses[index].Description = description;
        expense.Description = description;
    }
    else if (amout && !description) {
        expenses[index].Amount = amout;
        expense.Amount = amout;
    }
    else {
        expenses[index].Description = description;
        expenses[index].Amount = amout;
        expense.Amount = amout;
        expense.Description = description;
    }
    await saveDb({ expenses });
    return expense
}
export const deleteAllExpenses = async () => {
    await saveDb({ expenses: [] })
}