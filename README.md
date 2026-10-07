# Veehoster static website

A responsive HTML, CSS and JavaScript recreation of the supplied Veehoster landing-page reference. Includes all eleven page sections, local imagery and font files, custom hosting illustrations, pricing controls, project filters, domain-form validation, accessible dialogs and expandable FAQs.

## Run locally

No package installation or build step is required. Extract the ZIP, open a terminal in the folder containing `index.html`, and run this command with Python 3 installed:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

The cloud checkout is located at `/workspace/portfolio`. Serve the repository root with any static web server for deployment. All assets are local; no API keys, credentials, databases or external font requests are needed.

## Check

```sh
node --check script.js
curl --fail http://127.0.0.1:3000/
python3 checks/browser_check.py
```

The browser check uses Python Playwright and the system Chromium executable. It checks desktop and mobile layouts, local assets, browser errors, billing changes, plan selection, project filters, FAQ controls, domain validation, navigation and dialogs. Screenshots are written to `/tmp/veehoster-checks/`.

## Static preview boundaries

The page implements the reference design, including its marketing copy. Domain registration, checkout, customer authentication, contact delivery and newsletter subscriptions are not connected to a backend. Relevant controls clearly explain this, do not claim successful transactions and do not transmit entered personal information. Portfolio entries are design concepts rather than verified live client projects. Contact information, social URLs and legal policies were not supplied and are not invented.

The source screenshot does not include its original image files. The hosting, migration and dashboard illustrations are recreated with SVG and CSS; project photos are locally stored substitutes. This is a close visual recreation rather than an exact pixel-for-pixel copy of those original illustrations.

## Asset sources

- `assets/servers.svg` and `assets/favicon.svg`: custom SVG illustrations for this implementation.
- `assets/property-*.jpg`: [CodeWithSadee Realvine](https://github.com/codewithsadee/realvine).
- `assets/gym.jpg`: [CodeWithSadee Fitlife](https://github.com/codewithsadee/fitlife).
- `assets/shop.jpg`: [CodeWithSadee Anon](https://github.com/codewithsadee/anon-ecommerce-website).
- The three CodeWithSadee repositories describe their projects as “free to use” without a formal license; their source notices are retained in `assets/licenses/SOURCE-NOTICES.md`.
- `assets/roboto-latin.woff2`: Roboto variable font distributed by [Fontsource](https://fontsource.org/fonts/roboto), SIL Open Font License. See `assets/licenses/` for retained license notices.
