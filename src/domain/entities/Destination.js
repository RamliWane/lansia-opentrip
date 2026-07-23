/**
 * Domain services/logic for Destination.
 * Standard pure object-oriented/functional business logic.
 */
export const DestinationDomain = {
  /**
   * Calculates total estimate price based on pax count.
   */
  calculateTotalPrice(destination, pax) {
    if (pax <= 0) return 0;
    return pax * destination.priceMin;
  },

  /**
   * Identifies if destination is a popular pick based on rating and reviews.
   */
  isPopular(destination) {
    return destination.rating >= 4.7 && destination.reviewCount >= 2000;
  },

  /**
   * Gets the simplified location name (e.g. "Bali" from "Bali, Indonesia").
   */
  getShortLocation(destination) {
    return destination.location.split(",")[0].trim();
  }
};
