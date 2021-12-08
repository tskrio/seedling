import { icons } from 'src/lib/icons'
const Navbar = ({ isAuthenticated, currentUser }) => {
  return (
    <div className="flex flex-wrap">
      <section className="relative mx-auto">
        {/*<!-- navbar -->*/}
        <nav className="flex justify-between bg-gray-900 text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            {/*<a className="text-3xl font-bold font-heading" href="/">
              Tskr
            </a>*}
            {/* Responsive navbar */}{' '}
            {isAuthenticated && (
              <button
                className="navbar-burger self-center mr-12 xl:hidden"
                onClick={() => {
                  document
                    .querySelector('#navSideBar')
                    .classList.toggle(['hidden'])
                }}
              >
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
              </button>
            )}
            {!isAuthenticated && (
              <a
                className="navbar-burger self-center mr-12 xl:hidden"
                href="/login"
              >
                {icons.loginInverted}
              </a>
            )}
            {/*<!-- Nav Links -->*/}
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
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
                  {currentUser && (
                    <>
                      {currentUser.messages['Leave Feedback'] ||
                        'Leave Feedback'}
                    </>
                  )}
                  {!currentUser && <>Leave Feedback</>}
                </a>
              </li>
              {!isAuthenticated && (
                <>
                  <li>
                    <a
                      className="font-semibold flex items-center hover:text-gray-200"
                      href="/signup"
                    >
                      Sign up
                    </a>
                  </li>
                  <li>
                    <a
                      className="font-semibold flex items-center hover:text-gray-200"
                      href="/login"
                    >
                      Log in
                    </a>
                  </li>
                </>
              )}
            </ul>
            {/* Header Icons */}{' '}
            <div className="hidden xl:flex items-stretch space-x-5">
              {/* Sign In / Register      */}{' '}
              {isAuthenticated && (
                <a
                  className="font-semibold flex items-center hover:text-gray-200"
                  href="/logout"
                >
                  {currentUser.messages['Logout'] || 'Logout'}
                </a>
              )}
            </div>
          </div>
        </nav>
      </section>
    </div>
  )
}

export default Navbar
