import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "For beginners getting started.",
    features: [
      "5 blog posts/month",
      "Basic Markdown editor",
      "Basic SEO analyzer",
      "Basic analytics"
    ]
  },
  {
    name: "Pro",
    price: "₹499",
    description: "For serious bloggers and creators.",
    features: [
      "Unlimited blog posts",
      "AI writing assistant",
      "Advanced SEO tools",
      "Advanced analytics",
      "Priority support"
    ]
  },
  {
    name: "Premium",
    price: "₹999",
    description: "For professional content teams.",
    features: [
      "Everything in Pro",
      "Advanced AI tools",
      "Team collaboration",
      "Premium analytics",
      "Priority AI processing"
    ]
  }
];

function Subscription() {
  const [currentPlan, setCurrentPlan] = useState(
    localStorage.getItem("subscriptionPlan") || "Free"
  );

  const choosePlan = (name) => {
    localStorage.setItem("subscriptionPlan", name);
    setCurrentPlan(name);
  };

  return (
    <div className="page-shell">
      <div className="page-container">

        <div className="page-header">
          <h1>💳 Subscription</h1>
          <p>Choose the plan that fits your blogging needs.</p>
        </div>

        <div className="current-plan">
          Current Plan: <strong>{currentPlan}</strong>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <div
              className={`plan-card ${
                currentPlan === plan.name ? "selected-plan" : ""
              }`}
              key={plan.name}
            >
              {currentPlan === plan.name && (
                <div className="plan-badge">Current Plan</div>
              )}

              <h2>{plan.name}</h2>

              <div className="plan-price">
                {plan.price}
                {plan.name !== "Free" && (
                  <small>/month</small>
                )}
              </div>

              <p>{plan.description}</p>

              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>

              <button
                className="plan-button"
                onClick={() => choosePlan(plan.name)}
                disabled={currentPlan === plan.name}
              >
                {currentPlan === plan.name
                  ? "Current Plan"
                  : `Choose ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        <div className="payment-note">
          💡 Payment gateway can be connected later. Your selected plan is
          currently stored locally for project demonstration.
        </div>

      </div>
    </div>
  );
}

export default Subscription;
