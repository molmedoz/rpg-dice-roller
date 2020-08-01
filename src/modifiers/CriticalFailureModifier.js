import ComparisonModifier from './ComparisonModifier';

/**
 * A critical failure modifier
 */
class CriticalFailureModifier extends ComparisonModifier {
  /**
   * Create a CriticalFailureModifier
   *
   * @param {ComparePoint} [comparePoint] The comparison object
   *
   * @throws {TypeError} comparePoint must be a ComparePoint object
   */
  constructor(comparePoint) {
    super(comparePoint);

    // set the modifier's sort order
    this.order = 9;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * Returns the name for the modifier
   *
   * @returns {string}
   */
  get name() {
    return 'critical-failure';
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Returns the modifier notation
   *
   * @returns {string}
   */
  get notation() {
    return `cf${super.notation}`;
  }

  /**
   * Runs the modifier on the rolls
   *
   * @param {RollResults} results
   * @param {StandardDice} _dice
   *
   * @returns {RollResults}
   */
  run(results, _dice) {
    results.rolls
      .forEach((roll) => {
        // add the modifier flag
        if (this.isComparePoint(roll.value)) {
          roll.modifiers.add('critical-failure');
        }

        return roll;
      });

    return results;
  }
}

export default CriticalFailureModifier;
