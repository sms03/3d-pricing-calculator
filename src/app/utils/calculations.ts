// Utility functions for price calculations

// Base rates - more realistic pricing based on industry standards
const BASE_RATES = {
  stillFrame: 350, // Base rate for still frames in dollars (simple 3D render)
  animation: 150,  // Base rate for animations in dollars per second
  cgi: 500,        // Base rate for CGI in dollars (base scene setup)
  vfx: 750,        // Base rate for VFX in dollars (base compositing work)
};

// Currency conversion rates (relative to USD)
export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.92, name: 'Euro' },
  GBP: { symbol: '£', rate: 0.79, name: 'British Pound' },
  JPY: { symbol: '¥', rate: 150.25, name: 'Japanese Yen' },
  CAD: { symbol: 'C$', rate: 1.36, name: 'Canadian Dollar' },
  AUD: { symbol: 'A$', rate: 1.52, name: 'Australian Dollar' },
  INR: { symbol: '₹', rate: 83.5, name: 'Indian Rupee' },
};

// Currency conversion function
export function convertCurrency(amount: number, currency: keyof typeof CURRENCY_RATES): number {
  return Math.round(amount * CURRENCY_RATES[currency].rate);
}

// Resolution multipliers - higher resolutions require significantly more rendering time
export const RESOLUTION_MULTIPLIERS = {
  "720p": 0.6,
  "1080p": 1.0,
  "2K": 1.5,
  "4K": 2.2,
  "8K": 3.5,
};

// Aspect ratio multipliers - wider ratios require more scene setup
export const ASPECT_RATIO_MULTIPLIERS = {
  "1:1": 0.9,
  "4:3": 1.0,
  "16:9": 1.1,
  "21:9": 1.3,
  "Custom": 1.5,
};

// FPS multipliers - higher framerates require more rendering time
export const FPS_MULTIPLIERS = {
  "24": 1.0,
  "30": 1.25,
  "60": 1.8,
  "120": 2.5,
  "Custom": 3.0,
};

// DPI multipliers - higher DPI requires more detail and rendering time
export const DPI_MULTIPLIERS = {
  "72": 0.7,
  "150": 1.0,
  "300": 1.4,
  "600": 2.0,
  "Custom": 2.5,
};

// Complexity multipliers - based on scene complexity, number of objects, lighting, etc.
export const COMPLEXITY_MULTIPLIERS = {
  "Low": 0.7,
  "Medium": 1.0,
  "High": 1.8,
  "Very High": 3.0,
};

// Additional factors that can affect pricing
export const ADDITIONAL_FACTORS = {
  "Character Animation": 1.5,  // Character animation is more complex than object animation
  "Fluid Simulation": 1.8,    // Water, fire, smoke simulations are computationally expensive
  "Photorealistic": 1.7,      // Photorealistic rendering requires more detail and time
  "Stylized": 1.2,           // Stylized rendering is usually less complex
  "Rush Job": 1.5,           // Rush jobs typically have a premium
};

// Calculate price for still frame
export function calculateStillFramePrice(
  resolution: keyof typeof RESOLUTION_MULTIPLIERS,
  aspectRatio: keyof typeof ASPECT_RATIO_MULTIPLIERS,
  dpi: keyof typeof DPI_MULTIPLIERS,
  complexity: keyof typeof COMPLEXITY_MULTIPLIERS,
  customDpi?: number
): number {
  let dpiMultiplier = DPI_MULTIPLIERS[dpi];

  // Handle custom DPI
  if (dpi === "Custom" && customDpi) {
    dpiMultiplier = customDpi / 150; // Normalize against 150 DPI
    dpiMultiplier = Math.max(0.8, Math.min(dpiMultiplier, 2.5)); // Clamp between 0.8 and 2.5
  }

  const price =
    BASE_RATES.stillFrame *
    RESOLUTION_MULTIPLIERS[resolution] *
    ASPECT_RATIO_MULTIPLIERS[aspectRatio] *
    dpiMultiplier *
    COMPLEXITY_MULTIPLIERS[complexity];

  return Math.round(price);
}

// Calculate price for animation
export function calculateAnimationPrice(
  resolution: keyof typeof RESOLUTION_MULTIPLIERS,
  aspectRatio: keyof typeof ASPECT_RATIO_MULTIPLIERS,
  fps: keyof typeof FPS_MULTIPLIERS,
  complexity: keyof typeof COMPLEXITY_MULTIPLIERS,
  lengthInSeconds: number,
  customFps?: number
): number {
  let fpsMultiplier = FPS_MULTIPLIERS[fps];

  // Handle custom FPS
  if (fps === "Custom" && customFps) {
    fpsMultiplier = customFps / 30; // Normalize against 30 FPS
    fpsMultiplier = Math.max(0.8, Math.min(fpsMultiplier, 2.5)); // Clamp between 0.8 and 2.5
  }

  const price =
    BASE_RATES.animation *
    RESOLUTION_MULTIPLIERS[resolution] *
    ASPECT_RATIO_MULTIPLIERS[aspectRatio] *
    fpsMultiplier *
    COMPLEXITY_MULTIPLIERS[complexity] *
    lengthInSeconds;

  return Math.round(price);
}

// Calculate price for CGI
export function calculateCGIPrice(
  resolution: keyof typeof RESOLUTION_MULTIPLIERS,
  aspectRatio: keyof typeof ASPECT_RATIO_MULTIPLIERS,
  complexity: keyof typeof COMPLEXITY_MULTIPLIERS,
  lengthInSeconds: number = 1 // Default to 1 second if not provided
): number {
  const price =
    BASE_RATES.cgi *
    RESOLUTION_MULTIPLIERS[resolution] *
    ASPECT_RATIO_MULTIPLIERS[aspectRatio] *
    COMPLEXITY_MULTIPLIERS[complexity] *
    lengthInSeconds;

  return Math.round(price);
}

// Calculate price for VFX
export function calculateVFXPrice(
  resolution: keyof typeof RESOLUTION_MULTIPLIERS,
  aspectRatio: keyof typeof ASPECT_RATIO_MULTIPLIERS,
  fps: keyof typeof FPS_MULTIPLIERS,
  complexity: keyof typeof COMPLEXITY_MULTIPLIERS,
  lengthInSeconds: number,
  customFps?: number
): number {
  let fpsMultiplier = FPS_MULTIPLIERS[fps];

  // Handle custom FPS
  if (fps === "Custom" && customFps) {
    fpsMultiplier = customFps / 30; // Normalize against 30 FPS
    fpsMultiplier = Math.max(0.8, Math.min(fpsMultiplier, 2.5)); // Clamp between 0.8 and 2.5
  }

  const price =
    BASE_RATES.vfx *
    RESOLUTION_MULTIPLIERS[resolution] *
    ASPECT_RATIO_MULTIPLIERS[aspectRatio] *
    fpsMultiplier *
    COMPLEXITY_MULTIPLIERS[complexity] *
    lengthInSeconds;

  return Math.round(price);
}

// Get price breakdown for any calculation
export function getPriceBreakdown(
  type: 'stillFrame' | 'animation' | 'cgi' | 'vfx',
  basePrice: number,
  params: {
    resolution: keyof typeof RESOLUTION_MULTIPLIERS,
    aspectRatio: keyof typeof ASPECT_RATIO_MULTIPLIERS,
    fps?: keyof typeof FPS_MULTIPLIERS,
    dpi?: keyof typeof DPI_MULTIPLIERS,
    complexity: keyof typeof COMPLEXITY_MULTIPLIERS,
    lengthInSeconds?: number,
    additionalFactors?: (keyof typeof ADDITIONAL_FACTORS)[],
    currency?: keyof typeof CURRENCY_RATES,
  }
): { item: string; value: number | string; multiplier: number }[] {
  const currency = params.currency || 'USD';
  const currencySymbol = CURRENCY_RATES[currency].symbol;

  const breakdown = [
    {
      item: 'Base Rate',
      value: `${currencySymbol}${convertCurrency(BASE_RATES[type], currency)}`,
      multiplier: 1
    },
    {
      item: 'Resolution',
      value: params.resolution,
      multiplier: RESOLUTION_MULTIPLIERS[params.resolution]
    },
    {
      item: 'Aspect Ratio',
      value: params.aspectRatio,
      multiplier: ASPECT_RATIO_MULTIPLIERS[params.aspectRatio]
    }
  ];

  if (params.fps) {
    breakdown.push({
      item: 'FPS',
      value: params.fps,
      multiplier: FPS_MULTIPLIERS[params.fps as keyof typeof FPS_MULTIPLIERS]
    });
  }

  if (params.dpi) {
    breakdown.push({
      item: 'DPI',
      value: params.dpi,
      multiplier: DPI_MULTIPLIERS[params.dpi as keyof typeof DPI_MULTIPLIERS]
    });
  }

  breakdown.push({
    item: 'Complexity',
    value: params.complexity,
    multiplier: COMPLEXITY_MULTIPLIERS[params.complexity]
  });

  // Add any additional factors
  if (params.additionalFactors && params.additionalFactors.length > 0) {
    params.additionalFactors.forEach(factor => {
      breakdown.push({
        item: factor,
        value: factor,
        multiplier: ADDITIONAL_FACTORS[factor]
      });
    });
  }

  if (params.lengthInSeconds) {
    breakdown.push({
      item: 'Length',
      value: `${params.lengthInSeconds} seconds`,
      multiplier: params.lengthInSeconds
    });
  }

  // Convert the price to the selected currency
  const convertedPrice = convertCurrency(basePrice, currency);

  breakdown.push({
    item: 'Total Price',
    value: `${currencySymbol}${convertedPrice}`,
    multiplier: 0 // Not used for calculation
  });

  return breakdown;
}
