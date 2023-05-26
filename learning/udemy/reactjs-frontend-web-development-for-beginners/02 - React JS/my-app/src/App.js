import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    axios("https://api.randomuser.me/?nat=US&results=10")
      .then((res) => {
        setUsers(res.data.results);
      })
      .catch((err) => {
        console.log("Unable to fetch -", err);
      });
  }, []);

  return <div className="App">{users.map((user) => user.name.first)}</div>;
}

export default App;
