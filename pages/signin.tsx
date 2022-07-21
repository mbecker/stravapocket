import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/images/logo.svg"
          alt="Sportspocket"
        />
      </div>
      <div className="mt-2 sm:mx-auto w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mt-2">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Sign in with
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3">
              <div>
                <button
                  onClick={() => signIn("strava")}
                  className="btn btn-outline w-full hover:bg-gray-50"
                >
                  <img src="/images/strava_128.png" className="w-5 h-5" />
                  <span className="ml-4">Sign in with Strava</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
