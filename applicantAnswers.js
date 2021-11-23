const {
  addToDb,
  selectWhere,
  unpredictableApiResponse,
} = require("./utils.js");

/**TODO: Test 1 - Use a util function
 * 1. Add a new color to the colors database using the addToDb function at the top of this page. (Look at the colorsDb array in utils.js to see the db format)
 *      addToDb inserts an item, and returns a promise containing the id of the inserted item
 *      The color should be orange, have an id of 5, and primary should be false
 */
const test1 = () => {
  return addToDb({ id: 5, color: "orange", primary: false });
};

/**  TODO: Test 2 - return the color of the item with id of 3
 *Use the selectWhere function. selectWhere takes to arguments, the first is the key, to search and the second is the value to match.
 * For example selectWhere("color","magenta") would return all of the items where the color is magenta
 * 1. Use the selectWhere function to get a promise containing the list of items with an id of 3.
 * 2. return the list of colors of matching items (Hint the answer would be ["green"])
 */
const test2 = () => {
  let results = []
  selectWhere("id", 3).then(res => res.forEach(color => results.push(color.color)));
  return results;
};

/**TODO: Test 3 - Return multiple items with selectWhere util
 * 1. Use the selectWhere function to retrieve a promise containing the list of items that are primary colors. (This should be just 2 items)
 * 2. return only the ids of these items (Hint, the answer would return [1,2])
 */
const test3 = () => {
  let results = []
  selectWhere("primary", true).then(res => res.map(color => results.push(color.id)));
  return results;
};

/**TODO: Test 4 - Test multiple asynchronous steps
 * 1. Add a new color to the colors database with an id of 8, the color brown, and primary is false
 * 2. Read the color from the database that you just inserted (Hint: addToDb returns the id of the item just inserted)
 * 3. Return only the color value from the database. In this case, the function would return "brown"
 */
const test4 = () => {
  return addToDb({ id: 8, color: "brown", primary: false }).then(res => selectWhere("id", 8).then(res => res[0].color));
};

/**TODO: Bonus - Handle unpredictable promises
 * Bonus: Make a decision based on an unpredictable api response, call again if true, stop process if false, and count the number of times the function was called
 * 1. call the function named "unpredictableApiResponse" imported at the top of the file.  This function returns a promise which randomly has a value of either true or false
 * 2.
 *   a. if the unpredictableApiResponse() returns true, call unpredictableApiResponse() again.
 *   b. if the unpredictableApiResponse() returns false, stop executing.
 * 3. Count the total number of times this function was called. (Hint, it will always be at least one, and will be incremented each time true is returned from unpredictableApiResponse())
 * Since you do not know whether or not the function will return true or false, you will not know how many times you'll need to call the function again.
 * This tests some complex-real world data flows where calling external processes is not predictable
 *
 *
 */

const bonusTest = async () => {
  let count = 0;
  let result = true
  while (result) {
    count++;
    result = await unpredictableApiResponse();
  }
  return count;
};

module.exports = { test1, test2, test3, test4, bonusTest };
