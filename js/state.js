// state.js - handles all transaction data and CRUD operations

import { saveToStorage } from './storage.js';

export let transactions = [];

function generateId() {
  return Date.now().toString();
}

export function addTransaction(description, amount, type, date) {
  const newTransaction = {
    id: generateId(),
    description,
    amount: Number(amount),
    type,
    date
  };

  transactions.push(newTransaction);
  saveToStorage(transactions);
  return newTransaction;
}

export function getTransactions() {
  return transactions;
}

export function getTransactionById(id) {
  return transactions.find(t => t.id === id);
}

export function updateTransaction(id, updatedData) {
  const index = transactions.findIndex(t => t.id === id);

  if (index === -1) return null;

  transactions[index] = {
    ...transactions[index],
    ...updatedData,
    amount: Number(updatedData.amount ?? transactions[index].amount)
  };

  saveToStorage(transactions);
  return transactions[index];
}

export function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveToStorage(transactions);
}

export function setTransactions(loadedTransactions) {
  transactions = loadedTransactions;
}