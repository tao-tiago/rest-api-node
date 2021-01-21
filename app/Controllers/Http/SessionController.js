'use strict'

const User = use('User')
class SessionController {

  async login({ request, response, auth }) {

    const { email, password } = request.all()

    try {

      const user = await User.findByOrFail({ email })
      const jwt = await auth.attempt(email, password)

      const userInfo = {
        dataUser: {
          id: user.id,
          name: user.name,
        }
      }

      return response.status(200).send({ jwt, data: userInfo })

    } catch(error) {

      return response.status(401).send({
        message: 'unauthorized'
      })

    }

  }

}

module.exports = SessionController
