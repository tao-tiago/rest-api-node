'use strict'

const User = use('User')

class UserSeeder {
  async run () {

    // Criando usuário principal
    await User.create({
      "name": "Admin",
      "email": "admin@admin.com",
      "password": "admin"
    })

  }
}

module.exports = UserSeeder
