import React, { useState } from 'react';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';

function TransactionManager() {
  const [transactions, setTransactions] = useState([]);
  const [typeFilter, setTypeFilter] = useState('Entertainment'); 
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState(''); 
  const [sortDirection, setSortDirection] = useState('asc'); 

  const handleNewTransaction = transaction => {
    setTransactions([...transactions, transaction]);
  };

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortField(field);
    setSortDirection(isAsc ? 'desc' : 'asc');
  };

  const processedTransactions = transactions
    .filter(transaction => (typeFilter === 'Entertainment' || transaction.type === typeFilter) && transaction.description.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (!sortField) return 0; 
      const compareA = a[sortField];
      const compareB = b[sortField];
      if (compareA < compareB) return sortDirection === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div>
      <TransactionForm onNewTransaction={handleNewTransaction} />
      <input
        type="text"
        value={filter}
        onChange={onFilterChange}
        placeholder="Search by description"
      />
      <button onClick={() => handleSort('description')}>Sort by Description</button>
      <button onClick={() => handleSort('type')}>Sort by Type</button>
      <TransactionList transactions={processedTransactions} onTypeChange={handleTypeChange} />
    </div>
  );
}

export default TransactionManager;

