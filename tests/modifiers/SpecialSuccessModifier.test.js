import { ComparisonModifier, SpecialSuccessModifier } from '../../src/modifiers/index.js';
import { StandardDice } from '../../src/dice/index.js';
import ComparePoint from '../../src/ComparePoint.js';
import RollResults from '../../src/results/RollResults.js';

describe('SpecialSuccessModifier', () => {
  describe('Initialisation', () => {
    test('model structure', () => {
      const mod = new SpecialSuccessModifier();

      expect(mod).toBeInstanceOf(SpecialSuccessModifier);
      expect(mod).toBeInstanceOf(ComparisonModifier);
      expect(mod).toEqual(expect.objectContaining({
        comparePoint: undefined,
        isComparePoint: expect.any(Function),
        name: 'special-success',
        notation: 'ss',
        toJSON: expect.any(Function),
        toString: expect.any(Function),
      }));
    });
  });

  describe('Compare point', () => {
    test('gets set in constructor', () => {
      const cp = new ComparePoint('>', 8);
      const mod = new SpecialSuccessModifier(cp);

      expect(mod.comparePoint).toBe(cp);
      expect(mod.notation).toEqual('ss>8');
    });

    test('setting in constructor calls setter', () => {
      const spy = jest.spyOn(SpecialSuccessModifier.prototype, 'comparePoint', 'set');

      // create the ComparisonModifier
      new SpecialSuccessModifier(new ComparePoint('>', 8));

      expect(spy).toHaveBeenCalledTimes(1);

      // remove the spy
      spy.mockRestore();
    });

    test('must be instance of ComparePoint', () => {
      const mod = new SpecialSuccessModifier();

      expect(() => {
        mod.comparePoint = 'foo';
      }).toThrow(TypeError);

      expect(() => {
        mod.comparePoint = 1;
      }).toThrow(TypeError);

      expect(() => {
        mod.comparePoint = 0;
      }).toThrow(TypeError);

      expect(() => {
        mod.comparePoint = true;
      }).toThrow(TypeError);

      expect(() => {
        mod.comparePoint = false;
      }).toThrow(TypeError);

      expect(() => {
        mod.comparePoint = [new ComparePoint('>', 8)];
      }).toThrow(TypeError);

      expect(() => {
        mod.comparePoint = { comparePoint: new ComparePoint('>', 8) };
      }).toThrow(TypeError);
    });

    test('cannot unset compare point', () => {
      const mod = new SpecialSuccessModifier();

      expect(() => {
        mod.comparePoint = null;
      }).toThrow(TypeError);

      expect(() => {
        mod.comparePoint = undefined;
      }).toThrow(TypeError);
    });
  });

  describe('Matching', () => {
    test('can match against values', () => {
      const spy = jest.spyOn(ComparePoint.prototype, 'isMatch');
      const mod = new SpecialSuccessModifier(new ComparePoint('>', 8));

      // attempt to match
      expect(mod.isComparePoint(9)).toBe(true);
      expect(mod.isComparePoint(8)).toBe(false);
      expect(mod.isComparePoint(7)).toBe(false);
      expect(mod.isComparePoint(0)).toBe(false);

      expect(spy).toHaveBeenCalledTimes(4);

      // remove the spy
      spy.mockRestore();
    });

    test('with no ComparePoint return false', () => {
      const mod = new SpecialSuccessModifier();

      expect(mod.isComparePoint(9)).toBe(false);
    });
  });

  describe('Notation', () => {
    test('simple notation', () => {
      let mod = new SpecialSuccessModifier(new ComparePoint('>', 57636.6457));
      expect(mod.notation).toEqual('ss>57636.6457');

      mod = new SpecialSuccessModifier(new ComparePoint('!=', 3));
      expect(mod.notation).toEqual('ss!=3');

      mod = new SpecialSuccessModifier(new ComparePoint('<>', 7));
      expect(mod.notation).toEqual('ss<>7');

      mod = new SpecialSuccessModifier(new ComparePoint('=', 157));
      expect(mod.notation).toEqual('ss=157');
    });
  });

  describe('Output', () => {
    test('JSON output is correct', () => {
      const mod = new SpecialSuccessModifier(new ComparePoint('=', 4));

      // json encode, to get the encoded string, then decode so we can compare the object
      // this allows us to check that the output is correct, but ignoring the order of the
      // returned properties
      expect(JSON.parse(JSON.stringify(mod))).toEqual({
        comparePoint: {
          operator: '=',
          type: 'compare-point',
          value: 4,
        },
        name: 'special-success',
        notation: 'ss=4',
        type: 'modifier',
      });
    });

    test('toString output is correct', () => {
      const mod = new SpecialSuccessModifier(new ComparePoint('=', 4));

      expect(mod.toString()).toEqual('ss=4');
    });
  });

  describe('Run', () => {
    test('returns RollResults object', () => {
      const results = new RollResults();
      const die = new StandardDice(6, 2);
      const mod = new SpecialSuccessModifier(new ComparePoint('=', 4));

      expect(mod.run(results, die)).toBe(results);
    });

    test('checks roll value against compare point', () => {
      const spy = jest.spyOn(SpecialSuccessModifier.prototype, 'isComparePoint');
      const results = new RollResults([
        1, 2, 4, 8, 6,
      ]);
      const mod = new SpecialSuccessModifier(new ComparePoint('>=', 6));

      mod.run(results, new StandardDice(6, 5));

      expect(spy).toHaveBeenCalledTimes(5);

      // remove the spy
      spy.mockRestore();
    });

    test('flags failure rolls', () => {
      const results = new RollResults([
        1, 2, 4, 8, 6,
      ]);
      const mod = new SpecialSuccessModifier(new ComparePoint('>=', 6));
      const modifiedRolls = mod.run(results, new StandardDice(6, 5)).rolls;

      expect(modifiedRolls).toBeInstanceOf(Array);
      expect(modifiedRolls).toHaveLength(5);

      expect(modifiedRolls[0].calculationValue).toBe(1);
      expect(modifiedRolls[0].modifiers).toEqual(new Set());
      expect(modifiedRolls[0].useInTotal).toBe(true);
      expect(modifiedRolls[0].value).toBe(1);

      expect(modifiedRolls[1].calculationValue).toBe(2);
      expect(modifiedRolls[1].modifiers).toEqual(new Set());
      expect(modifiedRolls[1].useInTotal).toBe(true);
      expect(modifiedRolls[1].value).toBe(2);

      expect(modifiedRolls[2].calculationValue).toBe(4);
      expect(modifiedRolls[2].modifiers).toEqual(new Set());
      expect(modifiedRolls[2].useInTotal).toBe(true);
      expect(modifiedRolls[2].value).toBe(4);

      expect(modifiedRolls[3].calculationValue).toBe(8);
      expect(modifiedRolls[3].modifiers).toEqual(new Set(['special-success']));
      expect(modifiedRolls[3].useInTotal).toBe(true);
      expect(modifiedRolls[3].value).toBe(8);

      expect(modifiedRolls[4].calculationValue).toBe(6);
      expect(modifiedRolls[4].modifiers).toEqual(new Set(['special-success']));
      expect(modifiedRolls[4].useInTotal).toBe(true);
      expect(modifiedRolls[4].value).toBe(6);
    });
  });

  describe('Readonly properties', () => {
    test('cannot change name value', () => {
      const mod = new SpecialSuccessModifier();

      expect(() => {
        mod.name = 'Foo';
      }).toThrow(TypeError);
    });
  });
});
