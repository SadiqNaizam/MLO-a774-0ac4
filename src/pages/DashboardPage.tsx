import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import AnalyticsSummaryCard from '@/components/AnalyticsSummaryCard';
import FoodItemCard from '@/components/FoodItemCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle, CheckCircle, PlusCircle, PackageSearch, BarChartBig } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const placeholderExpiringItems = [
  { id: '1', name: 'Milk', quantity: 1, expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), category: 'Dairy', imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b28b850?q=80&w=400&auto=format&fit=crop' },
  { id: '2', name: 'Bread', quantity: 1, expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), category: 'Bakery', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0ca480e8432c?q=80&w=400&auto=format&fit=crop' },
  { id: '3', name: 'Chicken Breast', quantity: 2, expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), category: 'Meat', imageUrl: 'https://images.unsplash.com/photo-1604503468807-171697007209?q=80&w=400&auto=format&fit=crop' },
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const handleEditItem = (id: string | number) => {
    console.log('Edit item:', id);
    // navigate(`/edit-item/${id}`); // Example navigation
  };

  const handleDeleteItem = (id: string | number) => {
    console.log('Delete item:', id);
    // Add delete logic
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's an overview of your food inventory.</p>
          </header>

          {/* Analytics Summary Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <AnalyticsSummaryCard
              title="Total Items"
              value="42"
              description="Items currently in stock"
              icon={PackageSearch}
              iconBgColor="bg-blue-100"
            />
            <AnalyticsSummaryCard
              title="Expiring Soon"
              value="5"
              description="Items expiring in next 3 days"
              icon={AlertCircle}
              iconBgColor="bg-yellow-100"
            />
            <AnalyticsSummaryCard
              title="Recently Wasted"
              value="2"
              description="Items marked as wasted this week"
              icon={CheckCircle} // Using CheckCircle as a placeholder for waste, consider specific waste icon
              iconBgColor="bg-red-100"
            />
          </section>

          {/* Quick Actions Section */}
          <section className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button onClick={() => navigate('/add-item')} className="w-full sm:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
                </Button>
                <Button variant="outline" onClick={() => navigate('/inventory')} className="w-full sm:w-auto">
                  <PackageSearch className="mr-2 h-4 w-4" /> View Full Inventory
                </Button>
                <Button variant="outline" onClick={() => navigate('/analytics')} className="w-full sm:w-auto">
                  <BarChartBig className="mr-2 h-4 w-4" /> View Analytics
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Items Nearing Expiry Section */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Items Nearing Expiry</CardTitle>
              </CardHeader>
              <CardContent>
                {placeholderExpiringItems.length > 0 ? (
                  <ScrollArea className="h-[400px] pr-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {placeholderExpiringItems.map(item => (
                        <FoodItemCard
                          key={item.id}
                          {...item}
                          onEdit={handleEditItem}
                          onDelete={handleDeleteItem}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <p className="text-gray-500 text-center py-4">No items are nearing expiry. Great job!</p>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;