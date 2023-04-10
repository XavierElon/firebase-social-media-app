import { Link } from 'react-router-dom'
const NotFound = () => {
  console.log('not found')
  return (
    <div className="h-screen w-screen bg-zinc-900">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="container">
          <div className="section-inner primary-bordered">
            <div className="corner-black bordered-primary top-left" />
            <div className="corner-black bordered-primary bottom-right large" />
            <h4 className="text-white text-center ">
              On No, This Page Is Not Found!
            </h4>

            <div className="row w-row">
              <div className="flex flex-col pb-6 gap-3">
                <Link
                  to="/"
                  className="custom-button small white w-inline-block text-center"
                >
                  <div className="custom-button-hover primary" />
                  <div className="corner-black bottom-right small" />
                  <div className="corner-black top-left small" />
                  <div className="custom-button-text text-sky-400">
                    Return Home
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
