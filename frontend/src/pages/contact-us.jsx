import React, { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/contact-us`, formData);

      if (res.data.success) {
        toast.success("Your message has been sent successfully! We'll get back to you soon.", {
          position: "top-right",
          autoClose: 5000,
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(res.data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      toast.error("Failed to send your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Appbar />
      <div className="min-h-[93vh] bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Left Section */}
            <div className="p-10 bg-gradient-to-br from-blue-500 via-teal-600 to-indigo-600 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-extrabold mb-4">Let's Connect</h2>
                <p className="text-xl mb-8">
                  Have a groundbreaking project idea or need a tailored web/mobile solution? Let's collaborate to turn your vision into reality with cutting-edge technology.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6" />
                  <span className="text-lg font-medium">+91 9120105095</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6" />
                  <span className="text-lg font-medium">arpit@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6" />
                  <span className="text-lg font-medium">Lucknow, India</span>
                </div>
              </div>
              <div className="mt-8 w-full h-56 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
                <img
                  src="/connect.jpg"
                  alt="Connection Illustration"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Section: Form */}
            <div className="p-10">
              <p className="text-gray-600 dark:text-gray-300 mb-10">
                Drop me a message using the form below, or reach out directly via phone or email. I'm excited to hear from you!
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-5 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-5 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-5 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-5 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                    placeholder="Share your project details or questions..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300"
                >
                  <Send className="w-5 h-5 mr-3" />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Contactus;
