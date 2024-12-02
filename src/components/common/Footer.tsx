import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {/* Column 1: About Us */}
        <div>
          <h3 className="text-4xl font-bold mb-4">The Newspaper</h3>
          <p className="text-gray-400 text-sm">
            We are dedicated to delivering the latest news from around the world.
            Stay updated with unbiased and accurate information.
          </p>
        </div>

        {/* Column 2: Categories */}
        <div>
          <h3 className="text-xl font-bold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/genre/world" className="hover:underline">
                World
              </Link>
            </li>
            <li>
              <Link href="/genre/business" className="hover:underline">
                Business
              </Link>
            </li>
            <li>
              <Link href="/genre/technology" className="hover:underline">
                Technology
              </Link>
            </li>
            <li>
              <Link href="/genre/sports" className="hover:underline">
                Sports
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:underline">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: info@newspaper.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 News Avenue, City, Country</li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} The Newspaper. All rights reserved.
      </div>
    </footer>
  );
}
