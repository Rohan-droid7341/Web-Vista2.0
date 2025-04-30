import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-2">Contact Us</h2>
        <p className="text-center text-gray-400 mb-8">We're here to assist you with any questions or feedback</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Name"
              className="bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400"
            />
            <Input
              type="email"
              placeholder="Email"
              className="bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400"
            />
            <Textarea
              placeholder="Message"
              rows={4}
              className="bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400"
            />
            <Button className="w-full">Submit</Button>
          </div>

          {/* Map */}
          <div className="h-64 bg-gray-700 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100737.2029680308!2d80.97065864909837!3d26.86648696205908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399b8f4c1b0838b7%3A0xe91576e11e60d45a!2sIndian%20Institute%20of%20Information%20Technology%20Lucknow!5e0!3m2!1sen!2sin!4v1696523518744!5m2!1sen!2sin"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              title="IIIT Lucknow Map"
            ></iframe>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p>Indian Institute of Information Technology Lucknow, Ahmamau, Lucknow, India.</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary shrink-0" />
              <p>Mon-Fri 10am-5pm, Sat 1pm-5pm</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <p>Phone: 75886317728</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <p>Email: quizrizz10@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About QuizRizz</h3>
              <p className="text-gray-400">
                QuizRizz is an interactive quiz platform designed to make learning fun and engaging. We offer quizzes
                across various subjects to help students enhance their knowledge and skills.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/subjects" className="text-gray-400 hover:text-white transition-colors">
                    Subjects
                  </Link>
                </li>
                <li>
                  <Link href="/study-materials" className="text-gray-400 hover:text-white transition-colors">
                    Study Materials
                  </Link>
                </li>
                <li>
                  <Link href="/premium" className="text-gray-400 hover:text-white transition-colors">
                    Premium Plans
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} QuizRizz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
