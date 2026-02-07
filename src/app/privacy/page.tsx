import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PrivacyPage() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header />
            <main className="max-w-screen-lg mx-auto p-10 bg-white shadow-sm mt-5 mb-10 flex-grow">
                <h1 className="text-3xl font-bold mb-6">Privacy Notice</h1>

                <div className="space-y-4 text-sm text-gray-700">
                    <p><strong>Last updated: February 7, 2026</strong></p>

                    <p>
                        We know that you care how information about you is used and shared, and we appreciate your trust that we will do so carefully and sensibly. This Privacy Notice describes how Amazon Clone collects and processes your personal information through Amazon Clone websites, devices, products, services, online and physical stores, and applications that reference this Privacy Notice.
                        <strong> By using Amazon Clone Services, you are consenting to the practices described in this Privacy Notice.</strong>
                    </p>

                    <h2 className="text-xl font-bold mt-6 mb-2">What Personal Information About Customers Does Amazon Clone Collect?</h2>
                    <p>We collect your personal information in order to provide and continually improve our products and services.</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Information You Give Us:</strong> We receive and store any information you provide in relation to Amazon Clone Services.</li>
                        <li><strong>Automatic Information:</strong> We automatically collect and store certain types of information about your use of Amazon Clone Services, including information about your interaction with content and services available through Amazon Clone Services.</li>
                        <li><strong>Information from Other Sources:</strong> We might receive information about you from other sources, such as updated delivery and address information from our carriers, which we use to correct our records and deliver your next purchase more easily.</li>
                    </ul>

                    <h2 className="text-xl font-bold mt-6 mb-2">For What Purposes Does Amazon Clone Use Your Personal Information?</h2>
                    <p>We use your personal information to operate, provide, develop, and improve the products and services that we offer our customers. These purposes include:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Purchase and delivery of products and services.</li>
                        <li>Provide, troubleshoot, and improve Amazon Clone Services.</li>
                        <li>Recommendations and personalization.</li>
                        <li>Provide voice, image and camera services.</li>
                        <li>Comply with legal obligations.</li>
                        <li>Communicate with you.</li>
                        <li>Advertising.</li>
                        <li>Fraud Prevention and Credit Risks.</li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
}
