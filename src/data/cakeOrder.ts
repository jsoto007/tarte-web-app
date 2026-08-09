export const CAKE_PRICE_PER_PERSON_CENTS = 900;

export const cakeFlavors = [
  "Vanilla",
  "Chocolate",
  "Coconut",
  "Red Velvet",
  "Carrot Cake",
] as const;

export type CakeFlavor = (typeof cakeFlavors)[number];

export const cakeOrderCopy = {
  eyebrow: "Made to order",
  title: "Order a Specialty Cake",
  intro:
    "Tell us what you’re celebrating and share any inspiration. Cake requests are $9 per person and are confirmed by the restaurant after review.",
  submit: "Send Cake Request",
  successTitle: "Your cake request is in",
  successBody:
    "We emailed you a copy of the request. The restaurant will follow up to confirm availability and finalize your order.",
};
