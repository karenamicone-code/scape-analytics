(function() {
  "use strict";
  const hostname = window.location.hostname;
  const isProduction = hostname === "scapewellness.com" || hostname === "www.scapewellness.com";
  const ScapeConfig = Object.freeze({
    sdk: {
      name: "Scape Analytics SDK",
      version: "1.0.0"
    },
    environment: {
      name: isProduction ? "production" : "staging",
      isProduction,
      hostname
    },
    providers: {
      mixpanel: {
        enabled: isProduction,
        token: isProduction ? "fdff61c47451a84fa8f2793f7988dff2" : null
      },
      ga4: {
        enabled: isProduction,
        measurementId: isProduction ? "G-C1Y7H9TM3K" : null
      }
    },
    api: {
      baseUrl: isProduction ? "https://client.api.scapewellness.com" : "https://staging.api.scapewellness.com",
      parse: {
        applicationId: isProduction ? "scape" : "scape-staging",
        restApiKey: isProduction ? "a196b333-2e73-4700-8ac8-66fdc88751d8" : "scapeStagingRestKey"
      }
    },
    debug: !isProduction
  });
  function getTimestamp() {
    return (/* @__PURE__ */ new Date()).toISOString();
  }
  function getPageTitle() {
    return document.title || "";
  }
  function getPageURL() {
    return window.location.href;
  }
  function getPagePath() {
    return window.location.pathname;
  }
  function getHostname() {
    return window.location.hostname;
  }
  function getReferrer() {
    return document.referrer || "";
  }
  function getLanguage() {
    return navigator.language || navigator.userLanguage || "unknown";
  }
  function getScreenResolution() {
    return `${window.screen.width}x${window.screen.height}`;
  }
  function getViewport() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  function getDevice() {
    const ua = navigator.userAgent;
    if (/iPad|Tablet/i.test(ua) || navigator.maxTouchPoints > 1 && window.innerWidth > 768) {
      return "Tablet";
    }
    if (/Mobi|Android|iPhone/i.test(ua) || window.innerWidth <= 768) {
      return "Mobile";
    }
    return "Desktop";
  }
  function getOS() {
    const ua = navigator.userAgent;
    if (/Windows/i.test(ua)) return "Windows";
    if (/Mac/i.test(ua)) return "macOS";
    if (/Android/i.test(ua)) return "Android";
    if (/iPhone|iPad/i.test(ua)) return "iOS";
    if (/Linux/i.test(ua)) return "Linux";
    return "Unknown";
  }
  function getBrowser() {
    const ua = navigator.userAgent;
    if (/Edg/i.test(ua)) return "Edge";
    if (/Chrome/i.test(ua)) return "Chrome";
    if (/Firefox/i.test(ua)) return "Firefox";
    if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return "Safari";
    return "Unknown";
  }
  function getUTMs() {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "organic",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
      utm_id: params.get("utm_id") || ""
    };
  }
  function sanitize(payload = {}) {
    return Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => {
        if (value === null) return false;
        if (value === void 0) return false;
        if (value === "") return false;
        return true;
      })
    );
  }
  function buildPayload(properties = {}) {
    const payload = {
      timestamp: getTimestamp(),
      page_title: getPageTitle(),
      page_url: getPageURL(),
      page_path: getPagePath(),
      page_host: getHostname(),
      referrer: getReferrer(),
      language: getLanguage(),
      screen_resolution: getScreenResolution(),
      viewport: getViewport(),
      browser: getBrowser(),
      operating_system: getOS(),
      device: getDevice(),
      ...getUTMs(),
      ...properties
    };
    return sanitize(payload);
  }
  class MixpanelProvider {
    constructor() {
      this.initialized = false;
    }
    /**
     * Load Mixpanel SDK
     */
    async init() {
      if (this.initialized) return;
      if (!ScapeConfig.providers.mixpanel.enabled) {
        console.warn("Mixpanel disabled.");
        return;
      }
      await this.loadSDK();
      mixpanel.init(ScapeConfig.providers.mixpanel.token, {
        debug: ScapeConfig.debug,
        persistence: "localStorage"
      });
      this.initialized = true;
      console.log("✅ Mixpanel initialized");
    }
    /**
     * Load Mixpanel Script
     */
    loadSDK() {
      return new Promise((resolve, reject) => {
        if (window.mixpanel) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    /**
     * Track Event
     */
    track(eventName, properties = {}) {
      console.log("➡️ Mixpanel.track()", eventName);
      if (!this.initialized) {
        console.warn("Mixpanel NOT initialized");
        return;
      }
      const payload = buildPayload(properties);
      console.log("Payload:", payload);
      mixpanel.track(eventName, payload);
      console.log("✅ Event sent to Mixpanel");
      if (ScapeConfig.debug) {
        console.table(payload);
      }
    }
    /**
     * Identify User
     */
    identify(userId) {
      if (!this.initialized) return;
      mixpanel.identify(userId);
    }
    /**
     * Set People Properties
     */
    people(properties = {}) {
      if (!this.initialized) return;
      mixpanel.people.set(properties);
    }
    /**
     * Reset User
     */
    reset() {
      if (!this.initialized) return;
      mixpanel.reset();
    }
  }
  const Mixpanel = new MixpanelProvider();
  class GA4Provider {
    constructor() {
      this.initialized = false;
    }
    /**
     * Initialize Google Analytics
     */
    async init() {
      if (this.initialized) return;
      if (!ScapeConfig.providers.ga4.enabled) {
        console.warn("GA4 disabled.");
        return;
      }
      await this.loadSDK();
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        dataLayer.push(arguments);
      };
      gtag("js", /* @__PURE__ */ new Date());
      gtag("config", ScapeConfig.providers.ga4.measurementId, {
        anonymize_ip: true,
        send_page_view: false
      });
      this.initialized = true;
      console.log("✅ GA4 initialized");
    }
    /**
     * Load Google Analytics SDK
     */
    loadSDK() {
      return new Promise((resolve, reject) => {
        if (window.gtag) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${ScapeConfig.providers.ga4.measurementId}`;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    /**
     * Track Event
     */
    track(eventName, properties = {}) {
      if (!this.initialized) return;
      const payload = buildPayload(properties);
      gtag("event", eventName, payload);
      if (ScapeConfig.debug) {
        console.log("📤 GA4 Event");
        console.table(payload);
      }
    }
    /**
     * Identify User
     *
     * GA4 does not support identify()
     * We map it to user_id.
     */
    identify(userId) {
      if (!this.initialized) return;
      gtag("set", {
        user_id: userId
      });
    }
    /**
     * Reset User
     */
    reset() {
    }
  }
  const GA4 = new GA4Provider();
  const Events = Object.freeze({
    /**
     * Generic
     */
    PAGE_VIEW: "Viewed Page",
    /**
     * Booking
     */
    BOOK_TREATMENT: "Book Treatment",
    START_BOOKING: "Started Booking",
    COMPLETE_BOOKING: "Completed Booking",
    /**
     * Gift Cards
     */
    BUY_GIFT_CARD: "Buy Gift Card",
    GIFT_CARD_PURCHASED: "Gift Card Purchased",
    /**
     * Forms
     */
    CONTACT_FORM_SUBMITTED: "Contact Form Submitted",
    CORPORATE_QUOTE_REQUESTED: "Corporate Quote Requested",
    HOTEL_QUOTE_REQUESTED: "Hotel Quote Requested",
    /**
     * Navigation
     */
    MENU_CLICK: "Menu Click",
    LANGUAGE_CHANGED: "Language Changed",
    COUNTRY_CHANGED: "Country Changed",
    CITY_CHANGED: "City Changed",
    /**
     * Engagement
     */
    CTA_CLICK: "CTA Click",
    WHATSAPP_CLICK: "WhatsApp Click",
    PHONE_CLICK: "Phone Click",
    EMAIL_CLICK: "Email Click"
  });
  class Analytics {
    constructor() {
      this.initialized = false;
      this.providers = [];
    }
    /**
     * Initialize SDK
     */
    async init() {
      if (this.initialized) return;
      if (ScapeConfig.providers.mixpanel.enabled) {
        await Mixpanel.init();
        this.providers.push(Mixpanel);
      }
      if (ScapeConfig.providers.ga4.enabled) {
        await GA4.init();
        this.providers.push(GA4);
      }
      this.initialized = true;
      console.log(`🚀 ${ScapeConfig.sdk.name} v${ScapeConfig.sdk.version}`);
      console.table(
        this.providers.map((provider) => ({
          Provider: provider.constructor.name,
          Status: "Ready"
        }))
      );
    }
    /**
     * Generic Track
     */
    track(eventName, properties = {}) {
      if (!this.initialized) {
        console.warn("Analytics SDK not initialized.");
        return;
      }
      console.log("Analytics.track()", eventName);
      this.providers.forEach((provider) => {
        console.log("Calling provider:", provider.constructor.name);
        if (typeof provider.track === "function") {
          provider.track(eventName, properties);
        }
      });
    }
    /**
     * Page View
     */
    page(properties = {}) {
      this.track(Events.PAGE_VIEW, properties);
    }
    /**
     * Identify User
     */
    identify(userId) {
      if (!this.initialized) return;
      this.providers.forEach((provider) => {
        provider.identify?.(userId);
      });
    }
    /**
     * Register Super Properties
     */
    register(properties = {}) {
      if (!this.initialized) return;
      this.providers.forEach((provider) => {
        provider.register?.(properties);
      });
    }
    /**
     * People Properties
     */
    people(properties = {}) {
      if (!this.initialized) return;
      this.providers.forEach((provider) => {
        provider.people?.(properties);
      });
    }
    /**
     * Reset User
     */
    reset() {
      if (!this.initialized) return;
      this.providers.forEach((provider) => {
        provider.reset?.();
      });
    }
  }
  const ScapeAnalytics = new Analytics();
  class AutoTrack {
    constructor() {
      this.initialized = false;
    }
    /**
     * Initialize AutoTrack
     */
    init() {
      if (this.initialized) return;
      document.addEventListener("click", this.handleClick.bind(this));
      this.initialized = true;
      console.log("✅ AutoTrack initialized");
    }
    /**
     * Handle Click Events
     */
    handleClick(event) {
      const element = event.target.closest("[data-mp-event]");
      if (!element) return;
      const eventName = element.dataset.mpEvent;
      if (!eventName) return;
      const properties = this.extractProperties(element);
      ScapeAnalytics.track(eventName, properties);
    }
    /**
     * Extract every data-mp-* attribute.
     *
     * Example:
     *
     * data-mp-service="Massage"
     * data-mp-section="Hero"
     *
     * becomes
     *
     * {
     *    service:"Massage",
     *    section:"Hero"
     * }
     *
     */
    extractProperties(element) {
      const properties = {};
      Array.from(element.attributes).forEach((attribute) => {
        if (!attribute.name.startsWith("data-mp-")) {
          return;
        }
        if (attribute.name === "data-mp-event") {
          return;
        }
        const property = attribute.name.replace("data-mp-", "").replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        properties[property] = attribute.value;
      });
      return properties;
    }
  }
  const ScapeAutoTrack = new AutoTrack();
  class NavigationManager {
    constructor() {
      this.initialized = false;
      this.currentUrl = window.location.href;
    }
    init() {
      if (this.initialized) return;
      this.initialized = true;
      this.trackPage();
      window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
          this.trackPage();
        }
      });
      window.addEventListener("popstate", () => {
        this.handleNavigation();
      });
      const originalPushState = history.pushState;
      history.pushState = (...args) => {
        originalPushState.apply(history, args);
        this.handleNavigation();
      };
      const originalReplaceState = history.replaceState;
      history.replaceState = (...args) => {
        originalReplaceState.apply(history, args);
        this.handleNavigation();
      };
      console.log("✅ Navigation initialized");
    }
    handleNavigation() {
      const newUrl = window.location.href;
      if (newUrl === this.currentUrl) {
        return;
      }
      this.currentUrl = newUrl;
      this.trackPage();
    }
    trackPage() {
      console.log("👁 Viewed Page:", window.location.pathname);
      ScapeAnalytics.page();
    }
  }
  const Navigation = new NavigationManager();
  async function initializeSDK() {
    try {
      await ScapeAnalytics.init();
      ScapeAutoTrack.init();
      Navigation.init();
      console.log("✅ Scape Analytics SDK initialized successfully.");
    } catch (error) {
      console.error("❌ Failed to initialize Scape Analytics SDK", error);
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSDK);
  } else {
    initializeSDK();
  }
  window.ScapeAnalytics = ScapeAnalytics;
})();
//# sourceMappingURL=scape-analytics.js.map
