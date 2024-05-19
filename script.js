require('dotenv').config();
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'auth_orderly'
    }
});

knex.schema.createTable('products', function (table) {
    table.string('productId').primary();
    table.string('name');
    table.float('price');
    table.float('discount');
    table.string('description');
    table.integer('quantity');
    table.integer('minimumQuantity');
    table.string('imagePaths');
    table.integer('numberOfRates');
    table.float('rate');
    table.string('reference');
    table.string('productGroupId');
    table.string('supplierId');
    table.string('supplierName');
    table.string('supplierProfileImage');
    table.string('supplierBio');

}).then(() => {
    return knex('products').insert([
        {
            productId: '1',
            name: 'Product 1',
            price: 100.00,
            discount: 10.00,
            description: 'This is product 1',
            quantity: 50,
            minimumQuantity: 10,
            imagePaths: '["https://firebasestorage.googleapis.com/v0/b/orderly-af56f.appspot.com/o/shoe.png?alt=media&token=12769230-ca75-4f0d-ab3e-776077329c64"]',
            numberOfRates: 5,
            rate: 4.5,
            reference: 'REF1',
            productGroupId: 'PG1',
            supplierId: 'SUP1',
            supplierName: 'Supplier 1',
            supplierProfileImage: 'https://firebasestorage.googleapis.com/v0/b/orderly-af56f.appspot.com/o/profile_pictures%2F1714769773232?alt=media&token=27992c88-f21b-43af-ae8d-71bf7979f4f6',
            supplierBio: 'In Our store you can find all the products you need.'
        },

        {
            productId: '2',
            name: 'Product 2',
            price: 200.00,
            discount: 20.00,
            description: 'This is product 2',
            quantity: 100,
            minimumQuantity: 20,
            imagePaths: '["https://firebasestorage.googleapis.com/v0/b/orderly-af56f.appspot.com/o/shoe.png?alt=media&token=12769230-ca75-4f0d-ab3e-776077329c64"]',
            numberOfRates: 10,
            rate: 4.0,
            reference: 'REF2',
            productGroupId: 'PG2',
            supplierId: 'SUP2',
            supplierName: 'Supplier 2',
            supplierProfileImage: 'https://firebasestorage.googleapis.com/v0/b/orderly-af56f.appspot.com/o/profile_pictures%2F1714769773232?alt=media&token=27992c88-f21b-43af-ae8d-71bf7979f4f6',
            supplierBio: 'In Our store you can find all the products you need.'

        },

        {
            productId: '3',
            name: 'Product 3',
            price: 300.00,
            discount: 30.00,
            description: 'This is product 3',
            quantity: 150,
            minimumQuantity: 30,
            numberOfRates: 15,
            rate: 3.5,
            reference: 'REF3',
            imagePaths: '["https://firebasestorage.googleapis.com/v0/b/orderly-af56f.appspot.com/o/shoe.png?alt=media&token=12769230-ca75-4f0d-ab3e-776077329c64"]',

            productGroupId: 'PG3',
            supplierId: 'SUP3',
            supplierName: 'Supplier 3',
            supplierProfileImage: 'https://firebasestorage.googleapis.com/v0/b/orderly-af56f.appspot.com/o/profile_pictures%2F1714769773232?alt=media&token=27992c88-f21b-43af-ae8d-71bf7979f4f6',
            supplierBio: 'In Our store you can find all the products you need.'
        },

        {
            productId: '4',
            name: 'Product 4',
            price: 400.00,
            discount: 40.00,
            description: 'This is product 4',
            quantity: 200,
            minimumQuantity: 40,
            numberOfRates: 20,
            rate: 3.0,
            reference: 'REF4',
            imagePaths: '["https://firebasestorage.googleapis.com/v0/b/orderly-af56f.appspot.com/o/shoe.png?alt=media&token=12769230-ca75-4f0d-ab3e-776077329c64"]',

            productGroupId: 'PG4',
            supplierId: 'SUP4',
            supplierName: 'Supplier 4',
            supplierProfileImage: 'https://firebasestorage.googleapis.com/v0/b/orderly-af56f.appspot.com/o/profile_pictures%2F1714769773232?alt=media&token=27992c88-f21b-43af-ae8d-71bf7979f4f6',
            supplierBio: 'In Our store you can find all the products you need.'
        },

        {
            productId: '5',
            name: 'Product 5',
            price: 500.00,
            discount: 50.00,
            description: 'This is product 5',
            quantity: 250,
            minimumQuantity: 50,
            numberOfRates: 25,
            rate: 2.5,
            imagePaths: '["https://firebasestorage.googleapis.com/v0/b/orderly-af56f.appspot.com/o/shoe.png?alt=media&token=12769230-ca75-4f0d-ab3e-776077329c64"]',

            reference: 'REF5',
            productGroupId: 'PG5',
            supplierId: 'SUP5',
            supplierName: 'Supplier 5',
            supplierProfileImage: 'https://firebasestorage.googleapis.com/v0/b/orderly-af56f.appspot.com/o/profile_pictures%2F1714769773232?alt=media&token=27992c88-f21b-43af-ae8d-71bf7979f4f6',
            supplierBio: 'In Our store you can find all the products you need.'
        }

    ]);
}).catch((err) => {
    console.error(err);
}).finally(() => {
    knex.destroy();
});