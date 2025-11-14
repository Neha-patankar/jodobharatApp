import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50 flex items-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden relative">
        {/* Top Home Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center gap-2 text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-all px-4 py-2 rounded-full shadow-sm"
        >
          <Home className="w-4 h-4" /> Home
        </button>

        <header className="px-6 py-8 sm:px-10 bg-gradient-to-r from-indigo-700 to-indigo-500 text-white text-center">
          <h1 className="text-4xl font-bold tracking-wide">PRIVACY POLICY</h1>
          <p className="mt-2 text-indigo-100 text-sm">Last updated: <span className="font-medium">{new Date().toLocaleDateString()}</span></p>
        </header>

        <article className="px-6 py-10 sm:px-10 space-y-10">
          <section className="prose prose-slate max-w-none text-gray-700 leading-relaxed">
            <div className="space-y-8">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md inline-block">Privacy Policy</h2>
                <p className="mt-3">
                  Aanshi Solutions built the jodobharat.com app. This SERVICE is provided by Aanshi Solutions and is intended for use as is. This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.
                </p>
                <p className="mt-2">
                  If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md inline-block">Information Collection and Use</h2>
                <p className="mt-3">
                  For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to name, address, location, and pictures. The information that we request will be retained by us and used as described in this privacy policy.
                </p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md inline-block">Log Data</h2>
                <p className="mt-3">
                  Whenever you use our Service, in case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device's IP address, device name, operating system version, app configuration, time and date of your use, and other statistics.
                </p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md inline-block">Cookies</h2>
                <p className="mt-3">
                  Cookies are small data files used as unique identifiers. They are sent to your browser from websites and stored on your device. Our Services do not use cookies explicitly, but third-party code and libraries might use them to improve service quality. You can choose to accept or refuse these cookies.
                </p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md inline-block">Service Providers</h2>
                <p className="mt-3">We may employ third-party companies and individuals due to the following reasons:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>To facilitate our Service</li>
                  <li>To provide the Service on our behalf</li>
                  <li>To perform Service-related services</li>
                  <li>To assist us in analyzing how our Service is used</li>
                </ul>
                <p className="mt-3">
                  These third parties have access to your Personal Information only to perform assigned tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md inline-block">Security</h2>
                <p className="mt-3">
                  We value your trust in providing us your Personal Information and strive to use commercially acceptable means to protect it. However, please remember that no method of transmission or electronic storage is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md inline-block">Links to Other Sites</h2>
                <p className="mt-3">
                  This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. We strongly advise you to review the Privacy Policy of these websites as we have no control over their content or practices.
                </p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md inline-block">Children’s Privacy</h2>
                <p className="mt-3">
                  Our Services do not address anyone under the age of 13. We do not knowingly collect personal information from children under 13. If discovered, such data will be deleted immediately. Parents or guardians are encouraged to contact us for necessary actions.
                </p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md inline-block">Changes to This Privacy Policy</h2>
                <p className="mt-3">
                  We may update our Privacy Policy from time to time. Thus, please review this page periodically for any updates. Changes are effective immediately upon posting.
                </p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md inline-block">Contact Us</h2>
                <div className="rounded-lg border border-gray-200 bg-indigo-50 p-5 mt-3">
                  <p className="font-medium text-gray-800">If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at</p>
                  <p className="mt-3 text-gray-700 whitespace-pre-line">Mail : vishalhporwal@gmail.com\nCall: +91-98270-72993\nWebsite : www.aanshisolutions.com</p>
                </div>
              </div>
            </div>
          </section>
        </article>

        <footer className="px-6 py-6 sm:px-10 text-sm text-center text-gray-500 bg-gray-100 border-t">© {new Date().getFullYear()} Aanshi Solutions. All rights reserved.</footer>
      </div>
    </main>
  );
}