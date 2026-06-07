import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';
import { CONTACT_INFO, FAQS } from '../../utils/constants';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await userService.submitContactForm(formData);
      if (res.success) {
        setStatus({ type: 'success', message: res.message || 'Your message has been sent successfully!' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: res.message || 'Failed to send message. Please try again.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Something went wrong. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, title: 'Initial Consultation', text: 'Meet with our consultants to discuss your career goals and job preferences.' },
    { num: 2, title: 'Document Submission', text: 'Provide necessary documents for verification and eligibility assessment.' },
    { num: 3, title: 'Skill Evaluation', text: 'We conduct interviews, language tests, and skill assessments.' },
    { num: 4, title: 'Job Placement', text: 'Receive job offer and begin visa processing and training.' },
    { num: 5, title: 'Visa Processing', text: 'Complete visa application with full support and guidance.' },
    { num: 6, title: 'Pre-Departure', text: 'Receive orientation and training before departure to your new job.' },
    { num: 7, title: 'Travel Assistance', text: 'We arrange your travel and ensure smooth journey to destination.' },
    { num: 8, title: 'Post-Placement', text: 'Ongoing support after placement to ensure your success.' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white pt-24 pb-20 bg-gradient-to-br from-brandBlue to-blue-900">
        <div className="absolute w-[300px] h-[300px] bg-amber-500/10 rounded-full -top-[100px] -right-[100px]" />
        <div className="absolute w-[200px] h-[200px] bg-amber-500/5 rounded-full -bottom-[50px] -left-[50px]" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-heading">
              <span className="text-amber-300">Get in Touch</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We're here to help! Contact us for any queries about overseas job opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-center hover:scale-[1.02] transition-transform duration-300">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3 font-heading">Our Office</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ramnath Deoria Basement & Ground Floor,<br />
                Near Kali Mandir, Deoria Sadar R.S.,<br />
                Deoria Sadar, Deoria – 274001, Uttar Pradesh<br />
                <strong>INDIA</strong>
              </p>
            </div>
            
            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-center hover:scale-[1.02] transition-transform duration-300">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3 font-heading">Call Us</h3>
              <p className="text-slate-700 text-sm font-semibold mb-2">
                Main: <a href={`tel:${CONTACT_INFO.phone}`} className="text-amber-600 hover:underline">{CONTACT_INFO.phone}</a>
              </p>
              <p className="text-slate-500 text-xs mb-3">Available 24/7 for urgent queries</p>
              <p className="text-slate-700 text-sm font-semibold mb-1">
                General Enquiries: <a href={`tel:${CONTACT_INFO.enquiryPhone}`} className="text-amber-600 hover:underline">{CONTACT_INFO.enquiryPhone}</a>
              </p>
              <p className="text-slate-700 text-sm font-semibold">
                Employer Enquiries: <a href={`tel:${CONTACT_INFO.employerPhone}`} className="text-amber-600 hover:underline">{CONTACT_INFO.employerPhone}</a>
              </p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-center hover:scale-[1.02] transition-transform duration-300">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3 font-heading">Email Us</h3>
              <p className="text-slate-700 text-sm font-semibold mb-2">
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-amber-600 hover:underline break-all">{CONTACT_INFO.email}</a>
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mt-2">
                We'll respond to your email message within 24 business hours.
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-8 rounded-3xl border border-slate-100">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center font-heading">Business Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
                <p className="font-bold text-slate-800 font-heading">Monday - Saturday</p>
                <p className="text-slate-600 text-sm mt-1">9:00 AM - 7:00 PM</p>
              </div>
              <div className="text-center bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
                <p className="font-bold text-slate-800 font-heading">Sunday</p>
                <p className="text-slate-600 text-sm mt-1">Closed (emergency SMS only)</p>
              </div>
              <div className="text-center bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
                <p className="font-bold text-slate-800 font-heading">Holidays</p>
                <p className="text-slate-600 text-sm mt-1">Closed (Emergency support active)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Process Steps */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 font-heading">How It Works</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-amber-500 mb-4 font-heading">{st.num}</div>
                <h3 className="text-lg font-bold text-blue-900 mb-3 font-heading">{st.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{st.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12 font-heading">Send us a Message</h2>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            {status.message && (
              <div className={`p-4 mb-6 rounded-xl border ${
                status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
              }`}>
                <p className="text-sm font-semibold">{status.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-blue-900 mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-blue-900 mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required 
                    placeholder="+91-XXXXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-blue-900 mb-2">Subject *</label>
                  <input 
                    type="text" 
                    id="subject" 
                    required 
                    placeholder="Query subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-blue-900 mb-2">Message *</label>
                <textarea 
                  id="message" 
                  required 
                  placeholder="Please describe your query..."
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-xl shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading ? 'Sending Message...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12 font-heading">Find Us on Map</h2>
          <div className="rounded-3xl overflow-hidden shadow-lg border border-white" style={{ height: '400px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.0!2d83.7835!3d26.5024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991e01f0000001%3A0x1!2sDeoria%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="New Adarsh Office Location - Deoria, UP"
            />
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 font-heading">Why Contact Us?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-1 font-heading">Expert Guidance</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Get personalized advice from industry experts with 15+ years of experience.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-1 font-heading">Quick Response</h3>
                <p className="text-slate-600 text-sm leading-relaxed">We respond to your queries within 24 hours, ensuring timely assistance.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-1 font-heading">Multiple Channels</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Reach us via phone, email, in-person, or through our online contact form.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16 font-heading">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group border border-slate-150 rounded-2xl bg-white overflow-hidden shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between p-6 hover:bg-slate-50 transition-colors list-none">
                  <h3 className="text-lg font-bold text-blue-900 font-heading">{faq.question}</h3>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-br from-brandBlue to-blue-900 text-center py-16 px-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-3xl font-bold text-white mb-4 font-heading">Ready to Start Your Journey?</h3>
            <p className="text-blue-100 mb-8 text-lg">
              Don't wait any longer! Apply now or contact us for more information about available opportunities.
            </p>
            <Link to="/apply" className="px-7 py-3.5 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#9f1239] text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/20 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
