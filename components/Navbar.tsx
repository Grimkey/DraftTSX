import Link from 'next/link'

const NavBar = () => (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
        <div className="container">
            <a className="navbar-brand" href="#">DraftTS Demo</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link href="/"><a className="nav-link">Page 1</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/page2"><a className="nav-link">Page 2</a></Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default NavBar