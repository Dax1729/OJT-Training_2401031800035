function Footer() {
  return (
    <footer 
      className="footer" 
      style={{ 
        width: '100vw',          // Forces the footer background to match the exact viewport width
        position: 'relative',    // Helps it break out of parent containers
        left: '50%',             // Moves it to the middle of the screen
        right: '50%',
        marginLeft: '-50vw',     // Pulls the left side perfectly back to the edge of the browser window
        marginRight: '-50vw',
        background: '#0d0d0d',   // Your exact dark background color
        padding: '3rem 2rem 1.5rem 2rem',
        boxSizing: 'border-box'
      }}
    >
      {/* INNER CONTAINER: Spreads the links out but keeps them from touching the monitor edges */}
      <div 
        className="footer-top" 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          flexWrap: 'wrap',
          gap: '2rem',
          maxWidth: '1200px',     // Keeps the text looking sharp and unified
          margin: '0 auto',
          textAlign: 'left' 
        }}
      >
        {/* BRAND COL */}
        <div className="footer-brand" style={{ flex: '1', minWidth: '250px', textAlign: 'left' }}>
          <span className="nav-logo" style={{ display: 'block', marginBottom: '1rem' }}>
            <span className="logo-bracket">[</span>
            VintageVault
            <span className="logo-bracket">]</span>
          </span>
          <p style={{ margin: 0, lineHeight: '1.6', textAlign: 'left', color: '#888' }}>
            Preserving the artefacts of computing history since 1998.
          </p>
        </div>

        {/* NAVIGATE COL */}
        <div className="footer-links-group" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <h5 style={{ textAlign: 'left' }}>Navigate</h5>
          <a href="index.html">Home</a>
          <a href="catalog.html">Catalog</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
        </div>

        {/* CATALOG COL */}
        <div className="footer-links-group" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <h5 style={{ textAlign: 'left' }}>Catalog</h5>
          <a href="catalog.html">Microcomputers</a>
          <a href="catalog.html">Workstations</a>
          <a href="catalog.html">Input Devices</a>
          <a href="catalog.html">Dev Tools</a>
        </div>

        {/* POLICIES COL */}
        <div className="footer-links-group" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <h5 style={{ textAlign: 'left' }}>Policies</h5>
          <a href="#">Authenticity Guarantee</a>
          <a href="#">Shipping & Returns</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>

      {/* SEPARATOR LINE */}
      <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '2rem 0 1.5rem 0', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }} />

      {/* BOTTOM SECTION */}
      <div className="footer-bottom flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <span className="items-center text-center">© 2026 VintageVault. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;