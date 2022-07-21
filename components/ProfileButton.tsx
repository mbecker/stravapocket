import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { signOut } from "next-auth/react";

export default function ProfileButton() {
  return (
    <>
      <Menu as="div" className="flex-shrink-0 flex z-10">
        <div className="z-10 w-full flex items-center justify-center">
          <Menu.Button className="">
            <img
              className="block mx-auto h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-20 absolute left-16  bottom-0 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                    className={`${
                      active ? "bg-pink-400 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-base`}
                  >
                    {active ? (
                      <SignOutActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <SignOutInActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
function SignOutInActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-pink-400 stroke-2 w-6 h-6"
    >
      <path d="M10 4H16V10" />
      <path d="M16 4L8 12" />
      <path d="M8 6H4V16H14V12" />
    </svg>
  );
}

function SignOutActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-white stroke-2 w-6 h-6"
    >
      <path d="M10 4H16V10" />
      <path d="M16 4L8 12" />
      <path d="M8 6H4V16H14V12" />
    </svg>
  );
}
