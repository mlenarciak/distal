import React, { useState } from 'react';
import { CreditCard, Download, DollarSign, Calendar, Search } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  type: 'charge' | 'refund';
}

const BillingSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'methods' | 'subscriptions'>('history');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');

  // Mock data - Replace with actual data from your backend
  const transactions: Transaction[] = [
    {
      id: 'txn_1',
      date: '2024-03-15',
      description: 'Dataset Access - Historical Weather Patterns',
      amount: 99.00,
      status: 'completed',
      type: 'charge'
    },
    {
      id: 'txn_2',
      date: '2024-03-10',
      description: 'Project Management Fee',
      amount: 250.00,
      status: 'completed',
      type: 'charge'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Billing & Payments</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'history'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Billing History
            </button>
            <button
              onClick={() => setActiveTab('methods')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'methods'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Payment Methods
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'subscriptions'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Subscriptions
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'history' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Time</option>
                    <option value="30">Last 30 Days</option>
                    <option value="90">Last 90 Days</option>
                    <option value="365">Last Year</option>
                  </select>
                </div>
                <button className="flex items-center text-blue-600 hover:text-blue-700">
                  <Download size={18} className="mr-2" />
                  Export
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Description</th>
                      <th className="text-right py-3 px-4">Amount</th>
                      <th className="text-right py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-gray-400" />
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-3 px-4">{transaction.description}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end">
                            <DollarSign size={16} className="mr-1" />
                            {transaction.amount.toFixed(2)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className={`flex items-center justify-end ${
                            transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            <span className="capitalize">{transaction.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'methods' && (
            <div>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-6">
                <CreditCard size={18} className="mr-2" />
                Add Payment Method
              </button>

              <div className="space-y-4">
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard size={24} className="mr-4 text-gray-400" />
                    <div>
                      <div className="font-medium">•••• •••• •••• 4242</div>
                      <div className="text-sm text-gray-500">Expires 12/25</div>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-700">Remove</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="text-center py-8 text-gray-500">
              <p>No active subscriptions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;