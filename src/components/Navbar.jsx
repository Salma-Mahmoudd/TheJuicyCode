import { Link } from "react-router-dom";

export default function Navbar({ handleSearch, cart }) {
  return (
    <div className="navbar bg-base-100 shadow-sm px-10 fixed top-0 z-10">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          FreshBite
        </Link>
      </div>

      <label className="input mx-4">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          className="grow"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </label>

      <Link to="/cart">
        <div role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            <span className="badge badge-sm indicator-item bg-lime-300 py-3 rounded-full">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
