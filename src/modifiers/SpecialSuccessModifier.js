import ComparisonModifier from './ComparisonModifier.js';

/**
 * A `SpecialSuccessModifier` modifier flags values that match a comparison.
 *
 * Unlike most other modifiers, it doesn't affect the roll value, it simply "flags" matching rolls.
 *
 * @see {@link SpecialFailureModifier} for the opposite of this modifier
 *
 * @extends ComparisonModifier
 */
class SpecialSuccessModifier extends ComparisonModifier {
  /**
   * Create a `SpecialSuccessModifier` instance.
   *
   * @param {ComparePoint} comparePoint The comparison object
   *
   * @throws {TypeError} comparePoint must be a `ComparePoint` object
   */
  constructor(comparePoint) {
    super(comparePoint);

    // set the modifier's sort order
    this.order = 9;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The name of the modifier.
   *
   * @returns {string} 'special-success'
   */
  get name() {
    return 'special-success';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The modifier's notation.
   *
   * @returns {string}
   */
  get notation() {
    return `ss${super.notation}`;
  }

  /**
   * Runs the modifier on the rolls.
   *
   * @param {RollResults} results The results to run the modifier against
   * @param {StandardDice|RollGroup} _context The object that the modifier is attached to
   *
   * @returns {RollResults}
   */
  run(results, _context) {
    // loop through each roll and see if it's a special success
    results.rolls
      .forEach((roll) => {
        // add the modifier flag
        if (roll.modifiers.has('critical-success')) {
          return roll;
        }
        if (this.isComparePoint(roll.value)) {
          roll.modifiers.add('special-success');
        }

        return roll;
      });

    return results;
  }
}

export default SpecialSuccessModifier;
