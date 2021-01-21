'use strict'

const Offer = use('Offer')

class OfferController {

  async index ({ response, request }) {

    const { web } = request.only(['web'])

    try {

      const offer = (web)
        ? await Offer.query()
          .where({'status': true})
          .orderBy('premium', 'DESC').fetch()
        : await Offer.query()
          .orderBy('id', 'ASC').fetch()

      response.status(200).send(offer)

    } catch (error) {

      response.status(400).send({
        message: 'Erro ao listar conteúdo'
      })

    }

  }

  async store ({ request, response }) {

    const data = request.only([
      'advertiser', 'url', 'description', 'starts', 'ends', 'premium'
    ])

    try {

      const offer = await Offer.create(data)
      response.status(200).send(offer)

    } catch (error) {

      response.status(400).send({
        message: 'Erro ao criar conteúdo'
      })

    }

  }

  async show ({ params, response }) {

    const { id } = params

    try {

      const offer = await Offer.findByOrFail({ id })
      response.status(200).send(offer)

    } catch (error) {

      response.status(400).send({
        Message: 'Erro ao exibir conteúdo'
      })

    }

  }

  async update ({ params, request, response }) {

    const { id } = params
    const data = request.only([
      'advertiser', 'url', 'description', 'status', 'starts', 'ends', 'premium'
    ])

    try {

      const offer = await Offer.findByOrFail({ id })
      offer.merge(data)

      await offer.save()

      response.status(200).send(offer)

    } catch (error) {

      response.status(400).send({
        message: 'Erro ao atualizar conteúdo'
      })

    }

  }

  async destroy ({ params, response }) {

    const { id } = params

    try {

      const offer = await Offer.findByOrFail({ id })
      offer.delete()

      response.status(200).send({
        message: 'Conteúdo excluído com sucesso!'
      })

    } catch (error) {

      response.status(400).send({
        message: 'Erro ao excluir conteúdo!'
      })

    }

  }

}

module.exports = OfferController
