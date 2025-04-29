"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";

const tiers = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for personal projects and exploring the platform.",
    features: [
      "Up to 10 cron jobs",
      "Hourly execution frequency",
      "Email notifications",
      "7-day execution history",
      "Public API access",
      "Community support",
    ],
    cta: "Sign up",
    ctaLink: "/auth/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: 15,
    period: "per month",
    description: "Ideal for developers and growing businesses.",
    features: [
      "Up to 50 cron jobs",
      "Minute execution frequency",
      "SMS and webhook notifications",
      "30-day execution history",
      "Detailed analytics",
      "Priority support",
      "Custom retry policies",
      "Scheduled reports",
    ],
    cta: "Start free trial",
    ctaLink: "/auth/signup?plan=pro",
    popular: true,
  },
  {
    name: "Business",
    price: 49,
    period: "per month",
    description: "For teams that need advanced features and higher limits.",
    features: [
      "Up to 200 cron jobs",
      "1-second execution frequency",
      "Custom notification channels",
      "90-day execution history",
      "Advanced analytics",
      "Priority support",
      "Custom retry policies",
      "Team access",
      "Audit logs",
      "SLA guarantee",
    ],
    cta: "Contact sales",
    ctaLink: "/contact",
    popular: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose the plan that's right for you and start automating with
            confidence.
          </p>

          <div className="flex items-center justify-center space-x-4">
            <span className={cn("text-sm font-semibold")}>Monthly</span>

            <Switch
              id="pricing-switch"
              className="cursor-pointer"
              checked={annual}
              onCheckedChange={() => setAnnual(!annual)}
            />

            <span
              className={cn(
                "text-sm font-semibold flex gap-2 items-center",
                annual && "font-semibold text-primary"
              )}
            >
              Annual <Badge>Save 20%</Badge>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col rounded-lg border bg-background p-8 shadow-sm transition-all",
                tier.popular && "border-primary shadow-md relative"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">
                    {annual
                      ? tier.price === 0
                        ? "$0"
                        : `$${Math.round(tier.price * 0.8 * 12)}`
                      : `$${tier.price}`}
                  </span>
                  {tier.period && (
                    <span className="ml-2 text-muted-foreground">
                      {annual ? "/year" : tier.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-muted-foreground">{tier.description}</p>
              </div>

              <ul className="mb-8 space-y-3 text-sm flex-1">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "w-full",
                  !tier.popular && "bg-muted hover:bg-muted/80"
                )}
                variant={tier.popular ? "default" : "outline"}
                asChild
              >
                <a href={tier.ctaLink}>{tier.cta}</a>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Need a custom plan?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We offer custom plans for larger teams and enterprises with specific
            requirements. Contact us to discuss your needs.
          </p>
          <Button asChild>
            <a href="/contact">Contact our sales team</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
