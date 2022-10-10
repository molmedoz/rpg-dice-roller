# RPG Dice Roller

[![Build Status](https://github.com/molmedoz/rpg-dice-roller/actions/workflows/build.yml/badge.svg)](https://github.com/molmedoz/rpg-dice-roller/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/molmedoz/rpg-dice-roller/badge.svg?branch=main)](https://coveralls.io/github/molmedoz/rpg-dice-roller?branch=main)
![Tyepscript friendly](https://img.shields.io/badge/typescript-supported-blue)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](licence.txt)
[![npm downloads](https://img.shields.io/npm/dm/@molmedoz/rpg-dice-roller)](https://www.npmjs.com/package/@dice-roller/rpg-dice-roller)

A JS based dice roller that can roll various types of dice and modifiers, along with mathematical equations.
This is a fork of [@dice-roller/rpg-dice-roller](https://dice-roller.github.io/documentation)


## Install

```bash
npm install @molmedoz/rpg-dice-roller
```

## Documentation

Check out the documentation from original project https://dice-roller.github.io/documentation

## Special Success

Order 9 (critical failure is now 10 and sorting is 11)

When a die rolls a high possible result, such as rolling <= 20% of skills on a d% , this is called a special success.

However, sometimes you want a special success to be on a different value, or a range.

To specify what is considered as a special success, add `ss` and a Compare Point, after the die notation:

```javascript
// roll a d10 4 times, anything greater than 7 is a critical success
4d%ss<=12
```

We're always happy for community contributions. You can find our contributing guide in the docs: https://molmedoz.github.io/documentation/contributing

```javascript
// the rolls of 5 and 11 are critical successes
5d%ss<=12: [13, 5ss, 11ss, 15, 68] = 62
```

## Licence

This dice roller has been released under the MIT licence, meaning you can do pretty much anything you like with it, so long as the original copyright remains in place.

You **can** use it in commercial products.

If the licence terminology in the licence.txt is confusing, check out this: https://www.tldrlegal.com/l/mit
