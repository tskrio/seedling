import Cookies from 'js-cookie'
import { useState } from 'react'

const CookieModal = () => {
  let previouslyAccepted = Cookies.get('acceptCookies') == 'true'
  const [acceptedCookies, setCookies] = useState(previouslyAccepted)
  return (
    <>
      {!acceptedCookies && (
        <>
          <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800">
            <div className="bg-white rounded-lg w-1/2">
              <div className="flex flex-col items-start p-4">
                <div className="flex items-center w-full text-center">
                  <div className="text-gray-900 font-medium text-lg w-full">
                    Before you contine to Tskr
                  </div>
                </div>
                <hr />
                <div className="">
                  <p>
                    We use cookies and similiar technologies to allow you the
                    ability to log in, as well as track if you have accepted
                    this notice.
                  </p>
                  <p>
                    By clicking {'"'}I accept{'"'}, or by using our site, you
                    consent to the use of cookies unless you have disabled them.
                  </p>
                </div>
                <hr />
                <div className="ml-auto">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      Cookies.set('acceptCookies', true, {
                        secure: true,
                        sameSite: 'strict',
                      })
                      setCookies(true)
                    }}
                  >
                    Agree
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CookieModal
