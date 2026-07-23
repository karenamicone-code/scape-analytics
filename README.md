# Design Principles

1. Single source of truth.
2. Analytics providers are implementation details.
3. Every event must be consistent.
4. Business language over technical language.
5. Zero duplicated logic.
6. Easy to maintain.
7. Easy to extend.

# Scape Analytics SDK

> **Version:** 1.0.0  
> **Project:** Scape Wellness  
> **Status:** In Development

---

# Overview

Scape Analytics SDK is the centralized analytics layer for the Scape Wellness platform.

Its purpose is to standardize event tracking across all applications, landing pages, Webflow projects, forms and future products while keeping the implementation simple and maintainable.

Instead of interacting directly with Mixpanel or Google Analytics, every event should be sent through the SDK.

---

# Goals

- Standardize analytics implementation.
- Centralize event tracking.
- Eliminate duplicated code.
- Keep event naming consistent.
- Automatically enrich every event with common properties.
- Support multiple analytics providers.
- Reduce maintenance effort.

---

# Architecture

```
Scape Analytics SDK
│
├── analytics.js
├── config.js
├── events.js
├── ga4.js
├── mixpanel.js
├── payload.js
└── utils.js
```

---

## HTML Tracking Convention

The SDK automatically tracks any element containing the
`data-mp-event` attribute.

Example:

```html
<a
  data-mp-event="Book Treatment"
  data-mp-section="Hero"
  data-mp-cta="Primary">
  Book Now
</a>

# Project Structure

## analytics.js

Public SDK.

Responsibilities:

- Initialize Analytics
- Track Events
- Identify Users
- Reset Sessions
- Send Events

---

## config.js

Environment configuration.

Responsibilities:

- Environment
- Tokens
- API URLs
- Feature flags

---

## events.js

Central catalog of event names.

This file should contain every supported event.

Example:

```

BOOK_TREATMENT
BUY_GIFT_CARD
REQUEST_HOTEL_QUOTE

```

---

## mixpanel.js

Mixpanel integration.

Responsibilities:

- SDK initialization
- Track
- Identify
- Reset

---

## ga4.js

Google Analytics integration.

Responsibilities:

- SDK initialization
- Track events
- Page views

---

## payload.js

Creates the common payload shared by every analytics provider.

---

## utils.js

Reusable helper functions.

Examples:

- getDevice()
- getUTMs()
- getLanguage()
- getCountry()
- getScreenName()

---

# Analytics Flow

```

Button
│
▼
ScapeAnalytics.track()
│
▼
Common Payload
│
▼
Mixpanel
Google Analytics
Future Providers

```

---

# Common Event Properties

Every tracked event automatically includes:

| Property     | Description               |
| ------------ | ------------------------- |
| screen_name  | Current screen            |
| page_title   | Browser page title        |
| page_url     | Current URL               |
| page_path    | URL pathname              |
| page_host    | Domain                    |
| device       | Desktop / Tablet / Mobile |
| referrer     | Previous page             |
| timestamp    | ISO Date                  |
| utm_source   | UTM Source                |
| utm_medium   | UTM Medium                |
| utm_campaign | Campaign                  |
| utm_content  | Content                   |
| utm_term     | Search term               |
| utm_id       | Campaign ID               |

Developers should **not** manually send these properties.

---

# Event Naming Convention

Events should use business actions instead of UI descriptions.

## ✅ Good

```

Book Treatment
Buy Gift Card
Request Hotel Quote
Viewed Page

```

## ❌ Avoid

```

Button Click
Header CTA
Main Button
Click Here

```

---

# Location Convention

UI position should be stored as a property.

Examples:

```

header
hero
body
card
footer
sticky
floating
form

````

---

# Usage

Track an event:

```javascript
ScapeAnalytics.track(
    ScapeEvents.BOOK_TREATMENT,
    {
        location: "hero"
    }
);
````

Identify a user:

```javascript
ScapeAnalytics.identify(userId);
```

Reset analytics:

```javascript
ScapeAnalytics.reset();
```

---

# Best Practices

- Never call Mixpanel directly.
- Never call Google Analytics directly.
- Always use ScapeAnalytics.
- Keep event names business-oriented.
- Reuse existing events whenever possible.
- Add only business-specific properties to events.
- Let the SDK handle common properties.

---

# Roadmap

## Version 1.0.0

- Mixpanel integration
- Google Analytics integration
- Common payload
- Event catalog
- SDK architecture

---

## Future Versions

- Session Replay
- Feature Flags
- Consent Management
- A/B Testing
- Heatmaps
- Additional Analytics Providers

---

# License

Internal project for Scape Wellness.

Confidential.
