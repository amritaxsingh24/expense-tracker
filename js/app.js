// app.js - main entry point, connects everything together

import { addTransaction, deleteTransaction, getTransactions, setTransactions } from './state.js';
import { saveToStorage, loadFromStorage } from './storage.js';
import { renderTransactions, renderTotals } from './render.js';
import { validateTransaction } from './validation.js';

const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const errorMessage = document.getElementById('error-message');

function refreshUI() {
  const transactions = getTransactions();
  renderTransactions(transactions, handleDelete);
  renderTotals(transactions);
}

function handleDelete(id) {
  deleteTransaction(id);
  refreshUI();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = descriptionInput.value;
  const amount = amountInput.value;
  const type = typeInput.value;

  const error = validateTransaction(description, amount);
  if (error) {
    errorMessage.textContent = error;
    return;
  }

  errorMessage.textContent = '';
  addTransaction(description, amount, type);
  refreshUI();

  form.reset();
});

// load saved data on page start
setTransactions(loadFromStorage());
refreshUI();