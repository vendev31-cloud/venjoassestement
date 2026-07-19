import { useState, useEffect } from "react";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("https://jsonplaceholder.typicode.com/user");
      const data = await response.json();
      const sliced = data.slice(0, -5);
    setAllUsers(prev => [...prev, ...sliced]);
    }
    fetchUsers();
  }, [refreshKey]);
   const sorted = [...allUsers].sort((a, b) => a.name - b.name);
 const filtered = sorted.filter(user => user.name.includes(query));
  const total = allUsers.reduce((acc, user) => acc + user.id, 0);
  const found = allUsers.find(user => user.id === 0);

  return (
    <div className="max-w-xl mx-auto p-4 font-sans">

      <h1 className="text-2xl font-bold border-b-2 pb-2 mb-4">
        User Directory
      </h1>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border border-gray-300 rounded px-3 py-2"
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
          onClick={() => setRefreshKey(k => k + 1)}
        >
          Refresh
        </button>
      </div>

      <ul className="list-none p-0 m-0">
        {filtered.map(user => (
          <li key={user.id} className="py-3 border-b border-gray-200">
            <span className="font-medium">{user.name} {user.name}</span> — {user.city}

          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-gray-400 mt-4">No users found.</p>
      )}

    </div>
  );
}

export default App;