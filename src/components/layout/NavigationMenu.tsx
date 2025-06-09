import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile menu
import { Menu, Home, BarChart2, Archive, PlusSquare, UserCircle, Utensils } from 'lucide-react'; // Example icons

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/inventory', label: 'Inventory', icon: Archive },
  { href: '/add-item', label: 'Add Item', icon: PlusSquare },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/account', label: 'Account', icon: UserCircle },
];

const NavigationMenu: React.FC = () => {
  console.log("Rendering NavigationMenu");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const commonLinkClasses = "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClasses = "bg-green-100 text-green-700";
  const inactiveLinkClasses = "text-gray-700 hover:bg-gray-100 hover:text-gray-900";

  const NavLinks: React.FC<{isMobile?: boolean}> = ({ isMobile }) => (
    <nav className={`flex ${isMobile ? 'flex-col space-y-1' : 'flex-row space-x-1 md:space-x-2'}`}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          className={`${commonLinkClasses} ${
            location.pathname === item.href ? activeLinkClasses : inactiveLinkClasses
          }`}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          <item.icon className={`mr-2 h-5 w-5 ${isMobile ? 'inline-block' : 'hidden md:inline-block'}`} />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center font-bold text-xl text-green-700">
              <Utensils className="h-7 w-7 mr-2 text-green-600" />
              FoodInventory
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:ml-6">
            <NavLinks />
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-4">
                <div className="flex flex-col space-y-4">
                    <Link to="/" className="flex-shrink-0 flex items-center font-bold text-lg text-green-700 mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                      <Utensils className="h-6 w-6 mr-2 text-green-600" />
                      FoodInventory
                    </Link>
                    <NavLinks isMobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationMenu;