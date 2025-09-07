import React from "react";
import Image from "next/image";
import Link from "next/link";

import visa from "../../assets/images/Visa_Inc._logo.svg.png";
import mastercard from "../../assets/images/MasterCard_Logo.svg.png";
import paypal from "../../assets/images/PayPal.svg.webp";
import appstore from "../../assets/images/download-on-the-app-store-apple-logo-png-transparent.png";
import googleplay from "../../assets/images/google-play-badge-2022-2.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-10">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        
        <div className="flex flex-col   gap-4 mb-8">
          <h2 className="text-lg font-medium text-gray-700">
            Get the FreshCart app
          </h2>
          <p className="text-sm text-gray-500">
            We will send you a link, open it on your phone to download the app.
          </p>
        </div>

        <div className="flex gap-2 max-w-lg">
          <input
            type="email"
            placeholder="Email..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
            Share App Link
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-10 border-t pt-6 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Payment Partners</span>
            <Image src={visa} alt="Visa" className="h-6 w-auto" />
            <Image src={mastercard} alt="Mastercard" className="h-6 w-auto" />
            <Image src={paypal} alt="Paypal" className="h-6 w-auto" />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Get deliveries with FreshCart</span>
            <Link href="#">
              <Image src={appstore} alt="App Store" className="h-10 w-auto" />
            </Link>
            <Link href="#">
              <Image src={googleplay} alt="Google Play" className="h-10 w-auto" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
