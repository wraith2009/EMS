import Link from "next/link";
import React from "react";
import {
  FaDiscord,
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-primary-red text-white p-4">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0"></div>
          <div className="flex gap-6 items-start">
            <div>
              <h2 className="mb-6 font-semibold text-black">Resources</h2>
              <ul className="te-2-slate-300 text-sm dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    CampusSync
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-semibold text-black">Follow us</h2>
              <ul className="text-slate-200 text-sm dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline ">
                    Github
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-semibold text-black">Legal</h2>
              <ul className="text-slate-200 text-sm dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="sm:flex sm:items-center sm:justify-between mt-10">
          <span className="text-sm text-slate-200 sm:text-center dark:text-gray-400">
            © 2024 CampusSync All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link
              href="#"
              className="text-slate-200 hover:text-white dark:hover:text-white"
            >
              <FaFacebook />
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link
              href="#"
              className="text-slate-200 hover:text-white dark:hover:text-white ms-5"
            >
              <FaDiscord />
              <span className="sr-only">Discord community</span>
            </Link>
            <Link
              href="#"
              className="text-slate-200 hover:text-white dark:hover:text-white ms-5"
            >
              <FaXTwitter />
              <span className="sr-only">Twitter page</span>
            </Link>
            <Link
              href="#"
              className="text-slate-200 hover:text-white dark:hover:text-white ms-5"
            >
              <FaGithub />
              <span className="sr-only">GitHub account</span>
            </Link>
            <Link
              href="#"
              className="text-slate-200 hover:text-white dark:hover:text-white ms-5"
            >
              <FaDribbble />
              <span className="sr-only">Dribbble account</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
