import { useState } from "react";
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex flex-col w-full relative z-50 bg-[#0d0d0d]">
      {/* MAIN NAVIGATION BAR */}
      <nav className="nav flex items-center justify-between p-4">
        {/* LOGO */}
        <a href="index.html" className="nav-logo">
          <span className="logo-bracket">[</span>
          VintageVault
          <span className="logo-bracket">]</span>
        </a>

        {/* DESKTOP NAV LINKS (Hidden on mobile, flex on medium screens and up) */}
        <ul className="nav-links hidden md:flex items-center space-x-6">
          <li>
            <a href="index.html" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="catalog.html">
              Catalog
            </a>
          </li>
          <li>
            <a href="about.html">
              About
            </a>
          </li>
          <li>
            <a href="contact.html">
              Contact
            </a>
          </li>
        </ul>

        {/* DESKTOP CALL TO ACTION (Hidden on mobile, inline-block on desktop) */}
        <a href="catalog.html" className="nav-cta hidden md:inline-block">
          Browse Archive
        </a>

        {/* HAMBURGER TOGGLE BUTTON (Visible on mobile, hidden on desktop) */}
        <button
          className="hamburger block md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          &#9776;
        </button>
      </nav>

      {/* MOBILE MENU DROPDOWN (Only opens when hamburger button is clicked) */}
      {menuOpen && (
        <div className="mobile-menu flex flex-col space-y-4 p-4 md:hidden bg-[#141414] absolute top-full left-0 right-0 z-50">
          <a href="index.html">Home</a>
          <a href="catalog.html">Catalog</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
        </div>
      )}
    </header>
  );
}

export default Header;