# Editing site content

All editable text lives in this `content/` folder as plain **JSON** files, and
all photos live in **`public/assets/`**. Edit a file, commit, and Netlify
rebuilds the live site automatically (about 1–3 minutes).

> Tip: you can edit these files right in GitHub — open the file, click the
> pencil ✏️, make your change, and click **Commit changes**.

## Files

| File | What it controls |
|---|---|
| `menu.json` | The full menu — sections, items, and prices |
| `site.json` | Brand name, **phone / email / address**, opening **hours**, and Home/About copy |
| `gallery.json` | The photo gallery (captions, order, which tiles are wide) |

## `menu.json`

A list of sections. Each section has a `title`, a `group` (`"Food"` or
`"Drinks"` — this drives the Food/Drinks filter buttons), an optional `note`,
and a list of `items`.

```json
{
  "title": "Bagels",
  "group": "Food",
  "note": "With French fries on the side",
  "items": [
    { "name": "Cream Cheese", "price": "4.00" },
    { "name": "Lox", "price": "7.00" }
  ]
}
```

- **Price** is a number in quotes, written with cents: `"4.00"`, `"4.50"`,
  `"0.75"`. The site adds the `$` for you. Leave `price` out entirely for items
  with no set price (e.g. flavors).
- **`note`** is optional — a small line under the section heading.
- To add an item, copy a `{ ... }` line, change the text, and add a comma
  between items. To remove one, delete its line.
- To add a whole new section, copy an existing `{ "title": ... }` block.

> Keep the quotes and commas exactly as shown — JSON is picky. If a commit
> breaks the build, Netlify will email you; just undo the last change.

## Links from Home to the menu

Home's feature cards (`features`) and photo cards (`specialties`) in
`site.json` link straight to a menu section with `"href": "/menu#<section>"`.
The `<section>` part is the section's `title` in lowercase with spaces and
`&` turned into dashes — e.g. `"Sandwiches & Wraps"` → `/menu#sandwiches-wraps`.
If you rename a menu section, update those links too (the tests will flag a
broken one).

## Online ordering button

The dark button in the top menu (and the "Order ahead" box on the Menu page)
says **Call to Order** and dials the shop. If Tarte starts taking orders online
(Toast, Square, DoorDash, …), paste that link into `"orderOnlineUrl"` in
`site.json` — the button then reads **Order Online** and opens that page.

## Photos

Put image files in `public/assets/` (or `public/assets/menu/`) and reference
them by path, e.g. `"/assets/menu/croissant.jpg"`. Gallery tiles in
`gallery.json` use this. Add each photo to the matching gallery category
(`"Coffee"`, `"Pastries"`, `"Breakfast"`, `"Sandwiches"`, or
`"Specialty Cakes"`) so menu sections can link visitors to the corresponding
filtered gallery view.

The menu itself is **text-only** (no photos) — items in `menu.json` just have a
`name`, optional `price`, optional `priceSuffix`, and optional `desc`.
