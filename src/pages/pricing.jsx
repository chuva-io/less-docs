import React from 'react';
import Layout from '@theme/Layout';
import './pricing.css';

const pricingData = [
  {
    title: "Individual Plan",
    price: "Free",
    features: [
      "50 cloud functions",
      "1 user",
      "Usage limits are bound to the AWS fee tier",
      "24 hour log retention",
      "1 hour failed topic retention",
    ],
    additionalFeatures: [
      "Unlimited cloud environments",
      "Unlimited concurrent builds",
      "Local dev environment",
      "Custom static website domains",
      "Access to logs and metrics in managed AWS account",
      "Community support on Discord",
    ],
  },
  {
    title: "Team Plan",
    price: "$9 / user / month",
    features: [
      "1000 functions",
      "Up to 3 users",
      "Unlimited AWS usage (pre-paid AWS bill)",
      "7 day log retention",
      "48 hour failed topic retention",
      "Managed organization",
    ],
    additionalFeatures: [
      "Unlimited cloud environments",
      "Unlimited concurrent builds",
      "Local dev environment",
      "Custom static website domains",
      "Access to logs and metrics in managed AWS account",
      "Community support on Discord",
      "14 days onboarding support",
      "CI keys (coming soon)",
    ],
  },
  {
    title: "Pro Plan",
    price: "$29 / user / month",
    features: [
      "Unlimited functions",
      "Unlimited users",
      "Unlimited AWS usage (pre-paid AWS bill)",
      "30 day log retention",
      "14 day failed topic retention",
      "Managed organization",
    ],
    additionalFeatures: [
      "Unlimited cloud environments",
      "Unlimited concurrent builds",
      "Local dev environment",
      "Custom static website domains",
      "Access to logs and metrics in managed AWS account",
      "Community support on Discord",
      "14 days onboarding support",
      "CI keys (coming soon)",
      "Deploy to your own AWS account (coming soon)",
    ],
  },
];

export default function PricingPage() {
  return (
    <Layout>
      <div className="pricing-container">
        <h1 className="pricing-title">Pricing</h1>
        <div className="pricing-cards">
          {pricingData.map((tier, index) => (
            <div key={index} className="pricing-card">
              <h2>{tier.title}</h2>
              <p className="price">{tier.price}</p>
              <div className="features">
                <h3>Features</h3>
                <ul>
                  {tier.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <h3>Additional Features</h3>
                <ul>
                  {tier.additionalFeatures.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
