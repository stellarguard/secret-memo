# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.0.1"></a>
## [3.0.1](https://github.com/stellarguard/secret-memo/compare/v3.0.0...v3.0.1) (2021-05-29)



<a name="3.0.0"></a>

# [3.0.0](https://github.com/stellarguard/secret-memo/compare/v2.0.1...v3.0.0) (2020-11-23)

### Features

- **package.json:** require stellar-sdk ^7.0.0 ([e689ea3](https://github.com/stellarguard/secret-memo/commit/e689ea3))

### BREAKING CHANGES

- 🧨 Now requires peer dependency of stellar-sdk >= 7.0.0

<a name="2.0.1"></a>

## [2.0.1](https://github.com/stellarguard/secret-memo/compare/v2.0.0...v2.0.1) (2020-11-23)

### Bug Fixes

- make sure hash is below 64 characters to avoid error ([b082b6c](https://github.com/stellarguard/secret-memo/commit/b082b6c)), closes [#1](https://github.com/stellarguard/secret-memo/issues/1)

<a name="2.0.0"></a>

# [2.0.0](https://github.com/stellarguard/secret-memo/compare/v1.0.1...v2.0.0) (2020-05-18)

### Features

- 🎸 Upgrade to stellar-sdk v5.0.0 ([60f6815](https://github.com/stellarguard/secret-memo/commit/60f6815))

### BREAKING CHANGES

- 🧨 Now requires peer dependency of stellar-sdk >= 5.0.0

<a name="1.0.1"></a>

## [1.0.1](https://github.com/stellarguard/secret-memo/compare/v1.0.0...v1.0.1) (2018-07-02)

### Bug Fixes

- Remove randombytes from dependencies ([d6dd005](https://github.com/stellarguard/secret-memo/commit/d6dd005))

<a name="1.0.0"></a>

# [1.0.0](https://github.com/stellarguard/secret-memo/compare/v0.1.0...v1.0.0) (2018-07-02)

<a name="0.1.0"></a>

# 0.1.0 (2018-07-02)

### Features

- Add fromMemoHash method in case you have a string instead of a buffer. Rename to SecretMemo. ([74f0df2](https://github.com/stellarguard/secret-memo/commit/74f0df2))
- Add initial working version of code ([6117151](https://github.com/stellarguard/secret-memo/commit/6117151))
- Increase max size to 23 characters. ([343b6ad](https://github.com/stellarguard/secret-memo/commit/343b6ad))
