import { Home, Wallet, Users2 } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 w-14 flex flex-col border-r bg-white sm:flex">
      <nav className="flex flex-col items-center gap-4 py-5">
        <div className="flex flex-col items-center space-y-4">
          <Link href="/home">
            <Home
              className="h-5 w-5 text-gray-400 hover:text-gray-500"
              aria-label="Home"
            />
          </Link>
          <Link href="/policy">
            <Wallet
              className="h-5 w-5 text-gray-400 hover:text-gray-500"
              aria-label="Policies"
            />
          </Link>
          <Link href="/customers">
            <Users2
              className="h-5 w-5 text-gray-400 hover:text-gray-500"
              aria-label="Customers"
            />
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
