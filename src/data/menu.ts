import type { MenuSection } from "@/types";

/**
 * The full Tarte menu, grouped by category. Section titles double as the
 * category names in the Menu page filter bar. Copy and prices are lifted
 * verbatim from the design handoff.
 *
 * To edit the menu, change the entries below — the public Menu page and the
 * category filter both read from this single source.
 */
export const menu: MenuSection[] = [
  {
    title: "Espresso",
    items: [
      {
        name: "Espresso",
        desc: "A pure, concentrated shot — bold and bright.",
        price: "3.00",
        img: "/assets/menu/espresso.jpg",
      },
      {
        name: "Cortado",
        desc: "Equal parts espresso and warm steamed milk.",
        price: "4.00",
        img: "/assets/menu/cortado.jpg",
      },
      {
        name: "Flat White",
        desc: "Velvety microfoam over a double ristretto.",
        price: "4.50",
        img: "/assets/menu/latte.jpg",
      },
      {
        name: "Cappuccino",
        desc: "Espresso, steamed milk, a crown of foam.",
        price: "4.50",
        img: "/assets/menu/cappuccino.jpg",
      },
    ],
  },
  {
    title: "Coffee",
    items: [
      {
        name: "House Filter",
        desc: "Single-origin pour-over, rotating weekly.",
        price: "3.75",
        img: "/assets/menu/filter.jpg",
      },
      {
        name: "Café Latte",
        desc: "Silky steamed milk, a soft espresso heart.",
        price: "4.75",
        img: "/assets/menu/lattewhite.jpg",
      },
      {
        name: "Mocha",
        desc: "Espresso, dark chocolate, steamed milk.",
        price: "5.25",
        img: "/assets/menu/mocha.jpg",
      },
      {
        name: "Macchiato",
        desc: "Espresso “stained” with a dollop of foam.",
        price: "3.50",
        img: "/assets/menu/macchiato.jpg",
      },
    ],
  },
  {
    title: "Cold",
    items: [
      {
        name: "Cold Brew",
        desc: "Steeped 18 hours, smooth and low-acid.",
        price: "4.50",
        img: "/assets/menu/coldbrew.jpg",
      },
      {
        name: "Iced Latte",
        desc: "Espresso poured over milk and ice.",
        price: "4.75",
        img: "/assets/menu/coffee.jpg",
      },
      {
        name: "Affogato",
        desc: "Vanilla gelato drowned in hot espresso.",
        price: "5.50",
        img: "/assets/menu/whitemug.jpg",
      },
      {
        name: "Tonic Espresso",
        desc: "Sparkling tonic, citrus, a bright shot.",
        price: "5.00",
        img: "/assets/menu/espresso.jpg",
      },
    ],
  },
  {
    title: "Bakery",
    items: [
      {
        name: "Butter Croissant",
        desc: "Laminated by hand, baked golden each dawn.",
        price: "3.75",
        img: "/assets/menu/croissant2.jpg",
      },
      {
        name: "Pain au Chocolat",
        desc: "Flaky pastry folded around dark chocolate.",
        price: "4.25",
        img: "/assets/menu/croissantstable.jpg",
      },
      {
        name: "Almond Tart",
        desc: "Our namesake — frangipane in pâte sucrée.",
        price: "5.50",
        img: "/assets/menu/breadplate.jpg",
      },
      {
        name: "Seasonal Galette",
        desc: "Rustic fruit galette, whatever is ripe.",
        price: "5.75",
        img: "/assets/menu/croissanttray.jpg",
      },
    ],
  },
];

/** Filter categories: "All" plus each section title, in menu order. */
export const menuCategories: string[] = ["All", ...menu.map((s) => s.title)];
