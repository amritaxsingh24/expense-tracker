export function validateTransaction(description, amount, date) {
  if (!description.trim()) {
    return 'Description cannot be empty';
  }

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return 'Amount must be a number greater than 0';
  }

  if (!date) {
    return 'Date is required';
  }

  return null;
}