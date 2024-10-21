const openAIService = require('../services/openAIService');

const getWineDescription = async (req, res) => {
    const code = req.body.code;
    const brand = req.body.brand;
    const name = req.body.name;

    if (!code || !brand || !name) {
        return res.status(404).send("Error");
    }
    try {
        console.log("AI started for wine: " + name);
        const wine = {
            code: req.body.code,
            brand: req.body.brand,
            name: req.body.name
        }

        const result = await openAIService.makeAIRequest(wine);
        if (result) {
            res.status(200);
            res.send(result);
        } else {
            res.status(501).send("AI Error");
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500);
        res.send("Server Error");
    }

};

module.exports = { getWineDescription };