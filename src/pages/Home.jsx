import React from 'react';
import { FaUserGraduate, FaBuilding, FaFilter, FaFileAlt, FaComments, FaLightbulb, FaQuoteLeft, FaStar, FaPhone, FaEnvelope, FaLocationArrow, FaClock } from 'react-icons/fa';
import { Footer } from '../components'

const Home = () => {
  return (
    <div>
      <section className="bg-gradient-to-b from-white to-light-blue-100 lg:py-2 code-section dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto mb-24 px-6">
          <div className="flex flex-col-reverse items-center lg:flex-row">
            <div className="mt-12 w-full lg:mt-32 lg:w-[45%] lg:pr-14">
              <h1 className="mb-4 text-center text-4xl font-bold lg:text-left lg:text-5xl xl:text-6xl dark:text-white">
                Transform Your Career Path
              </h1>
              <p className="mb-12 text-center text-xl text-gray-700 lg:text-left dark:text-gray-300">
                Experience how Unintern connects ambitious students with leading companies, paving the way for rewarding internships.
              </p>
              <div className="mb-12 flex items-center justify-center lg:items-start lg:justify-start">
                <a href="/jobs" className="items-center rounded-lg bg-blue-400 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-500">
                  Explore Internships
                </a>
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-full lg:w-[55%] lg:pl-6">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/industry-academia-collaboration-8803739-7140914.png" alt="Hero" className="mt-8 max-h-[200px] lg:max-h-[500px] h-auto w-auto object-contain lg:mt-0" />
            </div>
          </div>
        </div>
      </section>
      <section className="flex bg-white code-section dark:bg-gray-800">
        <div className="container mx-auto py-12 xl:px-12 2xl:px-36">
          <div className="flex flex-col items-stretch lg:flex-row">
            <div className="relative flex-1 p-10 lg:w-1/2">
              <div className="absolute bottom-0 right-0 z-0 h-4/5 w-4/5 bg-gray-200 dark:bg-gray-700"></div>
              <img className="relative bottom-10 right-10 z-[1] aspect-square object-cover lg:absolute xl:relative xl:bottom-0 xl:right-0" src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/1b046585-8bed-446c-80e1-bee8271c9000/public" alt="Discover Unintern" />
            </div>
            <div className="px-14 pt-10 lg:w-1/2">
              <h3 className="pb-4 text-base font-medium uppercase tracking-widest text-blue-500 dark:text-blue-400">Discover Unintern</h3>
              <h1 className="mb-6 border-b-8 border-blue-500 text-3xl font-semibold text-gray-800 lg:text-5xl dark:text-white">Empowering Your Internship Journey</h1>
              <p className="mb-8 text-base font-normal tracking-wide text-gray-600 dark:text-gray-300">Unintern is designed to seamlessly connect students with valuable internship opportunities, ensuring a straightforward and effective recruitment experience. Our platform fosters meaningful connections between aspiring professionals and forward-thinking companies, all within a sleek, user-friendly interface that prioritizes your needs.</p>
              <div className="mb-8 flex flex-row space-x-6">
                <div className="flex flex-1 flex-col">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-3xl text-white">
                    <FaUserGraduate />
                  </div>
                  <div className="mb-1 text-2xl font-medium dark:text-white">Tailored Experience</div>
                  <div className="tracking-wide text-gray-600 dark:text-gray-300">Create a personalized profile to showcase your skills and track your internship applications effortlessly.</div>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-3xl text-white">
                    <FaBuilding />
                  </div>
                  <div className="mb-1 text-2xl font-medium dark:text-white">Streamlined Recruitment</div>
                  <div className="tracking-wide text-gray-600 dark:text-gray-300">Employers can post opportunities and manage applications with ease, ensuring a smooth hiring process.</div>
                </div>
              </div>
              <a href="/login" className="inline-block bg-blue-500 px-6 py-3 text-base font-semibold uppercase tracking-widest text-white hover:bg-blue-600">Start Your Journey</a>
            </div>
          </div>
        </div>
      </section>
      <section className="relative code-section">
        <div className="absolute inset-0 h-[30rem] w-full bg-cover bg-center object-cover brightness-[.25] bg-[url('https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/1cb1f295-6ac1-436e-256a-2772e40de000/public')]" />
        <div className="container relative z-10 mx-auto py-24 xl:px-12 2xl:px-36">
          <div className="text-center text-white">
            <h3 className="pb-4 text-base font-medium uppercase tracking-widest text-blue-500">Explore Internship Opportunities</h3>
            <h2 className="mx-auto mb-6 text-center text-3xl font-semibold md:text-4xl">Bridging Students and Companies for a Brighter Future</h2>
            <p className="mb-8 text-center text-xl">Unintern revolutionizes the internship search process, making it effortless for students to find meaningful work experiences. Our platform is designed for clarity and excellence, enabling users to connect with potential employers and explore opportunities that enhance their careers.</p>
          </div>
          <div className="flex flex-wrap px-4 lg:mt-28 lg:grid lg:flex-none lg:grid-cols-3 lg:place-items-center lg:items-stretch lg:justify-center lg:gap-x-6 lg:gap-y-6">
            <div className="w-full p-6 md:w-1/2 lg:w-auto lg:p-0">
              <div className="h-full bg-white p-6 shadow-xl rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 dark:bg-gray-800">
                <div className="mb-12 mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-3xl text-blue-500">
                  <FaUserGraduate />
                </div>
                <h4 className="mb-6 text-2xl font-semibold dark:text-white">Personalized Student Profiles</h4>
                <p className="mb-6 font-light text-gray-700 dark:text-gray-300">Create a unique profile showcasing your skills and experiences, easily track your applications, and receive timely updates on your progress.</p>
              </div>
            </div>
            <div className="relative w-full p-6 md:w-1/2 lg:-top-12 lg:w-auto lg:p-0">
              <div className="h-full bg-blue-500 p-6 shadow-xl rounded-lg transition-transform duration-300 ease-in-out hover:scale-105">
                <div className="mb-12 mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-white text-3xl text-gray-800">
                  <FaBuilding />
                </div>
                <h4 className="mb-6 text-2xl font-semibold text-white">Employer-Centric Dashboard</h4>
                <p className="mb-6 font-light text-white">Streamline your hiring process with our intuitive tools for posting internships, reviewing applications, and engaging with candidates effectively.</p>
              </div>
            </div>
            <div className="w-full p-6 lg:w-auto lg:p-0">
              <div className="h-full bg-white p-6 shadow-xl rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 dark:bg-gray-800">
                <div className="mb-12 mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-3xl text-blue-500">
                  <FaFilter />
                </div>
                <h4 className="mb-6 text-2xl font-semibold dark:text-white">Advanced Search and Filters</h4>
                <p className="mb-6 font-light text-gray-700 dark:text-gray-300">Easily discover internships that match your criteria with our robust search functionality, allowing you to filter by location, industry, and more.</p>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-auto lg:p-0">
              <div className="h-full bg-white p-6 shadow-xl rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 dark:bg-gray-800">
                <div className="mb-12 mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-3xl text-blue-500">
                  <FaFileAlt />
                </div>
                <h4 className="mb-6 text-2xl font-semibold dark:text-white">Comprehensive Internship Listings</h4>
                <p className="mb-6 font-light text-gray-700 dark:text-gray-300">Access detailed information about each internship, including requirements and benefits, to make informed application decisions.</p>
              </div>
            </div>
            <div className="relative w-full p-6 md:w-1/2 lg:-top-12 lg:w-auto lg:p-0">
              <div className="h-full bg-blue-500 p-6 shadow-xl rounded-lg transition-transform duration-300 ease-in-out hover:scale-105">
                <div className="mb-12 mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-white text-3xl text-gray-800">
                  <FaComments />
                </div>
                <h4 className="mb-6 text-2xl font-semibold text-white">Community and Networking</h4>
                <p className="mb-6 font-light text-white">Engage with fellow students and industry professionals through our platform, fostering connections that can influence your career trajectory.</p>
              </div>
            </div>
            <div className="w-full p-6 lg:w-auto lg:p-0">
              <div className="h-full bg-white p-6 shadow-xl rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 dark:bg-gray-800">
                <div className="mb-12 mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-3xl text-blue-500">
                  <FaLightbulb />
                </div>
                <h4 className="mb-6 text-2xl font-semibold dark:text-white">Resources and Guidance</h4>
                <p className="mb-6 font-light text-gray-700 dark:text-gray-300">Access valuable articles and tips tailored specifically to help you navigate the internship landscape and enhance your employability.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[var(--light-background-color)] code-section dark:bg-gray-900">
        <div className="container relative z-10 mx-auto py-24 xl:px-12 2xl:px-36">
          <h3 className="pb-4 text-center text-lg font-medium uppercase tracking-widest text-blue-500 dark:text-blue-400">Unintern Gallery</h3>
          <h2 className="mx-auto mb-6 text-center text-4xl font-bold border-b-4 border-blue-500 dark:border-blue-400">Visualizing Your Opportunities</h2>
          <p className="mb-8 text-base font-normal tracking-wide text-gray-600 dark:text-gray-300">Explore the dynamic experiences awaiting you through Unintern. Each image in this gallery illustrates the exciting world of internships and training opportunities that connect students like you with leading companies. Discover how these environments foster professional growth as you embark on your career journey.</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-3">
            <img className="aspect-square object-cover transition-transform duration-300 ease-in-out hover:scale-105" src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/08466cc0-75b8-4a76-8e26-11f9358f3b00/public" alt="Gallery" />
            <img className="aspect-square object-cover transition-transform duration-300 ease-in-out hover:scale-105" src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/d511f69a-c9ac-4119-853e-3cb57ac51300/public" alt="Gallery" />
            <img className="aspect-square object-cover transition-transform duration-300 ease-in-out hover:scale-105" src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/ff322db6-8400-463d-4871-b80f3348b300/public" alt="Gallery" />
            <img className="aspect-square object-cover transition-transform duration-300 ease-in-out hover:scale-105" src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/38969d0f-5423-4010-fd80-aacc4b6cac00/public" alt="Gallery" />
            <img className="aspect-square object-cover transition-transform duration-300 ease-in-out hover:scale-105" src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/0624bdac-78d8-45b6-d334-20b7ab12fb00/public" alt="Gallery" />
            <img className="aspect-square object-cover transition-transform duration-300 ease-in-out hover:scale-105" src="https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/5f0845c8-2cfd-414a-2aef-eb6ea8a3ed00/publicContain" alt="Gallery" />
          </div>
        </div>
      </section>
      <section className="code-section">
        <div className="container relative z-10 mx-auto px-4 py-24 xl:px-12 2xl:px-36">
          <h3 className="pb-4 text-center text-base font-medium uppercase tracking-widest text-[var(--primary-color)]">What Our Users Say</h3>
          <h2 className="md:text-4x mx-auto mb-12 text-center text-4xl font-bold"><span className="border-b-4 border-[var(--primary-color)] [font-family:var(--font-family-heading)]">Real Experiences with Unintern</span></h2>
          <div className="flex flex-col items-center justify-center space-y-12 lg:flex-row lg:space-x-6 lg:space-y-0">
            <div className="max-w-96 relative flex flex-col items-center justify-center rounded-md bg-[#ffffff] py-12 shadow-[0_0_6px_1px_rgba(0,0,0,0.1)] lg:w-96">
              <div className="absolute right-4 top-2"><FaQuoteLeft className="text-3xl text-[var(--primary-color)]" aria-hidden="true" /></div>
              <img className="mb-8 h-[75px] w-[75px] rounded-full object-cover" src="https://media.gettyimages.com/id/2156062809/photo/headshot-closeup-portrait-middle-eastern-israel-businesswoman-business-lady-standing-isolated.jpg?b=1&amp;s=612x612&amp;w=0&amp;k=20&amp;c=mPEqaET5s98W_40DmBTRbYY5z0F-_1YkqdC4TCHJeig=" alt="User" data-landingsite-gallery-type="image" data-testimonial-image="" data-dont-replace="" data-media="{&quot;id&quot;:&quot;2156062809&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}" />
              <div className="mb-2 flex">
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
              </div>
              <div className="mb-4 px-10 text-center font-thin tracking-wide text-[var(--dark-text-color)]">Unintern transformed my internship search! The platform is intuitive and user-friendly, allowing me to find tailored opportunities that match my career goals effortlessly.</div>
              <div className="font-medium uppercase tracking-wide">Sophia Turner</div>
              <div className="font-medium tracking-wide text-[var(--primary-color)]">Aspiring Marketing Specialist</div>
            </div>
            <div className="max-w-96 relative flex flex-col items-center justify-center rounded-md bg-[#ffffff] py-12 shadow-[0_0_6px_1px_rgba(0,0,0,0.1)] lg:w-96">
              <div className="absolute right-4 top-2"><FaQuoteLeft className="text-3xl text-[var(--primary-color)]" aria-hidden="true" /></div>
              <img className="mb-8 h-[75px] w-[75px] rounded-full object-cover" src="https://media.gettyimages.com/id/1309489745/photo/portrait-of-young-happy-indian-business-man-executive-looking-at-camera-eastern-male.jpg?b=1&amp;s=612x612&amp;w=0&amp;k=20&amp;c=K1pIuZ-758hZpczvQSLjxvyqeOwy5t5EklPn_ykBHfo=" alt="User" data-landingsite-gallery-type="image" data-testimonial-image="" data-dont-replace="" data-media="{&quot;id&quot;:&quot;1309489745&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}" />
              <div className="mb-2 flex">
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
              </div>
              <div className="mb-4 px-10 text-center font-thin tracking-wide text-[var(--dark-text-color)]">The employer dashboard made my recruitment process so smooth! Posting internships and managing applications has never been easier, significantly reducing my hiring time.</div>
              <div className="font-medium uppercase tracking-wide">David Lee</div>
              <div className="font-medium tracking-wide text-[var(--primary-color)]">HR Coordinator</div>
            </div>
            <div className="max-w-96 relative flex flex-col items-center justify-center rounded-md bg-[#ffffff] py-12 shadow-[0_0_6px_1px_rgba(0,0,0,0.1)] lg:w-96">
              <div className="absolute right-4 top-2"><FaQuoteLeft className="text-3xl text-[var(--primary-color)]" aria-hidden="true" /></div>
              <img className="mb-8 h-[75px] w-[75px] rounded-full object-cover" src="https://media.gettyimages.com/id/1450340623/photo/portrait-of-successful-mature-boss-senior-businessman-in-glasses-asian-looking-at-camera-and.jpg?b=1&amp;s=612x612&amp;w=0&amp;k=20&amp;c=_3BHqzEwN7yDJ5o41g1ofHVbEp1NYbcqisUY_Sd1eyA=" alt="User" data-landingsite-gallery-type="image" data-testimonial-image="" data-dont-replace="" data-media="{&quot;id&quot;:&quot;1450340623&quot;,&quot;src&quot;:&quot;iStock&quot;,&quot;type&quot;:&quot;image&quot;}" />
              <div className="mb-2 flex">
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
                <FaStar className="fa-xs text-yellow-500" aria-hidden="true" />
              </div>
              <div className="mb-4 px-10 text-center font-thin tracking-wide text-[var(--dark-text-color)]">Unintern is a game-changer for students! The resources and support available are invaluable, truly guiding me toward my career aspirations.</div>
              <div className="font-medium uppercase tracking-wide">Isabella Green</div>
              <div className="font-medium tracking-wide text-[var(--primary-color)]">Computer Science Student</div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-[var(--light-background-color)] code-section">
        <div className="absolute inset-0 h-[30rem] w-full bg-cover bg-center object-cover brightness-[.25] bg-[url('https://imagedelivery.net/xaKlCos5cTg_1RWzIu_h-A/be2e8651-afca-4c6d-37e6-dbc42dab3700/publicContain')]" data-landingsite-gallery-type="image"></div>
        <div className="container relative z-10 mx-auto px-6 py-24 xl:px-12 2xl:px-36">
          <div className="text-center text-white">
            <h3 className="pb-4 text-base font-medium uppercase tracking-widest text-[var(--primary-color)]">Reach Out to Unintern</h3>
            <h2 className="mx-auto mb-6 text-center text-3xl font-semibold md:text-4xl"><span className="border-b-4 border-[var(--primary-color)] [font-family:var(--font-family-heading)]">Connect with Us Today</span></h2>
            <p className="mb-8 text-center text-xl font-thin">Have questions about our internship platform or need assistance with your journey? Our dedicated team is here to provide you with the support you need to make the most of your opportunities.</p>
          </div>
          <div className="flex flex-col bg-[#ffffff] dark:bg-secondary-dark-bg p-8 shadow-2xl lg:flex-row">
            <div className="relative overflow-hidden lg:w-1/2">
              <div className="relative z-[1] p-4 dark:text-white text-black sm:p-10">
                <h3 className="pb-4 text-base font-medium uppercase tracking-widest">Contact Information</h3>
                <h2 className="mx-auto mb-6 text-xl font-medium sm:text-2xl md:text-4xl">
                  <span className="border-b-4 border-[var(--primary-color)]">Get in Touch</span></h2>
                <div className="mb-2 font-light tracking-wider sm:text-lg">
                  <FaPhone className="mr-2" aria-hidden="true" />
                <span>(555) 123 - 4567</span>
                </div>
                <div className="mb-2 font-light tracking-wider sm:text-lg">
                  <FaEnvelope className="mr-2" aria-hidden="true" />
                <span>support@unintern.com</span>
                </div>
                <div className="mb-2 font-light tracking-wider sm:text-lg">
                  <FaLocationArrow className="mr-2" aria-hidden="true" />
                <span>789 Innovation Rd. New York, NY</span>
                </div>
                <div className="mb-2 font-light tracking-wider sm:text-lg">
                  <FaClock className="mr-2" aria-hidden="true" />
                <span className="">Mon - Fri: 9:00am - 6:00pm</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <form className="space-y-6 pt-8 sm:p-8" data-landingsite-contact-form="">
                <div>
                  <input type="text" name="name" placeholder="Your Full Name" className="mt-2 w-full bg-[var(--light-background-color)] dark:bg-main-dark-bg p-2 shadow-sm" />
                </div>
                <div>
                  <input type="email" name="email" placeholder="Email Address" className="mt-2 w-full bg-[var(--light-background-color)] dark:bg-main-dark-bg p-2 shadow-sm" />
                </div>
                <div>
                  <input type="tel" name="phone" placeholder="Phone Number" className="mt-2 w-full bg-[var(--light-background-color)] dark:bg-main-dark-bg p-2 shadow-sm" />
                </div>
                <div>
                  <textarea name="message" rows="4" placeholder="Your Message" className="mt-2 w-full bg-[var(--light-background-color)] dark:bg-main-dark-bg p-2 shadow-sm" >
                  </textarea>
                </div>
                <div>
                  <button type="submit" className="w-full bg-[var(--primary-button-bg-color)] px-4 py-3 text-sm font-normal uppercase tracking-wider text-[var(--primary-button-text-color)] hover:bg-[var(--primary-button-hover-bg-color)]">Send Inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;