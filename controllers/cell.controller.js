const { request, response } = require('express');
const Cell = require('../models/cell.model');
module.exports.createCell = (request,response) =>{
    const {name,province,city,neighborhood,address,users} = request.body;
    Cell.create({
        name,province,city,neighborhood,address,users
    })
    .then(user => response.json(user))
    .catch(err => response.status(400).json(err));
}

// Obtener todas las provincias con sus ciudades
exports.getAllCells = (_, res) => {
    Cell.find({})
        .then(cells => {
            res.json(cells);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || "Ocurrió un error al obtener las células."
            });
        });
};
exports.getCellsByProvince = (request, res) => {
    Cell.find({province:request.params.province})
        .then(cells => {
            res.json(cells);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || "Ocurrió un error al obtener las células por provincia."
            });
        });
};

exports.getCellsByCity = (request, res) => {
    Cell.find({province:request.params.province,city:request.params.city})
        .then(cells => {
            res.json(cells);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || "Ocurrió un error al obtener las células por ciudad."
            });
        });
};

exports.getCellsByNeighborhood = (request, res) => {
    Cell.find({province:request.params.province , city:request.params.city ,neighborhood:request.params.neighborhood})
        .then(cells => {
            res.json(cells);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || "Ocurrió un error al obtener las células por barrio."
            });
        });
};

exports.updateCell= (request, response) =>{ 
    Cell.findOneAndUpdate({_id:request.params.id}, request.body, {new:true})
    .then(
        
        updatedCell=>response.json(updatedCell)


        ) 
    .catch(err=>response.json(err)) 
} 
