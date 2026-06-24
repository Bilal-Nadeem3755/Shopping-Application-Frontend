import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
   <div className="min-h-screen overflow-x-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
     <div
  className={`
    fixed
    top-16
    left-0

    w-64
    
h-[calc(100vh-64px)]

    bg-linear-to-b
    from-slate-950
    via-slate-900
    to-purple-950

    text-white
    p-6
    shadow-xl
    z-50
    

    transform
    transition-transform
    duration-300

    ${
      sidebarOpen
        ? "translate-x-0"
        : "-translate-x-full md:translate-x-0"
    }
  `}
>
        <h2 className="text-2xl font-bold border-b border-gray-700 pb-4">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-3 mt-1.5">
          <Link
            to="/admin"
            className="px-4 py-3 rounded-lg hover:bg-white/10 hover:translate-x-2 transition-all duration-300"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="px-4 py-3 rounded-lg hover:bg-white/10 hover:translate-x-2 transition-all duration-300"
          >
            Products
          </Link>

          <Link
            to="/admin/orders"
            className="px-4 py-3 rounded-lg hover:bg-white/10 hover:translate-x-2 transition-all duration-300"
          >
            Orders
          </Link>

          <Link
            to="/admin/returns"
            className="px-4 py-3 rounded-lg hover:bg-white/10 hover:translate-x-2 transition-all duration-300"
          >
            Returns
          </Link>

          <Link
            to="/admin/reviews"
            className="px-4 py-3 rounded-lg hover:bg-white/10 hover:translate-x-2 transition-all duration-300"
          >
            Reviews
          </Link>

          <Link
            to="/admin/coupons"
            className="px-4 py-3 rounded-lg hover:bg-white/10 hover:translate-x-2 transition-all duration-300"
          >
            Coupons
          </Link>

          <Link
            to="/admin/users"
            className="px-4 py-3 rounded-lg hover:bg-white/10 hover:translate-x-2 transition-all duration-300"
          >
            Users
          </Link>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0

          w-64
          h-screen

          bg-linear-to-b
          from-slate-950
          via-slate-900
          to-purple-950

          text-white
          p-6
          shadow-xl

          z-50

          transform
          transition-transform
          duration-300

          md:hidden

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold border-b border-gray-700 pb-4 w-full">
            Admin Panel
          </h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className="
              ml-3
              w-10
              h-10

              rounded-xl

              bg-white/10
              backdrop-blur-xl

              border
              border-white/10

              flex
              items-center
              justify-center

              hover:bg-white/20

              transition-all
              duration-300
            "
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-3 mt-6">
          <Link
            to="/admin"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded-lg hover:bg-white/10"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded-lg hover:bg-white/10"
          >
            Products
          </Link>

          <Link
            to="/admin/orders"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded-lg hover:bg-white/10"
          >
            Orders
          </Link>

          <Link
            to="/admin/returns"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded-lg hover:bg-white/10"
          >
            Returns
          </Link>

          <Link
            to="/admin/reviews"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded-lg hover:bg-white/10"
          >
            Reviews
          </Link>

          <Link
            to="/admin/coupons"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded-lg hover:bg-white/10"
          >
            Coupons
          </Link>

          <Link
            to="/admin/users"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded-lg hover:bg-white/10"
          >
            Users
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className="
        flex-1
    w-full

    p-4
    md:p-6

    md:ml-64

    overflow-x-hidden
        "
      >
        {/* Mobile Menu Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="
              flex
              items-center
              gap-2

              px-5
              py-3

              rounded-2xl

              bg-white/10
              backdrop-blur-xl

              border
              border-white/10

              text-white
              font-medium

              shadow-lg

              hover:bg-white/15

              transition-all
              duration-300
            "
          >
            ☰ Menu
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;