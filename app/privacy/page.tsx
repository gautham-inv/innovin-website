import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Innovin Labs",
  description:
    "Learn how Innovin Labs collects, uses, discloses, and protects personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <main id="main-content" className="bg-white w-full pt-[100px] sm:pt-[120px] lg:pt-[146px] pb-[50px] sm:pb-[60px] lg:pb-[40px] overflow-hidden relative">
        <div className="max-w-[1681px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-[70px]">
          <header className="text-center mb-10 sm:mb-12 lg:mb-[50px]">
            <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] text-[#232323] font-semibold leading-[1.1] sm:leading-[1.2] lg:leading-[62.1px] mb-4 sm:mb-5 lg:mb-6">
              Privacy Policy
            </h1>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] text-[#005c89] leading-[1.6] max-w-[980px] mx-auto">
              This Privacy Policy explains how we collect, use, disclose, and protect your personal
              information. By using our website or services, you agree to the terms of this Privacy
              Policy.
            </p>
          </header>

          <div className="mx-auto max-w-[1100px] text-left">
            <section className="mb-8 sm:mb-10">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                Introduction
              </h2>
              <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                Innovin Labs is committed to protecting the privacy of individuals who visit our
                website and use our services. We do not collect personally identifying information
                about you when you visit our site unless you choose to provide such information to
                us. Providing such information is strictly voluntary. This policy is your guide to
                how we will handle information we learn about you from your visit to our website.
              </p>
            </section>

            <section className="mb-8 sm:mb-10">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                1. Information we collect
              </h2>

              <div className="space-y-5">
                <div>
                  <h3 className="text-[18px] sm:text-[20px] text-black font-semibold leading-[1.4] mb-2">
                    Personal Information
                  </h3>
                  <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                    We collect the following personal information if the user chooses to share:
                  </p>
                  <ul className="mt-2 space-y-2 text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                    <li className="ms-[22px] list-disc">
                      Contact information (e.g., name, email address, phone number).
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-[18px] sm:text-[20px] text-black font-semibold leading-[1.4] mb-2">
                    Non-Personal Information
                  </h3>
                  <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                    We may also collect non-personal information, such as:
                  </p>
                  <ul className="mt-2 space-y-2 text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                    <li className="ms-[22px] list-disc">Anonymous usage data.</li>
                    <li className="ms-[22px] list-disc">
                      Device information (e.g., IP address, browser type, operating system).
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8 sm:mb-10">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                2. How we use your information
              </h2>
              <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                We use your information for the following purposes:
              </p>
              <ul className="mt-2 space-y-2 text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                <li className="ms-[22px] list-disc">Providing and maintaining our products and services.</li>
                <li className="ms-[22px] list-disc">Personalizing your user experience.</li>
                <li className="ms-[22px] list-disc">Sending emails and communications by your request.</li>
                <li className="ms-[22px] list-disc">
                  Protecting our rights and property, such as by investigating fraud or unauthorized
                  use of our website or services.
                </li>
                <li className="ms-[22px] list-disc">Complying with applicable laws and regulations.</li>
              </ul>
            </section>

            <section className="mb-8 sm:mb-10">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                3. Data security
              </h2>
              <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                We implement security measures to protect your personal information from
                unauthorized access, disclosure, alteration, and destruction. However, no method of
                transmission over the internet or electronic storage is completely secure. We
                cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8 sm:mb-10">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                4. Sharing your information
              </h2>
              <div className="space-y-4">
                <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                  We do not sell, trade, or rent your personal information to third parties. We may
                  share your information with trusted service providers who assist us in operating
                  our website, conducting our business, or servicing you.
                </p>
                <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                  We may disclose your information to law enforcement and government agencies if
                  required by law or if we believe that disclosure is necessary to protect our
                  rights or property, or the rights or property of others.
                </p>
              </div>
            </section>

            <section className="mb-8 sm:mb-10">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                5. Your choices
              </h2>
              <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                You have the right to:
              </p>
              <ul className="mt-2 space-y-2 text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                <li className="ms-[22px] list-disc">
                  Access, correct, or delete your personal information by writing to us.
                </li>
                <li className="ms-[22px] list-disc">Disable cookies through your browser settings.</li>
              </ul>
            </section>

            <section className="mb-8 sm:mb-10">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                6. Links to other websites
              </h2>
              <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                Our website may contain links to other websites. We are not responsible for the
                privacy practices of other websites. We encourage you to read the privacy policies
                of other websites that you visit.
              </p>

            </section>

            <section className="mb-8 sm:mb-10">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                7. Changes to this Privacy Policy
              </h2>
              <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                We may update this Privacy Policy periodically. You will be able to access the
                updated policy on our website.
              </p>
            </section>

            <section className="mb-2">
              <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                8. Contact us
              </h2>

              <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                If you have questions about this Privacy Policy, please contact us at{" "}
                <Link
                  href="mailto:info@innovinlabs.com"
                  className="text-[#005c89] font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  info@innovinlabs.com
                </Link>
                .
              </p>

              <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                By using our website, products, and services, you consent to the terms outlined in this Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


