"use client";

import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import TransactionTable from "@/components/transactions/TransactionTable";
import TransactionForm from "@/components/transactions/TransactionForm";

export default function TransactionsPage() {
  const { transactions, filters, setFilters, addTransaction, deleteTransaction } =
    useTransactions();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transações</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {transactions.length} transaç{transactions.length === 1 ? "ão" : "ões"} encontrada{transactions.length === 1 ? "" : "s"}
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Nova transação
        </button>
      </div>

      {/* Filters */}
      <TransactionFilters filters={filters} onChange={setFilters} />

      {/* Table */}
      <TransactionTable transactions={transactions} onDelete={deleteTransaction} />

      {/* Modal */}
      {showForm && (
        <TransactionForm
          onSubmit={addTransaction}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
