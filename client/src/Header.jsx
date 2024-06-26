import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./context/UserContext"

const Header = () => {

  const {user} = useContext(UserContext);

  return (
    <div className="shadow-md shadow-primary mb-7">
      <header className="p-4 flex flex-col md:flex-row md:justify-evenly items-center">
        <Link
          to="/"
          className="logo flex items-center gap-2 text-primary mb-4 md:mb-0  md:w-[35vw]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
            />
          </svg>

          <span className="font-bold text-xl">stayHub</span>
        </Link>

        {/* search bar */}

        <div className="sm:w-full sm:flex sm:flex-row sm:items-center sm:justify-evenly md:w-[57vw] lg:justify-between md:justify-between min-[1023px]:w-[49vw]">
          {/* <div className=" flex border border-gray-300 sm:rounded-md  md:rounded-full py-2 px-4 flex-col sm:flex-row gap-2 font-bold shadow-md shadow-grey-100 mb-4 md:mb-0"> */}
          <div className=" flex border border-gray-300  md:flex-row gap-2  py-2 px-3  sm:rounded-full  font-bold shadow-md shadow-grey-100 mb-4 md:mb-0">
            <div className="sm:mb-2">Anywhere</div>
            <div className="border border-l-grey-300"></div>
            <div className="sm:mb-2 md:mb-0">Any Week</div>
          </div>

          {/* user */}

          <Link
            to={user ? "/account" : "/login"}
            className=" flex items-center text-center  gap-2 border border-gray-300 py-2 px-4 rounded-full font-bold min-[320px]:justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            <div className="bg-gray-500 rounded-full border border-gray-500 text-white overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {!!user && (
              <div>
                {console.log(user.name)}
                {user.name}
              </div>
            )}
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header