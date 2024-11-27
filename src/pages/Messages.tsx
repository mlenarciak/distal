import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Chat from '../components/Chat';
import { Users, MessageSquare } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  role: string;
  unread_count: number;
  last_message?: {
    content: string;
    created_at: string;
  };
}

const Messages: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const response = await fetch('/api/messages/contacts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Failed to load contacts:', error);
      }
    };

    loadContacts();
  }, [token]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Contacts List */}
        <div className="md:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-semibold flex items-center">
              <Users size={20} className="mr-2" />
              Contacts
            </h2>
          </div>
          <div className="divide-y">
            {contacts.map(contact => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition duration-200 ${
                  selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.role}</p>
                  </div>
                  {contact.unread_count > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {contact.unread_count}
                    </span>
                  )}
                </div>
                {contact.last_message && (
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    {contact.last_message.content}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="md:col-span-3">
          {selectedContact ? (
            <Chat
              otherUserId={selectedContact.id}
              otherUserName={selectedContact.name}
            />
          ) : (
            <div className="h-[600px] bg-white rounded-lg shadow-md flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                <p>Select a contact to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;