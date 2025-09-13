
export const listExpense = (expenses) => {
    console.log("Descrption ID")
    expenses.map((e)=>{
        console.log(toString(e.Description).slice(0,4))
    })
}
