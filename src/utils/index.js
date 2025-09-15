
export const listExpense = (expenses) => {
    if (!expenses || expenses.length === 0) {
        console.log("📭 Nenhuma despesa encontrada.");
        return;
    }
    console.log('\n');
    console.log("📋 Lista de despesas:");
    const formatedList = expenses.map(({ id, Description, Amount }) => ({
        ID: `${id}`,
        Description: `${String(Description).substring(0, 20)}`,
        Amount: `${new Intl.NumberFormat("pt-AO", {
            style: "currency",
            currency: "AOA"
        }).format(Amount)}`
    }))
    console.table(formatedList);
}
