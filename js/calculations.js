// calculations.js - totals using reduce and filter

export function getTotalIncome(transactions) {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpense(transactions) {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getBalance(transactions) {
  return getTotalIncome(transactions) - getTotalExpense(transactions);             
}