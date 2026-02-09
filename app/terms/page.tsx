import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Terms and Conditions | Innovin Labs",
    description:
        "Read the terms and conditions governing the use of Innovin Labs' website and services.",
};

export default function TermsAndConditionsPage() {
    return (
        <>
            <main id="main-content" className="bg-white w-full pt-[100px] sm:pt-[120px] lg:pt-[146px] pb-[50px] sm:pb-[60px] lg:pb-[40px] overflow-hidden relative">
                <div className="max-w-[1681px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-[70px]">
                    <header className="text-center mb-10 sm:mb-12 lg:mb-[50px]">
                        <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] text-[#232323] font-semibold leading-[1.1] sm:leading-[1.2] lg:leading-[62.1px] mb-4 sm:mb-5 lg:mb-[20px]">
                            Terms and Conditions
                        </h1>
                        <p className="text-[16px] sm:text-[18px] md:text-[20px] text-[#005c89] leading-[1.6] max-w-[980px] mx-auto">
                            Please read these terms and conditions carefully before using our website and services.
                            By accessing or using our services, you agree to be bound by these terms.
                        </p>
                    </header>

                    <div className="mx-auto max-w-[1100px] text-left">
                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                By accessing and using the Innovin Labs website and services, you accept and agree to
                                be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to
                                these terms, please do not use our website or services.
                            </p>
                        </section>

                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                                2. Services
                            </h2>
                            <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                Innovin Labs provides technology consulting, software development, and related digital
                                services. The specific scope, terms, and deliverables for any project engagement will
                                be outlined in a separate written agreement between Innovin Labs and the client.
                            </p>
                        </section>

                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                                3. Intellectual Property Rights
                            </h2>
                            <div className="space-y-4">
                                <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                    All content on this website, including but not limited to text, graphics, logos,
                                    images, and software, is the property of Innovin Labs or its content suppliers and
                                    is protected by intellectual property laws.
                                </p>
                                <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                    You may not reproduce, distribute, modify, create derivative works of, publicly
                                    display, or exploit any content from this website without prior written consent from
                                    Innovin Labs.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                                4. User Responsibilities
                            </h2>
                            <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                When using our website or services, you agree to:
                            </p>
                            <ul className="mt-2 space-y-2 text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                <li className="ms-[22px] list-disc">Provide accurate and truthful information.</li>
                                <li className="ms-[22px] list-disc">
                                    Not use our services for any unlawful or prohibited purpose.
                                </li>
                                <li className="ms-[22px] list-disc">
                                    Not attempt to gain unauthorized access to any part of our website or systems.
                                </li>
                                <li className="ms-[22px] list-disc">
                                    Not interfere with or disrupt the integrity or performance of our website.
                                </li>
                            </ul>
                        </section>

                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                                5. Confidentiality
                            </h2>
                            <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                Both parties agree to maintain the confidentiality of any proprietary or sensitive
                                information shared during the course of any engagement. This obligation survives the
                                termination of any agreement between the parties.
                            </p>
                        </section>

                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                                6. Limitation of Liability
                            </h2>
                            <div className="space-y-4">
                                <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                    To the fullest extent permitted by law, Innovin Labs shall not be liable for any
                                    indirect, incidental, special, consequential, or punitive damages, including but
                                    not limited to loss of profits, data, or business opportunities.
                                </p>
                                <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                    Our total liability for any claim arising from or related to these terms or our
                                    services shall not exceed the amount paid by you to Innovin Labs in the twelve (12)
                                    months preceding the claim.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                                7. Disclaimer of Warranties
                            </h2>
                            <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                Our website and services are provided "as is" without warranties of any kind, either
                                express or implied. We do not guarantee that our website will be uninterrupted,
                                error-free, or free of viruses or other harmful components.
                            </p>
                        </section>

                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                                8. Third-Party Links
                            </h2>
                            <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                Our website may contain links to third-party websites or services. Innovin Labs is
                                not responsible for the content, accuracy, or practices of any third-party sites
                                and does not endorse them. You access third-party sites at your own risk.
                            </p>
                        </section>

                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                                9. Indemnification
                            </h2>
                            <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                You agree to indemnify and hold harmless Innovin Labs, its officers, directors,
                                employees, and agents from any claims, damages, losses, liabilities, and expenses
                                (including legal fees) arising from your use of our website or services, or your
                                violation of these terms.
                            </p>
                        </section>

                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                                10. Governing Law
                            </h2>
                            <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                These Terms and Conditions shall be governed by and construed in accordance with the
                                laws of India. Any disputes arising from these terms shall be subject to the
                                exclusive jurisdiction of the courts in India.
                            </p>
                        </section>

                        <section className="mb-8 sm:mb-10">
                            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                                11. Modifications to Terms
                            </h2>
                            <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                Innovin Labs reserves the right to modify these Terms and Conditions at any time.
                                Changes will be effective immediately upon posting on this page. Your continued use
                                of our website after any changes constitutes acceptance of the modified terms.
                            </p>
                        </section>

                        <section className="mb-2">
                            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] text-black font-semibold leading-[1.3] mb-3">
                                12. Contact Us
                            </h2>

                            <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light">
                                If you have any questions about these Terms and Conditions, please contact us at{" "}
                                <Link
                                    href="mailto:info@innovinlabs.com"
                                    className="text-[#005c89] font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
                                >
                                    info@innovinlabs.com
                                </Link>
                                .
                            </p>

                            <p className="text-[16px] sm:text-[18px] text-black leading-[1.9] font-light mt-4">
                                By using our website and services, you acknowledge that you have read, understood,
                                and agree to be bound by these Terms and Conditions.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
