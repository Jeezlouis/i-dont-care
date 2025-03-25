import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaLocationArrow, FaClock } from 'react-icons/fa';
import Copyright from './Copyright'


const Footer = () => {
  if (['/login', '/sign-up', '/forgotpassword', '*'].includes(location.pathname)) {
    return null;
  }
  return (
    <div className="bg-[var(--dark-background-color)] code-section">
      <div className="container mx-auto px-6 py-24 xl:px-12 2xl:px-36">
        <div className="grid grid-cols-1 pt-4 md:grid-cols-3 lg:grid-cols-4 lg:space-x-24">
          <div className="mb-8">
            <a href="/" className="mb-8 block text-3xl tracking-wider text-[var(--primary-color)] [font-family:var(--font-family-heading)]">Unintern</a>
            <p className="text-left font-light tracking-wider text-[var(--light-text-color)]">
              Unintern is a sleek and modern internship recruitment platform designed to connect students with companies offering internships and industrial training opportunities.
            </p>
            <div className="my-8 flex flex-row justify-center text-gray-400 md:justify-start">
              <a href="/" className="mr-3" aria-label="Visit our Facebook">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffffff]">
                  <FaFacebookF className="text-[var(--primary-color)]" aria-hidden="true" />
                </div>
              </a>
              <a href="/" className="mr-3" aria-label="Visit our Twitter">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffffff]">
                  <FaTwitter className="text-[var(--primary-color)]" aria-hidden="true" />
                </div>
              </a>
              <a href="/" className="mr-3" aria-label="Visit our Instagram">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffffff]">
                  <FaInstagram className="text-[var(--primary-color)]" aria-hidden="true" />
                </div>
              </a>
              <a href="/" className="mr-3" aria-label="Visit our LinkedIn">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffffff]">
                  <FaLinkedinIn className="text-[var(--primary-color)]" aria-hidden="true" />
                </div>
              </a>
            </div>
          </div>
          <div className="mb-8">
            <div className="mb-8 border-b-2 border-[var(--primary-color)] pb-4 text-xl tracking-wide text-[var(--light-text-color)]">Helpful Links</div>
            <a href="/" className="mb-2 block font-light text-[var(--light-text-color)]">Home</a>
            <a href="/blog" className="mb-2 block font-light text-[var(--light-text-color)]">Blog</a>
            <a href="/internships" className="mb-2 block font-light text-[var(--light-text-color)]">Internship Listings</a>
            <a href="/user/dashboard" className="mb-2 block font-light text-[var(--light-text-color)]">Student Dashboard</a>
            <a href="/admin/dashboard" className="mb-2 block font-light text-[var(--light-text-color)]">Employer Dashboard</a>
            <a href="/contact" className="mb-2 block font-light text-[var(--light-text-color)]">Contact</a>
          </div>
          <div className="mb-8 lg:col-span-2">
            <div className="mb-8 border-b-2 border-[var(--primary-color)] pb-4 text-xl tracking-wide text-[var(--light-text-color)]">Reach Us</div>
            <div className="mb-2 flex flex-row font-light tracking-wider text-[var(--light-text-color)] items-center">
              <FaPhone className="mr-2 w-6 flex-none text-[var(--primary-color)]" aria-hidden="true" /><span>(555) 123 - 4567</span>
            </div>
            <div className="mb-2 flex flex-row font-light tracking-wider text-[var(--light-text-color)] items-center">
              <FaEnvelope className="mr-2 w-6 flex-none text-[var(--primary-color)]" aria-hidden="true" /><span className="w-[90%] break-words">info@unintern.com</span>
            </div>
            <div className="mb-2 flex flex-row font-light tracking-wider text-[var(--light-text-color)] items-center">
              <FaLocationArrow className="mr-2 w-6 flex-none text-[var(--primary-color)]" aria-hidden="true" /><span>456 Oak Ave. Denver, CO</span>
            </div>
            <div className="mb-2 flex flex-row font-light tracking-wider text-[var(--light-text-color)] items-center">
              <FaClock className="mr-2 w-6 flex-none text-[var(--primary-color)]" aria-hidden="true" /><span>Mon - Fri: 9:00am - 5:00pm</span>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-[var(--dark-border-color)] py-4 text-center text-sm text-[var(--gray-text-color)]">
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default Footer;