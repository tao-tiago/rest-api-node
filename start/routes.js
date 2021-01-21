'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Nothing here' }
})

// Session
Route.post('session', 'SessionController.login')

// Offer
Route.resource('offers', 'OfferController')
  .apiOnly()
  .middleware(['auth'])
