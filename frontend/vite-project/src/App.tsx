import React, { useState, useEffect } from "react";
import "./App.css";

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
}

const App: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async (): Promise<void> => {
    try {
      const response = await fetch("http://127.0.0.1:5002/get-expenses");
      const data: Expense[] = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const addExpense = async (): Promise<void> => {
    if (!category || !amount || !date) {
      alert("All fields are required!");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5002/add-expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, amount: parseFloat(amount), date }),
      });
      if (response.ok) {
        alert("Expense added successfully!");
        setCategory("");
        setAmount("");
        setDate("");
        fetchExpenses();
      } else {
        alert("Failed to add expense.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>AI Expense Tracker</h1>
      </header>
      <main>
        <div className="form-container">
          <input
            type="text"
            placeholder="Category (e.g., Food, Rent)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount (e.g., 20.5)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="button-group">
            <button onClick={addExpense} className="add-button">
              Add Expense
            </button>
            <button onClick={fetchExpenses} className="analyze-button">
              Analyze Spending
            </button>
          </div>
        </div>
        <section className="expense-list">
          <h2>Expenses</h2>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                {expense.category} - ${expense.amount} on {expense.date}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default App;
