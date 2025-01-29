import AccountSettings from "./AccountMenu";

function NavBar() {
    return (
        <div className="w-full h-20 p-3 bg-zinc-800 border-b-1 mb-5 flex justify-around items-center text-center" id="navbar">
            <h1 className="text-xl">To-do List by Dark869</h1>
            <h2 className="text-lg hidden md:block"><a href="#">Todas</a></h2>
            <h2 className="text-lg hidden md:block"><a href="#">Terminadas</a></h2>
            <h2 className="text-lg hidden md:block"><a href="#">Por hacer</a></h2>
            <AccountSettings />
        </div>
    );
};

export default NavBar;