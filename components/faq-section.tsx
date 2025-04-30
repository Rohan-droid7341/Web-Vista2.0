"use client"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Quiz Rizz?",
    answer:
      "Quiz Rizz is an interactive online platform where users can solve quizzes on a wide range of topics, from general knowledge and current events to specialized subjects. It offers an engaging way to test your knowledge, improve your skills, and have fun while learning. Perfect for both casual learners and quiz enthusiasts, Quiz Rizz makes learning entertaining with its user-friendly interface and diverse quiz categories.",
  },
  {
    question: "How can I start a quiz?",
    answer:
      "Simply navigate to the subject whose quiz you want to create, choose the difficulty, and you are good to go with your quiz. You can also customize your quiz experience by selecting specific topics within each subject.",
  },
  {
    question: "What features are included in the Premium Plan?",
    answer:
      "The Premium Plan offers AI support, access to leaderboards, mentor support, and exclusive 3D video content to enhance your learning journey. Premium members also get priority access to new features and content.",
  },
  {
    question: "Is there a free version available?",
    answer:
      "Yes, we offer a basic free version that allows limited quiz creations and access to our study materials. Upgrade to Premium for more features and an enhanced learning experience.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach out to our support team through the 'Contact Us' link in the navbar or by emailing quizrizz10@gmail.com. Our support team is available Monday through Friday, 9 AM to 6 PM IST.",
  },
  {
    question: "Can I create my own quizzes?",
    answer:
      "Yes, with a Pro or Advance subscription, you can create custom quizzes for personal use or to share with friends and classmates. Our quiz creation tool makes it easy to design engaging questions across multiple formats.",
  },
  {
    question: "Are the quizzes suitable for all age groups?",
    answer:
      "Yes, we have quizzes designed for various age groups and education levels. From elementary school concepts to advanced university topics, there's something for everyone at Quiz Rizz.",
  },
]

export default function FaqSection() {
  return (
    <section className="py-16 bg-black-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about QuizRizz and how it works
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
