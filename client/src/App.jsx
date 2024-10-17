import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      console.warn("Response is not OK!");
    }
    const data = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleOnSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const age = formData.get("age");
    const newUser = { name, age };
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      console.warn("Response is not OK!");
    }
    fetchUsers();
  }

  function handleDelete(id) {
    return async function () {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.warn("Response is not OK!");
      }
      fetchUsers();
    };
  }

  return (
    <div>
      <div>
        <a href="/">reload</a>
      </div>
      <div>
        {users.map(({ _id, name, age }) => (
          <div key={_id}>
            <p>
              {name} ({age}) <button onClick={handleDelete(_id)}>Delete</button>
            </p>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleOnSubmit}>
          <input name="name" id="name" type="text" placeholder="Name" />
          <input name="age" id="age" type="number" placeholder="Age" />
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>
      </div>
    </div>
  );
}

export default App;
