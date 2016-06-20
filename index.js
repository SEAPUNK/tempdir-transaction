'use strict'

var uniqueTempDir = require('unique-temp-dir')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')

module.exports = function (fn) {
  return new Promise(function (resolve, reject) {
    if (typeof fn !== 'function') return reject(new Error('Argument must be a function'))
    var tempDir = uniqueTempDir()
    mkdirp(tempDir, function (err) {
      if (err) return reject(err)
      Promise.resolve(fn(tempDir)).then(function (retval) {
        rimraf(tempDir, function (err) {
          if (err) return reject(err)
          return resolve(retval)
        })
      }).catch(function (err) {
        rimraf(tempDir, function (rmErr) {
          return reject(rmErr || err)
        })
      })
    })
  })
}
