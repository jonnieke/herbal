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

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6 text-blue-600" data-testid="text-page-title">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Herbal Care Hub ("we," "our," or "us") is committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                use our website and services.
              </p>
              <p>
                By using our services, you agree to the collection and use of information in accordance with this policy. 
                If you do not agree with our policies and practices, please do not use our services.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Information We Collect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dataTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <IconComponent className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    <div className="text-sm">
                      <p className="font-medium mb-2">Examples:</p>
                      <ul className="space-y-1">
                        {type.examples.map((example, idx) => (
                          <li key={idx} className="text-muted-foreground">• {example}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* How We Use Information */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-6 w-6" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dataUsage.map((usage, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-2">{usage.purpose}</h4>
                    <p className="text-muted-foreground text-sm">{usage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How We Protect Your Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dataProtection.map((protection, index) => {
              const IconComponent = protection.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <IconComponent className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <h3 className="text-xl font-semibold mb-2">{protection.title}</h3>
                    <p className="text-muted-foreground">{protection.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Your Rights */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              Your Privacy Rights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              You have certain rights regarding your personal information. To exercise these rights, please contact us.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userRights.map((right, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-sm">{right.right}</h4>
                    <p className="text-muted-foreground text-xs">{right.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cookies and Tracking */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-6 w-6" />
              Cookies and Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                Cookies are small data files stored on your device that help us:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Remember your preferences and settings</li>
                <li>• Understand how you use our website</li>
                <li>• Improve our services and user experience</li>
                <li>• Provide personalized content and recommendations</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences. However, disabling cookies 
                may affect the functionality of our website.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Services */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Third-Party Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may use third-party services to help us provide and improve our services. These services may collect 
                information about you in accordance with their own privacy policies. We carefully select our partners 
                and ensure they meet our privacy standards.
              </p>
              <p>
                Common third-party services we use include:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Analytics services to understand website usage</li>
                <li>• Content delivery networks for faster loading</li>
                <li>• Email services for communications</li>
                <li>• Security services to protect against threats</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Mail className="h-6 w-6" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-blue-800">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> privacy@herbalcarehub.com</p>
                <p><strong>Address:</strong> Herbal Care Hub Privacy Team</p>
                <p><strong>Response Time:</strong> We will respond to your inquiry within 30 days</p>
              </div>
              <p className="mt-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
