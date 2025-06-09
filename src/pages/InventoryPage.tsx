import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import FoodItemCard from '@/components/FoodItemCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Filter, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const allItems = [
  { id: '1', name: 'Apples', quantity: 5, purchaseDate: '2024-07-15', expiryDate: '2024-07-25', category: 'Produce', imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b69665?q=80&w=400&auto=format&fit=crop' },
  { id: '2', name: 'Milk', quantity: 1, purchaseDate: '2024-07-20', expiryDate: '2024-07-28', category: 'Dairy', imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b28b850?q=80&w=400&auto=format&fit=crop' },
  { id: '3', name: 'Bread', quantity: 1, purchaseDate: '2024-07-22', expiryDate: '2024-07-26', category: 'Bakery', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0ca480e8432c?q=80&w=400&auto=format&fit=crop' },
  { id: '4', name: 'Chicken Breast', quantity: 2, purchaseDate: '2024-07-21', expiryDate: '2024-07-27', category: 'Meat', imageUrl: 'https://images.unsplash.com/photo-1604503468807-171697007209?q=80&w=400&auto=format&fit=crop' },
  { id: '5', name: 'Pasta', quantity: '1 box', purchaseDate: '2024-06-01', expiryDate: '2025-06-01', category: 'Pantry', imageUrl: 'https://images.unsplash.com/photo-1598866594240-a7061c177c4c?q=80&w=400&auto=format&fit=crop' },
  { id: '6', name: 'Orange Juice', quantity: 1, purchaseDate: '2024-07-18', expiryDate: '2024-08-05', category: 'Beverage', imageUrl: 'https://images.unsplash.com/photo-1616000159504-46d1143a04e5?q=80&w=400&auto=format&fit=crop' },
];

const ITEMS_PER_PAGE = 6;

const InventoryPage = () => {
  console.log('InventoryPage loaded');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('expiryDate');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const handleEditItem = (id: string | number) => console.log('Edit item:', id);
  const handleDeleteItem = (id: string | number) => console.log('Delete item:', id);

  const filteredAndSortedItems = allItems
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => categoryFilter === 'all' || item.category === categoryFilter)
    .sort((a, b) => {
      if (sortOption === 'expiryDate') {
        return new Date(a.expiryDate || 0).getTime() - new Date(b.expiryDate || 0).getTime();
      }
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredAndSortedItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const categories = ['all', ...new Set(allItems.map(item => item.category))];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6 flex flex-col sm:flex-row justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
                <p className="text-gray-600">Manage all your food items here.</p>
            </div>
            <Button onClick={() => navigate('/add-item')} className="mt-4 sm:mt-0">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
            </Button>
          </header>

          {/* Filters and Sorting Section */}
          <section className="mb-6 p-4 bg-white rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="pl-10"
                />
              </div>
              <div>
                <label htmlFor="sortOption" className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                <Select value={sortOption} onValueChange={(value) => { setSortOption(value); setCurrentPage(1); }}>
                  <SelectTrigger id="sortOption">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expiryDate">Expiry Date</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="purchaseDate">Purchase Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
                <Select value={categoryFilter} onValueChange={(value) => { setCategoryFilter(value); setCurrentPage(1); }}>
                  <SelectTrigger id="categoryFilter">
                    <Filter className="mr-2 h-4 w-4 inline-block" />
                    <SelectValue placeholder="Filter by category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Food Items List Section */}
          <section>
            {paginatedItems.length > 0 ? (
              <ScrollArea className="h-[calc(100vh-380px)] sm:h-[calc(100vh-350px)] pr-1"> {/* Adjusted height */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginatedItems.map(item => (
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
              <p className="text-gray-500 text-center py-10">No items match your criteria. Try adjusting filters or add new items.</p>
            )}
          </section>

          {/* Pagination Section */}
          {totalPages > 1 && (
            <section className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(prev => Math.max(1, prev - 1)); }} aria-disabled={currentPage === 1} />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }} isActive={currentPage === i + 1}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                   {/* Consider adding Ellipsis logic if many pages */}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(prev => Math.min(totalPages, prev + 1)); }} aria-disabled={currentPage === totalPages} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default InventoryPage;