import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  status: 'read' | 'unread';
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/messages');
        setMessages(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching messages');
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Messages
      </h1>
      <div className="grid gap-6">
        {messages.map((message) => (
          <div
            key={message._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{message.name}</h2>
              <span className={`px-3 py-1 rounded-full text-sm ${
                message.status === 'unread' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {message.status}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">{message.message}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <p>Email: {message.email}</p>
                <p>Phone: {message.phone}</p>
              </div>
              <div className="text-right">
                <p>{new Date(message.timestamp).toLocaleDateString()}</p>
                <p>{new Date(message.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
