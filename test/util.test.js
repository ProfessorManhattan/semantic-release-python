const { getOption, hasOwn, normalizeVersion } = require('../lib/util')

test('test hasOwn', async () => {
  expect(hasOwn({ a: 1 }, 'a')).toBe(true)
  expect(hasOwn({ a: 1 }, 'b')).toBe(false)
  expect(hasOwn({ a: undefined }, 'a')).toBe(true)

  // Inherited properties must not be reported as own properties
  expect(hasOwn(Object.create({ a: 1 }), 'a')).toBe(false)
  expect(hasOwn(Object.create(null), 'a')).toBe(false)

  // Defensive handling of nullish configuration objects
  expect(hasOwn(null, 'a')).toBe(false)
  expect(hasOwn(undefined, 'a')).toBe(false)
})

test('test getOption does not depend on Object.hasOwn (Node.js < 16.9)', async () => {
  const { hasOwn: objectHasOwn } = Object
  const descriptor = Object.getOwnPropertyDescriptor(Object, 'hasOwn')

  try {
    // Reproduces the runtime of the reported bug: Object.hasOwn does not exist
    // on Node.js versions older than 16.9 (see GitHub issue #1)
    delete Object.hasOwn
    expect(Object.hasOwn).toBe(undefined)

    expect(getOption({ distDir: 'mydist' }, 'distDir')).toBe('mydist')
    expect(getOption({ pypiPublish: false }, 'pypiPublish')).toBe(false)
    expect(getOption({}, 'distDir')).toBe('dist')
    expect(getOption({}, 'foo')).toBe(undefined)
  } finally {
    if (descriptor) {
      Object.defineProperty(Object, 'hasOwn', descriptor)
    } else if (objectHasOwn) {
      Object.hasOwn = objectHasOwn
    }
  }
})

test('test getOption ignores inherited options', async () => {
  const pluginConfig = Object.create({ distDir: 'inherited' })
  pluginConfig.repoUrl = 'https://example.com/legacy/'

  expect(getOption(pluginConfig, 'distDir')).toBe('dist')
  expect(getOption(pluginConfig, 'repoUrl')).toBe('https://example.com/legacy/')
})

test('test getOption without a configuration object', async () => {
  expect(getOption(undefined, 'distDir')).toBe('dist')
  expect(getOption(null, 'setupPy')).toBe('./setup.py')
})

test('test getOption', async () => {
  expect(getOption({}, 'distDir')).toBe('dist')
  expect(getOption({}, 'setupPy')).toBe('./setup.py')
  expect(getOption({}, 'repoUrl')).toBe('https://upload.pypi.org/legacy/')

  expect(getOption({ distDir: 'mydist' }, 'distDir')).toBe('mydist')
  expect(getOption({}, 'foo')).toBe(undefined)
})

test('test normalizeVersion', async () => {
  await expect(normalizeVersion('1.0.1')).resolves.toBe('1.0.1')

  await expect(normalizeVersion('1.0.1a')).resolves.toBe('1.0.1a0')
  await expect(normalizeVersion('1.0.1alpha')).resolves.toBe('1.0.1a0')
  await expect(normalizeVersion('1.0.1-a')).resolves.toBe('1.0.1a0')
  await expect(normalizeVersion('1.0.1-a1')).resolves.toBe('1.0.1a1')
  await expect(normalizeVersion('1.0.1-alpha')).resolves.toBe('1.0.1a0')
  await expect(normalizeVersion('1.0.1-alpha1')).resolves.toBe('1.0.1a1')

  await expect(normalizeVersion('1.0.1-b')).resolves.toBe('1.0.1b0')
  await expect(normalizeVersion('1.0.1-beta')).resolves.toBe('1.0.1b0')
  await expect(normalizeVersion('1.0.1-rc')).resolves.toBe('1.0.1rc0')
  await expect(normalizeVersion('1.0.1-pre')).resolves.toBe('1.0.1rc0')
  await expect(normalizeVersion('1.0.1-post')).resolves.toBe('1.0.1.post0')
  await expect(normalizeVersion('1.0.1-dev')).resolves.toBe('1.0.1.dev0')

  await expect(normalizeVersion('1.0.1-next')).rejects.toThrow()
  await expect(normalizeVersion('1.0.1-develop')).rejects.toThrow()

  await expect(normalizeVersion('1 2 3')).rejects.toThrow()
})
