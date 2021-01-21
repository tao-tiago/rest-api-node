'use strict'

const User = use('User')

class UserController {

  // Admin (via rota)
  async index({ response }){

    const user = await User.query().fetch()
    response.status(200).send(user)

  }

  // Público
  async store ({ request, response }) {

    const data = request.only([
      'name',
      'email',
      'password'
    ])

    try {

      const user = await User.create(data)

      return response.status(200).send(user)

    } catch (error) {

      return response.status(400).send({
        message: 'Erro ao criar novo usuário'
      })

    }

  }

  async show ({ response, params }) {

    try {

      const user_id = params.id
      const user = await User.findOrFail(user_id)

      response.status(200).send(user)

    } catch (error) {

      response.status(404).send({
        message: 'Usuário não encontrado!'
      })

    }

  }

  async update ({ request, response, auth }) {

    const { data } = request.only([
      'name',
      'email',
      'password',
    ])

    try {

      const user_id = auth.user.id
      const user = await User.findOrFail(user_id)
      user.merge(data)

      await user.save()

      return response.status(200).send(user)

    } catch (error) {

      response.status(400).send({
        message: 'Erro ao atualizar usuário!'
      })

    }

  }

  async destroy({ response, auth }){

    try {

      const user_id = auth.user.id
      const user = await User.findOrFail(user_id)

      user.delete()

      response.status(200).send({
        message: 'Usuário deletado com sucesso!'
      })

    } catch (error) {

      response.status(400).send({
        message: 'Erro ao deletar usuário!'
      })

    }

  }

}

module.exports = UserController
