// displays transactions and totals on the page

import { getTotalIncome, getTotalExpense, getBalance } from './calculations.js';

export function renderTransactions(transactions, onDelete, onEdit) {
  const list = document.getElementById('transaction-list');
  list.innerHTML = '';

  transactions.forEach(t => {
    const li = document.createElement('li');
    li.className = t.type === 'income' ? 'income-item' : 'expense-item';

    const sign = t.type === 'income' ? '+' : '-';
    li.innerHTML = `
      <span class="txn-info">
        <strong>${t.description}</strong>
        <small>${t.date || ''}</small>
      </span>
      <span class="txn-amount">${sign}₹${t.amount}</span>
      <div class="txn-actions">
        <button class="edit-btn" data-id="${t.id}">✎</button>
        <button class="delete-btn" data-id="${t.id}">✕</button>
      </div>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => onDelete(t.id));
    li.querySelector('.edit-btn').addEventListener('click', () => onEdit(t.id));
    list.appendChild(li);
  });
}

export function renderTotals(transactions) {
  document.getElementById('total-income').textContent = `₹${getTotalIncome(transactions)}`;
  document.getElementById('total-expense').textContent = `₹${getTotalExpense(transactions)}`;
  document.getElementById('total-balance').textContent = `₹${getBalance(transactions)}`;
}