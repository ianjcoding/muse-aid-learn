import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Settings, LogOut, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LearnHub
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "default" : "ghost"}
                className="transition-all"
              >
                Courses
              </Button>
            </Link>
            <Link to="/kids">
              <Button 
                variant={location.pathname === "/kids" ? "default" : "ghost"}
                className="transition-all"
              >
                Kids Learning
              </Button>
            </Link>
            {user && (
              <Link to="/settings">
                <Button 
                  variant={location.pathname === "/settings" ? "default" : "ghost"}
                  size="icon"
                  className="transition-all"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {user ? (
              <Button 
                onClick={signOut}
                variant="outline"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="default" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
