function Sidebar() {
    return (
        <>
            <div className="container">
                <button className="btn btn-light profile mx-auto">
                    Navigation
                </button>
            </div>
            <hr className="bg-light mt-3" />
            <nav className="menu">
                <a className="menu-item" href="">
                    Calendar
                </a>
                <a className="menu-item" href="">
                    Chat
                </a>
            </nav>
        </>
    );
}

export default Sidebar;
