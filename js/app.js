// app.js - main entry point, connects everything together

import { addTransaction, deleteTransaction, updateTransaction, getTransactionById, getTransactions, setTransactions } from './state.js';
import { saveToStorage, loadFromStorage } from './storage.js';
import { renderTransactions, renderTotals } from './render.js';
import { validateTransaction } from './validation.js';

const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const dateInput = document.getElementById('date');
const errorMessage = document.getElementById('error-message');
const submitBtn = form.querySelector('button[type="submit"]');

const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const sortSelect = document.getElementById('sort-select');

let editingId = null;

function getFilteredAndSortedTransactions() {
  let transactions = getTransactions();

  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    transactions = transactions.filter(t =>
      t.description.toLowerCase().includes(searchTerm)
    );
  }

  const filterType = filterSelect.value;
  if (filterType !== 'all') {
    transactions = transactions.filter(t => t.type === filterType);
  }

  const sortValue = sortSelect.value;
  transactions = [...transactions].sort((a, b) => {
    if (sortValue === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (sortValue === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (sortValue === 'amount-desc') return b.amount - a.amount;
    if (sortValue === 'amount-asc') return a.amount - b.amount;
    return 0;
  });

  return transactions;
}

function refreshUI() {
  const allTransactions = getTransactions();
  const filtered = getFilteredAndSortedTransactions();
  renderTransactions(filtered, handleDelete, handleEdit);
  renderTotals(allTransactions);
}

function handleDelete(id) {
  deleteTransaction(id);
  if (editingId === id) resetForm();
  refreshUI();
}

function handleEdit(id) {
  const transaction = getTransactionById(id);
  if (!transaction) return;

  descriptionInput.value = transaction.description;
  amountInput.value = transaction.amount;
  typeInput.value = transaction.type;
  dateInput.value = transaction.date || '';

  editingId = id;
  submitBtn.textContent = 'Update Transaction';
}

function resetForm() {
  form.reset();
  editingId = null;
  submitBtn.textContent = 'Add Transaction';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = descriptionInput.value;
  const amount = amountInput.value;
  const type = typeInput.value;
  const date = dateInput.value;

  const error = validateTransaction(description, amount, date);
  if (error) {
    errorMessage.textContent = error;
    return;
  }

  errorMessage.textContent = '';

  if (editingId) {
    updateTransaction(editingId, { description, amount, type, date });
  } else {
    addTransaction(description, amount, type, date);
  }

  refreshUI();
  resetForm();
});

searchInput.addEventListener('input', refreshUI);
filterSelect.addEventListener('change', refreshUI);
sortSelect.addEventListener('change', refreshUI);

setTransactions(loadFromStorage());
refreshUI();