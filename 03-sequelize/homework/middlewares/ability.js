const { Router } = require('express');
const { Ability, Character } = require('../db');
const router = Router();

router.post("/", async (req, res) => {
    const { name, description, mana_cost } = req.body;
    try {
      if (name && mana_cost && description) {
        const ability = await Ability.create({
          name,
          description,
          mana_cost,
        });

        res.status(201).send(ability);
      } else {
        res.status(404).send("Falta enviar datos obligatorios");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  /*
  PUT /ability/setCharacter
  Recibirá por body idAbility y codeCharacter y deberá asociarlos a partir 
  del modelo de Ability y devolver el objeto de habilidad con name, description, 
  mana_cost y CharacterCode.
  */
  
  router.put("/setCharacter", async (req, res) => {
    const {codeCharacter, idAbility } = req.body;
    try {
      const character = await Character.findByPk(codeCharacter);
      console.log(character.toJSON())
      //  nacho | playa       |   4 |  null
      const result = await character.addAbility(idAbility);
      // :: :: :: character.addAbility(idAbility) <-- donde creamos relaciones
      res.status(201).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = router;