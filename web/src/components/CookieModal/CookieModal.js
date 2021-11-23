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
                <div className="flex items-center w-full">
                  <div className="text-gray-900 font-medium text-lg">
                    Before you contine to Tskr
                  </div>
                </div>
                <hr />
                <div className="">
                  Tskr uses cookies and data to:
                  <ul>
                    <li>* Allow users to authenticate</li>
                    <li>* Track if you{"'"}ve accepted this cookie notce</li>
                  </ul>
                </div>
                <hr />
                <div className="ml-auto">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      Cookies.set('acceptCookies', true)
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
