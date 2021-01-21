'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OfferSchema extends Schema {
  up () {
    this.create('offers', (table) => {
      table.increments()
      table.string('advertiser', 50).notNullable().unique()
      table.string('url', 100).notNullable()
      table.string('description', 500).notNullable()
      table.boolean('status').defaultTo(false)
      table.date('starts').notNullable()
      table.date('ends').defaultTo(null)
      table.boolean('premium').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('offers')
  }
}

module.exports = OfferSchema
