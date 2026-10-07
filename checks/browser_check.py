"""Exercise the static page against the running development server."""

from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE_URL = "http://127.0.0.1:3000/"
ARTIFACTS = Path("/tmp/veehoster-checks")


def check_page_assets(page):
    # Scroll through the page to exercise the real lazy-loading behavior.
    page.evaluate("document.documentElement.style.scrollBehavior = 'auto'")
    height = page.evaluate("document.documentElement.scrollHeight")
    for offset in range(0, height, 650):
        page.evaluate("offset => window.scrollTo(0, offset)", offset)
        page.wait_for_timeout(60)
    page.wait_for_function(
        "[...document.images].every(image => image.complete && image.naturalWidth > 0)"
    )
    page.evaluate("window.scrollTo(0, 0)")
    assert page.evaluate("document.fonts.check('14px Roboto')"), "Local font not loaded"
    assert page.evaluate(
        "document.documentElement.scrollWidth <= window.innerWidth"
    ), "Horizontal overflow"
    assert page.locator(".service-card").count() == 8
    assert page.locator(".plan-card").count() == 4
    assert page.locator(".project-card").count() == 5
    assert page.locator(".faq-item").count() == 6


def check_interactions(page):
    prices = page.locator(".plan-price strong")
    expect(prices).to_have_text(["₹249", "₹499", "₹999", "₹1,999"])
    page.get_by_role("button", name="Monthly", exact=True).click()
    expect(prices).to_have_text(["₹399", "₹799", "₹1,599", "₹2,999"])
    page.get_by_role("button", name="Yearly", exact=True).click()
    expect(prices).to_have_text(["₹249", "₹499", "₹999", "₹1,999"])

    page.locator("[data-plan='1']").click()
    expect(page.get_by_role("dialog")).to_be_visible()
    expect(page.locator("#dialog-title")).to_have_text("Business Hosting")
    expect(page.locator("#dialog-content")).to_contain_text("₹5,988 billed yearly")
    expect(page.locator(".cart-count")).to_have_text("1")
    page.keyboard.press("Escape")
    expect(page.get_by_role("dialog")).not_to_be_visible()
    expect(page.locator("[data-plan='1']")).to_be_focused()

    # The chosen plan retains its selected billing period when the table changes.
    page.get_by_role("button", name="Monthly", exact=True).click()
    page.get_by_role("button", name="View selected hosting plan").click()
    expect(page.locator("#dialog-content")).to_contain_text("₹5,988 billed yearly")
    page.get_by_role("button", name="Close dialog").click()
    page.get_by_role("button", name="Yearly", exact=True).click()

    for category, name in [("education", "BrightPath Academy"), ("ecommerce", "StyleCart"), ("business", "FitLife Gym"), ("healthcare", "CarePlus"), ("realestate", "Evermore")]:
        page.locator(f"[data-filter='{category}']").click()
        expect(page.locator(".project-card:visible")).to_have_count(1)
        expect(page.locator(".project-card:visible")).to_contain_text(name)
    page.locator("[data-filter='all']").click()
    expect(page.locator(".project-card:visible")).to_have_count(5)
    page.locator("[data-project='0']").click()
    expect(page.locator("#dialog-title")).to_have_text("BrightPath Academy")
    page.keyboard.press("Escape")

    page.locator(".faq-item summary").first.click()
    expect(page.locator(".faq-item[open]")).to_have_count(1)
    page.locator("#expand-faqs").click()
    expect(page.locator(".faq-item[open]")).to_have_count(6)
    page.locator("#expand-faqs").click()
    expect(page.locator(".faq-item[open]")).to_have_count(0)

    field = page.get_by_role("textbox", name="Domain name", exact=True)
    field.fill("bad domain")
    page.locator("#domain-submit").click()
    assert not field.evaluate("input => input.validity.valid")
    expect(page.get_by_role("dialog")).not_to_be_visible()
    field.fill("mybrand")
    page.locator("#domain-submit").click()
    expect(page.locator("#dialog-content")).to_contain_text("mybrand.com")
    expect(page.locator("#dialog-content")).to_contain_text("does not perform a live availability search")
    page.keyboard.press("Escape")

    page.get_by_role("tab", name="Transfer Domain").click()
    expect(page.locator("#domain-title")).to_have_text("Bring your domain to Veehoster")
    page.locator("#domain-submit").click()
    expect(page.locator("#dialog-content")).to_contain_text("authorization code")
    page.keyboard.press("Escape")
    page.get_by_role("tab", name="Transfer Domain").focus()
    page.keyboard.press("ArrowLeft")
    expect(page.get_by_role("tab", name="Find Domain")).to_have_attribute("aria-selected", "true")
    page.locator("[data-extension='.in']").click()
    expect(field).to_have_value("mybrand.in")
    field.fill("")

    page.locator("#newsletter-form input").fill("reader@example.com")
    page.get_by_role("button", name="Subscribe", exact=True).click()
    expect(page.locator(".newsletter-status")).to_contain_text("Your email has not been submitted")
    page.locator("#newsletter-form input").fill("")
    page.locator(".newsletter-status").evaluate("node => node.textContent = ''")

    page.locator(".service-card [data-service]").first.click()
    expect(page.locator("#dialog-title")).to_have_text("Website Design & Development")
    page.keyboard.press("Escape")
    page.evaluate("window.scrollTo(0, 0)")


def main():
    ARTIFACTS.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            executable_path="/usr/bin/chromium",
            headless=True,
            args=["--no-sandbox"],
        )
        for width, height in [(1440, 1000), (1024, 900), (747, 1000), (701, 900), (390, 844), (320, 740)]:
            page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
            errors = []
            external_requests = []
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.on("response", lambda response: errors.append(f"HTTP {response.status}: {response.url}") if response.status >= 400 else None)
            page.on("request", lambda request: external_requests.append(request.url) if not request.url.startswith(BASE_URL) else None)
            response = page.goto(BASE_URL, wait_until="networkidle")
            assert response and response.status == 200
            check_page_assets(page)
            if width in (1440, 390):
                check_interactions(page)
            if width <= 700:
                menu = page.get_by_role("button", name="Toggle navigation")
                menu.click()
                expect(page.locator("#main-nav")).to_be_visible()
                page.get_by_role("button", name="Website Services", exact=True).click()
                page.get_by_role("link", name="Our recent work", exact=True).click()
                expect(page.locator("#main-nav")).not_to_be_visible()
                expect(menu).to_have_attribute("aria-expanded", "false")
                page.evaluate("window.scrollTo(0, 0)")
            else:
                page.get_by_role("button", name="Website Services", exact=True).click()
                expect(page.get_by_role("link", name="Our recent work", exact=True)).to_be_visible()
                page.keyboard.press("Escape")
            assert not errors, errors
            assert not external_requests, external_requests
            # Reload for a clean screenshot, then load all lazy images.
            page.reload(wait_until="networkidle")
            check_page_assets(page)
            page.screenshot(path=str(ARTIFACTS / f"page-{width}.png"), full_page=True)
            print(f"PASS {width}px: layout, local assets, navigation" + (", full interaction checks" if width in (1440, 390) else ""), flush=True)
            page.close()
        browser.close()
    print(f"All checks passed. Screenshots: {ARTIFACTS}")


if __name__ == "__main__":
    main()
