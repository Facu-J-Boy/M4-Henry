const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

// POST /character
// Debe recibir por body los datos del modelo de Character y crear una instancia del mismo en la base de datos.

// De no recibir todos los parámetros necesarios debería devolver un status 404 con el mensaje "Falta enviar datos obligatorios" 
// Si alguna validación interna de la base de datos falle debe devolver un status 404 con el mensaje "Error en alguno de los datos provistos"
// Si todos los datos son provistos debera devolver un status 201 y el objeto del personaje

router.post('/', async (req, res) => {
    const {code, name, age, race, hp, mana, date_added} = req.body;
    if(!code || !name || !hp || !mana) {
        return res.status(404).send( "Falta enviar datos obligatorios" );
    }
    try {
        const character = {code, name, age, race, hp, mana, date_added};
        const newCharacter = await Character.create(character);
        return res.status(201).json(newCharacter);
    } catch (error) {
        res.status(404).send("Error en alguno de los datos provistos");
    }
})

// GET /character
// Debe retornar todos los personajes que se encuentren creados en la base de datos. Además este endpoint debe aceptar por query un valor de una raza para filtrar los resultados, por ejemplo: GET /character?race=human

router.get('/', async (req, res) => {
    const value = req.query.race;
    try {
        if(!race) {
            const characters = await Character.findAll();
            return res.status(200).send(characters);
        } else {
            const character = await Character.findOne({where: {race: value}});
            return res.status(200).send(character);
        }
    } catch (error) {
        return res.status(400).send(error);
    }
});

/*
GET /characters/ability/:code
Crearemos otro endpoint para obtener todos los datos del personajes pero 
incluyendo también la información asociada a sus abilities. 
Por ejemplo debería devolver algo así:
 Character  -- >  incluya --> INCLUDE      JOIN
33 Jesus y todas sus Ability
*/

router.get("/ability/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const character_and_abilities = await Character.findAll({
      where: {
        code: id,
      },
      include: [
        {
          model: Ability,
        },
      ],
    });
    return res.status(400).json(character_and_abilities);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/*
PUT /character/:attribute?value=...
Vamos a crear un PUT el cual va a recibir un atributo como param y un 
value como query y deberá modificar todos los valores de dicho atributo 
con el valor dado para todas las instancias de personajes que existan en 
la base de datos y cuyo valor de ese atributo sea null.
​
Es decir si se hace un request PUT a /character/age?value=40 deberá 
buscar todos los personajes cuya edad sea null y a esos reemplazarlos 
por el valor 40.
​
Devolver simplemente un mensaje que diga 'Personajes actualizados'
*/

router.put("/:attribute", async (req, res) => {
  const { attribute } = req.params;
  const { value } = req.query;
  try {
    await Character.update(
      { [attribute]: value },
      {
        where: {
          [attribute]: null,
        },
      }
    );
    res.status(200).send("se realizò la actualizaciòn de los campos null");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;