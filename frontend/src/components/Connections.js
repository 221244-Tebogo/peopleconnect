//frontend/pages/employees/Connections.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const ConnectionsPage = ({ match }) => {
  const [connections, setConnections] = useState([]);
  const userId = match.params.userId;

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(`/api/employees/user/${userId}`);
        setConnections(response.data.connections);
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };
    fetchConnections();
  }, [userId]);

  const handleConnect = async (id) => {
    try {
      await axios.post(`/api/employees/connect/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error connecting with user:", error);
    }
  };

  return (
    <div>
      <h2>Connections</h2>
      <ul>
        {connections.map((connection, index) => (
          <li key={index}>{connection.name}</li>
        ))}
      </ul>
      <button onClick={() => handleConnect(userId)}>Connect</button>
    </div>
  );
};

export default ConnectionsPage;
