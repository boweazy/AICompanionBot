import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with public key (in production, use environment variable)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_stripe_public_key');

export const getStripe = () => {
  return stripePromise;
};

export const redirectToStripeCheckout = async (priceId: string) => {
  const stripe = await getStripe();
  
  if (!stripe) {
    throw new Error('Stripe failed to initialize');
  }

  const { error } = await stripe.redirectToCheckout({
    lineItems: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    successUrl: `${window.location.origin}/dashboard?success=true`,
    cancelUrl: `${window.location.origin}/marketplace?canceled=true`,
  });

  if (error) {
    throw error;
  }
};

// Premium plan configurations for e-commerce automation
export const PRICING_PLANS = {
  free: {
    name: 'Free Starter',
    price: '$0',
    priceId: null,
    features: [
      'Up to 3 basic bots',
      'Standard templates',
      'Basic analytics',
      'Community support'
    ],
    limits: {
      bots: 3,
      interactions: 1000,
      platforms: 2
    }
  },
  premium: {
    name: 'Premium Pro',
    price: '$49',
    priceId: 'price_premium_monthly',
    features: [
      'Unlimited advanced bots',
      'Premium e-commerce templates',
      'Real-time analytics & insights',
      'AI-powered automation',
      'Priority support',
      'Custom integrations'
    ],
    limits: {
      bots: -1, // unlimited
      interactions: -1, // unlimited
      platforms: -1 // unlimited
    }
  }
};

export const checkUserPlanLimits = (userPlan: 'free' | 'premium', currentUsage: any) => {
  const plan = PRICING_PLANS[userPlan];
  
  return {
    canCreateBot: plan.limits.bots === -1 || currentUsage.bots < plan.limits.bots,
    canAddInteractions: plan.limits.interactions === -1 || currentUsage.interactions < plan.limits.interactions,
    canAddPlatform: plan.limits.platforms === -1 || currentUsage.platforms < plan.limits.platforms,
    plan: plan
  };
};