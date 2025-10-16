import { useState } from "react";
import { 
  FaLinkedin, 
  FaInstagram, 
  FaPaperPlane, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaFacebook,
  FaFacebookMessenger
} from "react-icons/fa";
import axios from "axios";
const Contact = () => {
   const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [message, setmessage] = useState("");
    const[Loading,setLoading]=useState(false)
  const [error, setError] = useState("");

   const handleContactSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact/cretae-contact`, {
     name, email,message 
      });

      if (!res.data.success) {
        setError(res.data.message); 
      } else {
        setName("")
        setemail("")
        setmessage("")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error posting reply");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section
      id="contact"
      className="w-full p-4 flex flex-col items-center gap-y-12  text-white"
    >
      {/* Heading & Description */}
      <div className="flex flex-col items-center text-center space-y-4 max-w-3xl">
        <h2 className="text-3xl  uppercase font-bold">
          Contact Me
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Let’s connect! Whether you have a project in mind, want to <span className="text-pink-800 font-semibold">collaborate, </span> 
          so  drop me a message.
        </p>
    
      </div>
        {/* Error Message */}
      {error && (
        <div className="w-full max-w-3xl bg-red-600/20 border border-red-600 text-red-400 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Contact Layout */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl ">
        
        {/* Left: Contact Form */}
        <div className="flex-1 rounded-2xl bg-[rgb(32,32,35)] p-6 sm:p-8 shadow-lg shadow-black/60">
          <form  onSubmit={handleContactSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Your full name"
                value={name}
            onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5  
               text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-pink-800"
            />
            <input
              type="email"
              placeholder="your.email@example.com"
                value={email}
            onChange={(e) => setemail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 
               text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-pink-800"
            />
            <textarea
              placeholder="Tell me about your project or just say hello..."
              rows="5"
                value={message}
            onChange={(e) => setmessage(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/5
               text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-pink-800"
            ></textarea>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2 
              rounded-full hover:bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500
              text-sm font-medium border-2 border-pink-800 transition-all duration-300"
            >
              <FaPaperPlane size={18} /> Send Message
            </button>
          </form>
        </div>

        {/* Right: Info & Socials */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Contact Information */}
          <div className="rounded-2xl bg-[rgb(32,32,35)] p-6 shadow-lg shadow-black/60">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Contact Information</h3>
            <div className="flex items-center gap-3 text-sm mb-2">
              <FaEnvelope className="text-pink-800" />
              <span>sheikhaliimran5452@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm mb-2">
              <FaPhone className="text-pink-800" />
              <span>03294704692</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FaMapMarkerAlt className="text-pink-800" />
              <span>Multan, Punjab, Pakistan</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="rounded-2xl bg-[rgb(32,32,35)]  p-6 shadow-lg shadow-black/60">
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Follow Me</h3>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-pink-800 transition"><FaLinkedin /></a>
              <a href="#" className="hover:text-pink-800 transition"><FaFacebook /></a>
              <a href="#" className="hover:text-pink-800 transition"><FaFacebookMessenger /></a>
              <a href="#" className="hover:text-pink-800 transition"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
