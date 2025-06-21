// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Menu, X, Home, FileText, Gift, MapPin, Users } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { ThemeToggle } from '@/components/ui/theme-toggle';
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from '@/components/ui/sheet';

// const navigation = [
//   { name: 'Home', href: '/', icon: Home },
//   { name: 'Complaints', href: '/complaints', icon: FileText },
//   { name: 'Schemes', href: '/schemes', icon: Gift },
//   { name: 'Traffic Updates', href: '/traffic', icon: MapPin },
//   { name: 'Elderly Program', href: '/elderly-program', icon: Users },
// ];

// export function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <motion.div
//               initial={{ rotate: 0 }}
//               animate={{ rotate: 360 }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//               className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center"
//             >
//               <Home className="w-5 h-5 text-white" />
//             </motion.div>
//             <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
//               GovServe
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-1">
//             {navigation.map((item) => {
//               const isActive = location.pathname === item.href;
//               return (
//                 <Link key={item.name} to={item.href}>
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
//                       isActive
//                         ? 'text-blue-600 dark:text-blue-400'
//                         : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
//                     }`}
//                   >
//                     <item.icon className="w-4 h-4 inline mr-2" />
//                     {item.name}
//                     {isActive && (
//                       <motion.div
//                         layoutId="activeTab"
//                         className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
//                         initial={false}
//                         transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                       />
//                     )}
//                   </motion.div>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Theme Toggle & Mobile Menu */}
//           <div className="flex items-center space-x-2">
//             <ThemeToggle />
            
//             {/* Mobile menu */}
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild className="md:hidden">
//                 <Button variant="ghost" size="icon">
//                   <Menu className="h-5 w-5" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-80">
//                 <div className="flex items-center justify-between mb-6">
//                   <span className="text-lg font-semibold">Navigation</span>
//                 </div>
//                 <nav className="space-y-2">
//                   {navigation.map((item) => {
//                     const isActive = location.pathname === item.href;
//                     return (
//                       <Link
//                         key={item.name}
//                         to={item.href}
//                         onClick={() => setIsOpen(false)}
//                         className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                           isActive
//                             ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
//                             : 'hover:bg-gray-100 dark:hover:bg-gray-800'
//                         }`}
//                       >
//                         <item.icon className="w-5 h-5" />
//                         <span className="font-medium">{item.name}</span>
//                       </Link>
//                     );
//                   })}
//                 </nav>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // ✅ Added useNavigate
import { motion } from 'framer-motion';
import { Menu, X, Home, FileText, Gift, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Cookies from "js-cookie"; // ✅ Added js-cookie

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Complaints', href: '/complaints', icon: FileText },
  { name: 'Schemes', href: '/schemes', icon: Gift },
  { name: 'Traffic Updates', href: '/traffic', icon: MapPin },
  { name: 'Elderly Program', href: '/elderly-program', icon: Users },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // ✅ useNavigate hook

  // ✅ Logout function
  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center"
            >
              <Home className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              GovServe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                    }`}
                  >
                    <item.icon className="w-4 h-4 inline mr-2" />
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
            {/* ✅ Logout Button (Desktop) */}
            <Button onClick={handleLogout} variant="outline" size="sm" className="ml-4">
              Logout
            </Button>
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-semibold">Navigation</span>
                </div>
                <nav className="space-y-2">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* ✅ Logout Button (Mobile) */}
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  variant="destructive"
                  className="w-full mt-6"
                >
                  Logout
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
