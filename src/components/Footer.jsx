import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-linear-to-r from-slate-950 via-blue-950 to-slate-950 text-gray-300 mt-16">

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* COMPANY */}
          <div>
            <img
            src="https://lzd-img-global.slatic.net/us/domino/3b870cb043c7f8a9741cbf66329e294e.png"
            className="h-12 md:h-12 my-5 mt-1"
          />

            <p className="text-gray-400 leading-7 text-sm">
              Discover quality products at the best prices.
              Fast delivery, secure payments and trusted shopping.
            </p>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Shop
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  All Products
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  New Arrivals
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Best Sellers
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Deals & Offers
                </a>
              </li>
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Account
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  My Profile
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  My Orders
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Wishlist
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Cart
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>

            <p className="text-sm wrap-break-word">
              support@darazclone.com
            </p>

            <p className="text-sm mt-2">
              +92 300 1234567
            </p>

            <div className="flex flex-wrap gap-4 mt-5 text-xl">

              <a href="#">
                <FaFacebookF className="hover:text-cyan-400 transition duration-300" />
              </a>

              <a href="#">
                <FaInstagram className="hover:text-cyan-400 transition duration-300" />
              </a>

              <a href="#">
                <FaTwitter className="hover:text-cyan-400 transition duration-300" />
              </a>

              <a href="#">
                <FaYoutube className="hover:text-cyan-400 transition duration-300" />
              </a>

            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 mt-10 pt-6">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-sm text-gray-400 text-center">
              © 2026 Daraz Clone. All Rights Reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">

              <a href="#" className="hover:text-cyan-400 transition">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-cyan-400 transition">
                Terms & Conditions
              </a>

              <a href="#" className="hover:text-cyan-400 transition">
                Contact Us
              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;