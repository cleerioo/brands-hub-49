import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function TermsPage() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header />
            <main className="max-w-screen-lg mx-auto p-10 bg-white shadow-sm mt-5 mb-10 flex-grow">
                <h1 className="text-3xl font-bold mb-6">Conditions of Use</h1>

                <div className="space-y-4 text-sm text-gray-700">
                    <p><strong>Last updated: February 7, 2026</strong></p>

                    <p>
                        Welcome to Amazon Clone. Amazon Clone Services LLC and/or its affiliates ("Amazon Clone") provide website features and other products and services to you when you visit or shop at AmazonClone.com, use Amazon Clone products or services, use Amazon Clone applications for mobile, or use software provided by Amazon Clone in connection with any of the foregoing (collectively, "Amazon Clone Services"). Amazon Clone provides the Amazon Clone Services subject to the following conditions.
                    </p>

                    <p className="font-bold">By using Amazon Clone Services, you agree to these conditions. Please read them carefully.</p>

                    <p>
                        We offer a wide range of Amazon Clone Services, and sometimes additional terms may apply. When you use an Amazon Clone Service (for example, Your Profile, Gift Cards, Amazon Clone Video, Your Media Library, Amazon Clone devices, or Amazon Clone applications) you also will be subject to the guidelines, terms and agreements applicable to that Amazon Clone Service ("Service Terms"). If these Conditions of Use are inconsistent with the Service Terms, those Service Terms will control.
                    </p>

                    <h2 className="text-xl font-bold mt-6 mb-2">PRIVACY</h2>
                    <p>Please review our Privacy Notice, which also governs your use of Amazon Clone Services, to understand our practices.</p>

                    <h2 className="text-xl font-bold mt-6 mb-2">ELECTRONIC COMMUNICATIONS</h2>
                    <p>
                        When you use Amazon Clone Services, or send e-mails, text messages, and other communications from your desktop or mobile device to us, you may be communicating with us electronically. You consent to receive communications from us electronically, such as e-mails, texts, mobile push notices, or notices and messages on this site or through the other Amazon Clone Services, such as our Message Center, and you can retain copies of these communications for your records.
                    </p>

                    <h2 className="text-xl font-bold mt-6 mb-2">COPYRIGHT</h2>
                    <p>
                        All content included in or made available through any Amazon Clone Service, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software is the property of Amazon Clone or its content suppliers and protected by United States and international copyright laws.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
