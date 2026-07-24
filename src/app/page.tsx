import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import HomepageBlogs from "@/components/blogs/HomepageBlogs";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { generateWebPageSchema } from "@/utils/jsonLd";
import { SITE_CONFIG } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Ananth A | Senior QA Automation Engineer | Playwright | Selenium | SDET",
  description:
    "Senior QA Automation Engineer specializing in Playwright, Selenium, API Testing, Performance Testing, and Software Quality. Explore projects, technical blogs, automation frameworks, and engineering experience.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ananth A | Senior QA Automation Engineer | Playwright | Selenium | SDET",
    description:
      "Senior QA Automation Engineer specializing in Playwright, Selenium, API Testing, Performance Testing, and Software Quality.",
    url: SITE_CONFIG.url,
    siteName: "Ananth A Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ananth A - Senior QA Automation Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ananth A | Senior QA Automation Engineer | Playwright | Selenium | SDET",
    description:
      "Senior QA Automation Engineer specializing in Playwright, Selenium, API Testing, Performance Testing, and Software Quality.",
    images: ["/og-image.png"],
  },
};

export default async function Home() {
  const homePageSchema = generateWebPageSchema(
    "Ananth A | Senior QA Automation Engineer | Playwright | Selenium | SDET",
    "Senior QA Automation Engineer specializing in Playwright, Selenium, API Testing, Performance Testing, and Software Quality.",
    "/"
  );

  return (
    <>
      <JsonLd schema={homePageSchema} />
      <main className="relative min-h-screen">
        <Navbar />

        <section id="home">
          <Hero />
        </section>

        <section id="about" className="py-20">
          <About />
        </section>

        <section id="skills" className="py-20 bg-slate-900/50">
          <Skills />
        </section>

        <section id="experience" className="py-20">
          <Experience />
        </section>

        <section id="projects" className="py-20 bg-slate-900/50">
          <Projects />
        </section>

        {/* Latest Blogs Section - Server Rendered */}
        <HomepageBlogs />

        <section id="certifications" className="py-20">
          <Certifications />
        </section>

        <section id="education" className="py-20 bg-slate-900/50">
          <Education />
        </section>

        <section id="contact" className="py-20">
          <Contact />
        </section>

        <Footer />
      </main>
    </>
  );
}
