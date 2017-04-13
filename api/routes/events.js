const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');
const mongojs = require('mongojs');
exports.register = function (server, options, next) {
    const db = server.app.db;
    server.route({
        method: 'GET',
        path: '/api/events',
        handler: function (request, reply) {

            db.events.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });

        }
    });

    server.route({
        method: 'GET',
        path: '/api/event/{id}',
        handler: function (request, reply) {

            db.events.findOne({
                _id: mongojs.ObjectId(request.params.id)
            }, (err, doc) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (!doc) {
                    return reply(Boom.notFound());
                }

                reply(doc);
            });

        }
    });

    server.route({
        method: 'GET',
        path: '/api/event/{id}/{seatid}/{seatowner}',
        handler: function (request, reply) {

            db.events.update({
                _id: mongojs.ObjectId(request.params.id),
                'seat.id': request.params.seatid
            }, {
                $set: {
                    'seat.$.isconfirm':true,
                    'seat.$.seatowner':request.params.seatowner
                }
            }, function (err, result) {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (result.n === 0) {
                    return reply(Boom.notFound());
                }

                reply(result).code(200);
            });
        }
    });
    server.route({
        method: 'PUT',
        path: '/api/event',
        handler: function (request, reply) {

            db.events.update({
                id: request.payload.id,
                'seat.id': request.payload.seatid
            }, {
                $set: {
                    'seat.$.isconfirm':request.payload.isconfirm,
                    'seat.$.seatowner':request.payload.seatowner
                }
            }, function (err, result) {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                if (result.n === 0) {
                    return reply(Boom.notFound());
                }

                reply(result).code(200);
            });
        },
        config: {
            validate: {
                payload: Joi.object({
                    id: Joi.string(),
                    seatid: Joi.string(),
                    isconfirm: Joi.boolean(),
                    seatowner: Joi.string()
                }).required()
            }
        }
    });
    

    return next();
};




exports.register.attributes = {
    name: 'routes-events'
};