/**
 * ============================================================================
 * Scape Analytics SDK
 * ----------------------------------------------------------------------------
 * File: events.js
 * Version: 1.0.0
 *
 * Description:
 * Centralized catalog of business events.
 * ============================================================================
 */

export const Events = Object.freeze({
	/**
	 * Generic
	 */
	PAGE_VIEW: 'Viewed Page',

	/**
	 * Booking
	 */
	BOOK_TREATMENT: 'Book Treatment',

	START_BOOKING: 'Started Booking',

	COMPLETE_BOOKING: 'Completed Booking',

	/**
	 * Gift Cards
	 */
	BUY_GIFT_CARD: 'Buy Gift Card',

	GIFT_CARD_PURCHASED: 'Gift Card Purchased',

	/**
	 * Forms
	 */
	CONTACT_FORM_SUBMITTED: 'Contact Form Submitted',

	CORPORATE_QUOTE_REQUESTED: 'Corporate Quote Requested',

	HOTEL_QUOTE_REQUESTED: 'Hotel Quote Requested',

	/**
	 * Navigation
	 */
	MENU_CLICK: 'Menu Click',

	LANGUAGE_CHANGED: 'Language Changed',

	COUNTRY_CHANGED: 'Country Changed',

	CITY_CHANGED: 'City Changed',

	/**
	 * Engagement
	 */
	CTA_CLICK: 'CTA Click',

	WHATSAPP_CLICK: 'WhatsApp Click',

	PHONE_CLICK: 'Phone Click',

	EMAIL_CLICK: 'Email Click',
});
