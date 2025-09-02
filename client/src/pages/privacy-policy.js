import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users, Mail, FileText } from "lucide-react";
export default function PrivacyPolicy() {
    const lastUpdated = "December 2024";
    const dataTypes = [
        {
            icon: Users,
            title: "Personal Information",
            description: "Name, email address, and any information you voluntarily provide when using our community features.",
            examples: ["Name", "Email address", "Community posts", "Comments"]
        },
        {
            icon: Eye,
            title: "Usage Information",
            description: "Information about how you interact with our website and services.",
            examples: ["Pages visited", "Time spent on site", "Search queries", "Herb preferences"]
        },
        {
            icon: FileText,
            title: "Content Information",
            description: "Information you share through our community features and wellness tracking.",
            examples: ["Wellness posts", "Herb reviews", "Health goals", "Progress updates"]
        }
    ];
    const dataUsage = [
        {
            purpose: "Service Provision",
            description: "To provide and maintain our herbal wellness platform and community features."
        },
        {
            purpose: "Personalization",
            description: "To customize your experience and provide relevant herbal recommendations."
        },
        {
            purpose: "Communication",
            description: "To respond to your inquiries and send important updates about our services."
        },
        {
            purpose: "Community Features",
            description: "To enable community interactions, wellness sharing, and peer support."
        },
        {
            purpose: "Analytics",
            description: "To understand how our services are used and improve user experience."
        }
    ];
    const dataProtection = [
        {
            icon: Lock,
            title: "Encryption",
            description: "All data is encrypted in transit and at rest using industry-standard protocols."
        },
        {
            icon: Shield,
            title: "Access Controls",
            description: "Strict access controls ensure only authorized personnel can access your data."
        },
        {
            icon: Eye,
            title: "Monitoring",
            description: "Continuous monitoring and security audits to protect against unauthorized access."
        }
    ];
    const userRights = [
        {
            right: "Access",
            description: "Request a copy of the personal data we hold about you."
        },
        {
            right: "Correction",
            description: "Request correction of inaccurate or incomplete personal data."
        },
        {
            right: "Deletion",
            description: "Request deletion of your personal data under certain circumstances."
        },
        {
            right: "Portability",
            description: "Request transfer of your data to another service provider."
        },
        {
            right: "Objection",
            description: "Object to processing of your personal data for certain purposes."
        },
        {
            right: "Restriction",
            description: "Request restriction of processing under certain circumstances."
        }
    ];
    return (_jsx("div", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx("div", { className: "w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center", children: _jsx(Shield, { className: "h-10 w-10 text-blue-600" }) }) }), _jsx("h1", { className: "text-4xl font-bold mb-6 text-blue-600", "data-testid": "text-page-title", children: "Privacy Policy" }), _jsx("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", children: "Your privacy is important to us. This policy explains how we collect, use, and protect your information." }), _jsxs("p", { className: "text-sm text-muted-foreground mt-4", children: ["Last updated: ", lastUpdated] })] }), _jsxs(Card, { className: "mb-16", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(FileText, { className: "h-6 w-6" }), "Introduction"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Herbal Care Hub (\"we,\" \"our,\" or \"us\") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services." }), _jsx("p", { children: "By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services." })] }) })] }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "Information We Collect" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: dataTypes.map((type, index) => {
                                const IconComponent = type.icon;
                                return (_jsx(Card, { className: "text-center", children: _jsxs(CardContent, { className: "pt-6", children: [_jsx(IconComponent, { className: "h-12 w-12 mx-auto mb-4 text-blue-600" }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: type.title }), _jsx("p", { className: "text-muted-foreground mb-4", children: type.description }), _jsxs("div", { className: "text-sm", children: [_jsx("p", { className: "font-medium mb-2", children: "Examples:" }), _jsx("ul", { className: "space-y-1", children: type.examples.map((example, idx) => (_jsxs("li", { className: "text-muted-foreground", children: ["\u2022 ", example] }, idx))) })] })] }) }, index));
                            }) })] }), _jsxs(Card, { className: "mb-16", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Eye, { className: "h-6 w-6" }), "How We Use Your Information"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-6", children: dataUsage.map((usage, index) => (_jsxs("div", { className: "flex items-start gap-4 p-4 bg-muted rounded-lg", children: [_jsx("div", { className: "w-2 h-2 bg-blue-600 rounded-full mt-2" }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-2", children: usage.purpose }), _jsx("p", { className: "text-muted-foreground text-sm", children: usage.description })] })] }, index))) }) })] }), _jsxs("div", { className: "mb-16", children: [_jsx("h2", { className: "text-3xl font-bold mb-8 text-center", children: "How We Protect Your Data" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: dataProtection.map((protection, index) => {
                                const IconComponent = protection.icon;
                                return (_jsx(Card, { className: "text-center", children: _jsxs(CardContent, { className: "pt-6", children: [_jsx(IconComponent, { className: "h-12 w-12 mx-auto mb-4 text-green-600" }), _jsx("h3", { className: "text-xl font-semibold mb-2", children: protection.title }), _jsx("p", { className: "text-muted-foreground", children: protection.description })] }) }, index));
                            }) })] }), _jsxs(Card, { className: "mb-16", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-6 w-6" }), "Your Privacy Rights"] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-muted-foreground mb-6", children: "You have certain rights regarding your personal information. To exercise these rights, please contact us." }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: userRights.map((right, index) => (_jsxs("div", { className: "flex items-start gap-3 p-3 bg-muted rounded-lg", children: [_jsx("div", { className: "w-2 h-2 bg-green-600 rounded-full mt-2" }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-sm", children: right.right }), _jsx("p", { className: "text-muted-foreground text-xs", children: right.description })] })] }, index))) })] })] }), _jsxs(Card, { className: "mb-16", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Eye, { className: "h-6 w-6" }), "Cookies and Tracking"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us:" }), _jsxs("ul", { className: "space-y-2 ml-4", children: [_jsx("li", { children: "\u2022 Remember your preferences and settings" }), _jsx("li", { children: "\u2022 Understand how you use our website" }), _jsx("li", { children: "\u2022 Improve our services and user experience" }), _jsx("li", { children: "\u2022 Provide personalized content and recommendations" })] }), _jsx("p", { children: "You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website." })] }) })] }), _jsxs(Card, { className: "mb-16", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "h-6 w-6" }), "Third-Party Services"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4 text-muted-foreground", children: [_jsx("p", { children: "We may use third-party services to help us provide and improve our services. These services may collect information about you in accordance with their own privacy policies. We carefully select our partners and ensure they meet our privacy standards." }), _jsx("p", { children: "Common third-party services we use include:" }), _jsxs("ul", { className: "space-y-2 ml-4", children: [_jsx("li", { children: "\u2022 Analytics services to understand website usage" }), _jsx("li", { children: "\u2022 Content delivery networks for faster loading" }), _jsx("li", { children: "\u2022 Email services for communications" }), _jsx("li", { children: "\u2022 Security services to protect against threats" })] })] }) })] }), _jsxs(Card, { className: "bg-blue-50 border-blue-200", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-blue-800", children: [_jsx(Mail, { className: "h-6 w-6" }), "Contact Us"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4 text-blue-800", children: [_jsx("p", { children: "If you have any questions about this Privacy Policy or our data practices, please contact us:" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " privacy@herbalcarehub.com"] }), _jsxs("p", { children: [_jsx("strong", { children: "Address:" }), " Herbal Care Hub Privacy Team"] }), _jsxs("p", { children: [_jsx("strong", { children: "Response Time:" }), " We will respond to your inquiry within 30 days"] })] }), _jsx("p", { className: "mt-4", children: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date." })] }) })] })] }) }));
}
