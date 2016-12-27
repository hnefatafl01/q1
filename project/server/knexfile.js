// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'http://localhost:3000/'
  },

  production: {
    client: 'pg',
    connection: {
      database: 'gitfit',
    }
  }
};
