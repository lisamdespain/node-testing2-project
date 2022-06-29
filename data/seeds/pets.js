/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pets').del()
  await knex('pets').insert([
    {name: 'Lucky', type: 'dog', gender: 'male'},
    {name: 'Princess', type: 'cat', gender: 'female'},
    {name: 'Snowball', type: 'cat', gender: 'male'},
    {name: 'Mabel', type: 'dog', gender: 'female'},
  ]);
};
