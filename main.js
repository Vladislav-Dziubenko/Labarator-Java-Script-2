/**
 * main.js
 * Лабораторная работа: Анализ массива транзакций
 * Автор: Дзюбенко Владислав Группа: 2503FR
 */

// Шаг 1. Создание массива транзакций
const transactions = [
  {
    transaction_id: 1,
    transaction_date: "2025-01-15",
    transaction_amount: 1200,
    transaction_type: "income",
    transaction_description: "Зарплата",
    merchant_name: "Компания X",
    card_type: "debit"
  },
  {
    transaction_id: 2,
    transaction_date: "2025-01-20",
    transaction_amount: 300,
    transaction_type: "expense",
    transaction_description: "Продукты",
    merchant_name: "Supermarket",
    card_type: "debit"
  },
  {
    transaction_id: 3,
    transaction_date: "2025-02-05",
    transaction_amount: 150,
    transaction_type: "expense",
    transaction_description: "Интернет",
    merchant_name: "ISP",
    card_type: "credit"
  },
  {
    transaction_id: 4,
    transaction_date: "2025-02-10",
    transaction_amount: 500,
    transaction_type: "income",
    transaction_description: "Фриланс",
    merchant_name: "Upwork",
    card_type: "credit"
  }
];

/**
 * Возвращает массив уникальных типов транзакций
 * @param {Array} transactions - массив транзакций
 * @returns {Array} уникальные типы
 */
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(t => t.transaction_type))];
}

/**
 * Считает сумму всех транзакций
 * @param {Array} transactions
 * @returns {number}
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * Считает сумму транзакций по дате
 * @param {Array} transactions
 * @param {number} [year]
 * @param {number} [month]
 * @param {number} [day]
 * @returns {number}
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions
    .filter(t => {
      const d = new Date(t.transaction_date);
      return (!year || d.getFullYear() === year) &&
             (!month || d.getMonth() + 1 === month) &&
             (!day || d.getDate() === day);
    })
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * Возвращает транзакции по типу карты
 */
function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.card_type === type);
}

/**
 * Возвращает транзакции в диапазоне дат
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return transactions.filter(t => {
    const d = new Date(t.transaction_date);
    return d >= start && d <= end;
  });
}

/**
 * Возвращает транзакции по магазину
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t => t.merchant_name === merchantName);
}

/**
 * Среднее значение транзакций
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}

/**
 * Транзакции по диапазону суммы
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}

/**
 * Общая сумма дебетовых транзакций
 */
function calculateTotalDebitAmount(transactions) {
  return transactions
    .filter(t => t.card_type === "debit")
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * Месяц с наибольшим количеством транзакций
 */
function findMostTransactionsMonth(transactions) {
  const counts = {};
  transactions.forEach(t => {
    const month = new Date(t.transaction_date).getMonth() + 1;
    counts[month] = (counts[month] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

/**
 * Месяц с наибольшим количеством дебетовых транзакций
 */
function findMostDebitTransactionMonth(transactions) {
  const counts = {};
  transactions.filter(t => t.card_type === "debit").forEach(t => {
    const month = new Date(t.transaction_date).getMonth() + 1;
    counts[month] = (counts[month] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

/**
 * Определяет, каких транзакций больше
 */
function mostTransactionTypes(transactions) {
  const debitCount = transactions.filter(t => t.card_type === "debit").length;
  const creditCount = transactions.filter(t => t.card_type === "credit").length;
  if (debitCount > creditCount) return "debit";
  if (creditCount > debitCount) return "credit";
  return "equal";
}

/**
 * Транзакции до указанной даты
 */
function getTransactionsBeforeDate(transactions, date) {
  const d = new Date(date);
  return transactions.filter(t => new Date(t.transaction_date) < d);
}

/**
 * Поиск транзакции по ID
 */
function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id);
}

/**
 * Возвращает массив описаний транзакций
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}

// Шаг 3. Тестирование
console.log("Уникальные типы:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма:", calculateTotalAmount(transactions));
console.log("Сумма за январь 2025:", calculateTotalAmountByDate(transactions, 2025, 1));
console.log("Только дебет:", getTransactionByType(transactions, "debit"));
console.log("Диапазон дат:", getTransactionsInDateRange(transactions, "2025-01-01", "2025-01-31"));
console.log("По магазину Supermarket:", getTransactionsByMerchant(transactions, "Supermarket"));
console.log("Среднее значение:", calculateAverageTransactionAmount(transactions));
console.log("Сумма дебетовых:", calculateTotalDebitAmount(transactions));
console.log("Месяц с макс. транзакциями:", findMostTransactionsMonth(transactions));
console.log("Месяц с макс. дебет:", findMostDebitTransactionMonth(transactions));
console.log("Каких больше:", mostTransactionTypes(transactions));
console.log("До 1 февраля:", getTransactionsBeforeDate(transactions, "2025-02-01"));
console.log("По ID=2:", findTransactionById(transactions, 2));
console.log("Описания:", mapTransactionDescriptions(transactions));