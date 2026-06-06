import { useEffect, useRef, useState } from 'react';

function Content() {
    const terminalLines = [
        { text: '$ ./vault_init.sh', cls: 't-amber' },
        { text: 'Authenticating archive...', cls: 't-muted' },
        { text: '✓ 200 items catalogued', cls: '' },
        { text: '✓ Provenance verified', cls: '' },
        { text: '✓ Condition grades assigned', cls: '' },
        { text: '', cls: '' },
        { text: '$ ls ./acquisitions/latest', cls: 't-amber' },
        { text: 'ibm_pc_5150_1981.json', cls: '' },
        { text: 'next_cube_1990.json', cls: '' },
        { text: 'dec_vt100_1978.json', cls: '' },
        { text: 'altair_8800_1975.json', cls: '' },
        { text: '', cls: '' },
        { text: '$ echo "Welcome to VintageVault"', cls: 't-amber' },
        { text: 'Welcome to VintageVault', cls: 't-cream cursor' },
    ];

    const [displayed, setDisplayed] = useState([]);
    const lineRef = useRef(0);
    const charRef = useRef(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        function step() {
            const li = lineRef.current;
            if (li >= terminalLines.length) return;
            const line = terminalLines[li];
            const ci = charRef.current;

            if (ci === 0) {
                setDisplayed(d => [...d, { text: '', cls: line.cls }]);
            }

            if (ci < line.text.length) {
                setDisplayed(d => {
                    const copy = d.slice();
                    copy[copy.length - 1] = { text: line.text.slice(0, ci + 1), cls: line.cls };
                    return copy;
                });
                charRef.current += 1;
                timeoutRef.current = setTimeout(step, line.cls === 't-muted' ? 18 : 35);
            } else {
                lineRef.current += 1;
                charRef.current = 0;
                timeoutRef.current = setTimeout(step, line.text === '' ? 100 : 220);
            }
        }

        timeoutRef.current = setTimeout(step, 600);
        return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
    <section className="hero"
        style={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            background: '#0d0d0d',
            padding: '3rem 2rem 1.5rem 2rem',
            boxSizing: 'border-box'
        }}
    >
        <div className="hero-bg-text">VINTAGE</div>
        <div className="hero-content">
            <p className="hero-eyebrow">Est. 1978 · Rare Technology Artifacts</p>
            <h1 className="hero-title">Where Machines<br /><em>Remember</em></h1>
            <p className="hero-sub">Curated vintage computers, dev tools, synthesizers, and engineering relics — sourced, restored, and archived for the discerning collector.</p>
            <div className="hero-actions">
                <a href="catalog.html" className="btn-primary">Explore Catalog</a>
                <a href="about.html" className="btn-ghost">Our Story</a>
            </div>
        </div>
        <div className="hero-terminal">
            <div className="terminal-bar flex items-center gap-2">
                <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                <span className="terminal-title">vault_init.sh</span>
            </div>
                <div className="terminal-body" id="terminalBody">
                    {displayed.map((line, index) => (
                        <div key={index} className={line.cls}>{line.text}</div>
                    ))}
                </div>
        </div>
    </section>
);
}

export default Content;
