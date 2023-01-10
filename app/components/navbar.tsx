import { Link } from "@remix-run/react";

export const Navbar = ({
  logoUrl,
  navTitle = "blog",
}: {
  logoUrl?: string;
  navTitle?: string;
}) => {

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gray-800">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="flex items-center">
          <img className="w-16 h-16" src={logoUrl} alt="Logo" />
          <span className="font-semibold text-xl tracking-tight ml-2">
            {navTitle}
          </span>
        </Link>
      </div>

      <div className="flex items-center w-auto">
        <Link
          className="inline-block text-teal-200 hover:text-white mr-4"
          to={"/"}
        >
          Home
        </Link>

        <Link
          className="inline-block text-teal-200 hover:text-white mr-4"
          to={"/about"}
        >
          About
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
