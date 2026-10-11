import { MdCatchingPokemon } from "react-icons/md";
import '../css/Footer.css'


function Footer() {

    const year = new Date().getFullYear()
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-top">
                    <div className="footer-brand">
                        <a href="#home" className="footer-logo">
                            <MdCatchingPokemon className="footer-logo-icon" />
                            <span className="footer-logo-text">
                                Poké<span className="footer-logo-accent">Atlas</span>
                            </span>
                        </a>
                        <p className="footer-tagline">Explore. Discover. Collect.</p>
                    </div>

                    <p className="footer-credit">
                        Designed &amp; built by <span>Berat Karabulut</span>
                    </p>
                </div>

                <div className="footer-bottom">
                    <p>© {year} PokéExplorer. All rights reserved.</p>
                    <span className="footer-dot" aria-hidden="true" />
                    <p>Data provided by PokéAPI.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer