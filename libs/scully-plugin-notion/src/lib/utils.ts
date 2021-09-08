const STRING_CAMELIZE_REGEXP = /(-|_|\.|\s)+(.)?/g;

/**
 Returns the lowerCamelCase form of a string.
 ```javascript
 camelize('innerHTML');          // 'innerHTML'
 camelize('action_name');        // 'actionName'
 camelize('css-class-name');     // 'cssClassName'
 camelize('my favorite items');  // 'myFavoriteItems'
 camelize('My Favorite Items');  // 'myFavoriteItems'
 ```
 @method camelize
 @param {String} str The string to camelize.
 @return {String} the camelized string.
 */
export function camelize(str: string): string {
  return str
    .replace(
      STRING_CAMELIZE_REGEXP,
      (_match: string, _separator: string, chr: string) => {
        return chr ? chr.toUpperCase() : '';
      }
    )
    .replace(/^([A-Z])/, (match: string) => match.toLowerCase());
}
