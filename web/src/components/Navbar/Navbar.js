const Navbar = () => {
  return (
    <div className="flex flex-wrap">
      <section className="relative mx-auto">
        {/*<!-- navbar -->*/}
        <nav className="flex justify-between bg-gray-900 text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            <a className="text-3xl font-bold font-heading" href="/">
              {/*<!-- <img class="h-9" src="logo.png" alt="logo"> -->*/}
              Tskr
            </a>
            {/*<!-- Nav Links -->*/}
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li>
                <a className="hover:text-gray-200" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-gray-200" href="https://docs.tskr.io">
                  Docs
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-200"
                  href="https://github.com/tskrio/tskr"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-200"
                  href="https://github.com/tskrio/tskr/issues/new"
                >
                  Leave Feedback
                </a>
              </li>
            </ul>
            {/* Header Icons */}{' '}
            <div className="hidden xl:flex items-stretch space-x-5">
              <a
                className="hover:text-gray-200"
                href="https://github.com/tskrio/tskr/stargazers"
              >
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </a>
              {/* Sign In / Register      */}{' '}
              <a className="flex items-center hover:text-gray-200" href="/#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
            </div>
          </div>
          {/* Responsive navbar */}{' '}
          <a className="navbar-burger self-center mr-12 xl:hidden" href="/#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </a>
        </nav>
      </section>
    </div>
  )
}

export default Navbar
