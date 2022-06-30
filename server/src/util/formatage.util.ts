import { Injectable } from '@nestjs/common';

@Injectable()
export class FormatageUtil {
  /**
   * Create a random id from an image (max 20 characters)
   * @param image image
   * @returns id
   */
  createIdFromImage(image: any) {
    let id = '';
    // Convert to base 64
    const base64 = image.toString('base64');
    // Take 20 random characters in the base 64
    for (let i = 0; i < 30; i++) {
      // Get a random character
      const random = Math.floor(Math.random() * base64.length);
      // Check if it's a valid character (only letters and numbers)
      if (
        base64[random] !== '+' &&
        base64[random] !== '/' &&
        base64[random] !== '='
      ) {
        // Add the character to the id
        id += base64[random];
      } else {
        // If it's not a valid character, restart the loop
        i--;
      }
    }
    // Return the id
    return id;
  }
}
