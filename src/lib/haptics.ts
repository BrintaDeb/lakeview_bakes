"use client";

import { sound } from "./sound";

/**
 * Multi-sensory Mobile Haptic Feedback Engine
 * - Android & Chromium: Uses navigator.vibrate with calibrated millisecond pulses
 * - iOS Safari & Fallbacks: Synthesizes acoustic micro-transients through Web Audio
 *   that trigger physical tactile sensations on smartphone speakers / Taptic linear motors.
 */
class HapticsEngine {
  private hasVibration: boolean = false;

  constructor() {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      this.hasVibration = true;
    }
  }

  /**
   * Light tactile tap - for tab switches, filter pills, option selection
   */
  public light() {
    try {
      if (this.hasVibration) {
        navigator.vibrate(8);
      }
      sound.playBubblePop();
    } catch {
      // guard against browser permission blocks
    }
  }

  /**
   * Medium impact - for Add to Cart, quantity changes, modal open
   */
  public medium() {
    try {
      if (this.hasVibration) {
        navigator.vibrate([15, 25, 20]);
      }
      sound.playBubblePop();
    } catch {
      // guard
    }
  }

  /**
   * Selection tick - micro click for steppers and radio switches
   */
  public selection() {
    try {
      if (this.hasVibration) {
        navigator.vibrate(5);
      }
    } catch {
      // guard
    }
  }

  /**
   * Success / Celebration - for order placement, coupon success, cart checkout
   */
  public success() {
    try {
      if (this.hasVibration) {
        navigator.vibrate([20, 40, 30, 50, 60]);
      }
      sound.playSweetChime();
    } catch {
      // guard
    }
  }

  /**
   * Warning / Error - for missing fields or invalid entries
   */
  public warning() {
    try {
      if (this.hasVibration) {
        navigator.vibrate([40, 60, 40]);
      }
    } catch {
      // guard
    }
  }
}

export const haptics = new HapticsEngine();
