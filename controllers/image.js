const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "13b27f1622434ec3bd7f798e3c18c4c1",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const imageHandlerPut = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => {
      res.status(400).json("unable to get entries");
    });
};

module.exports = {
  imageHandlerPut,
  handleApiCall,
};
