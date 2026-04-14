import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    axios.get("http://127.0.0.1:8000/expenses/")
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err));
  };

  const addExpense = () => {
    axios.post("http://127.0.0.1:8000/expenses/add/", {
      title,
      amount,
      category
    }).then(() => {
      fetchExpenses();
      setTitle("");
      setAmount("");
      setCategory("");
    });
  };

  const deleteExpense = (id) => {
    axios.delete(`http://127.0.0.1:8000/expenses/delete/${id}/`)
      .then(() => fetchExpenses());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expense Tracker</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />

      <button onClick={addExpense}>Add</button>

      <ul>
        {expenses.map(exp => (
          <li key={exp.id}>
            {exp.title} - ₹{exp.amount} ({exp.category})
            <button onClick={() => deleteExpense(exp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;