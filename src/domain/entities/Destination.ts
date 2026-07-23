export interface Destination {
  id: number;
  image: string;
  images?: string[];
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  priceMin: number;
  priceMax: number;
  category: string;
  description: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  meetingPoints: { time: string; location: string; description: string }[];
  reviewsList: { author: string; rating: number; date: string; comment: string; images?: string[] }[];
}

/**
 * Domain services/logic for Destination.
 * Standard pure object-oriented/functional business logic.
 */
export const DestinationDomain = {
  /**
   * Calculates total estimate price based on pax count.
   */
  calculateTotalPrice(destination: Destination, pax: number): number {
    if (pax <= 0) return 0;
    return pax * destination.priceMin;
  },

  /**
   * Identifies if destination is a popular pick based on rating and reviews.
   */
  isPopular(destination: Destination): boolean {
    return destination.rating >= 4.7 && destination.reviewCount >= 2000;
  },

  /**
   * Gets the simplified location name (e.g. "Bali" from "Bali, Indonesia").
   */
  getShortLocation(destination: Destination): string {
    return destination.location.split(",")[0].trim();
  }
};
