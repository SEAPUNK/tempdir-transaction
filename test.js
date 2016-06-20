'use strict'

import fs from 'fs'
import path from 'path'

import test from 'ava'
import isDirectory from 'is-directory'

import trans from './'

test('should not accept non-functions', async (t) => {
  t.plan(1)
  try {
    await trans({})
    throw new Error('did not throw')
  } catch (err) {
    t.is(err.message, 'Argument must be a function')
  }
})

test('should create temp dir, and clean up temp dir afterwards', async (t) => {
  t.plan(4)

  let oldTempdir
  const a = await trans(async (tempdir) => {
    oldTempdir = tempdir
    t.is(isDirectory.sync(tempdir), true)
    const filename = path.join(tempdir, 'bar')
    fs.writeFileSync(filename, 'foo')
    const file = fs.readFileSync(filename, 'utf-8')
    t.is(file, 'foo')
    return '123'
  })
  t.is(isDirectory.sync(oldTempdir), false)

  t.is(a, '123')
})
