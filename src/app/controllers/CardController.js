import Card from '../models/Card';

class CardController {
  async store(req, res) {
    const { title, content, idUser } = req.body;

    const card = await Card.create({
      id_user: idUser,
      title,
      content,
    });
    return res.json(card);
  }

  async index(req, res) {
    const id_user = req.userId;
    const cards = await Card.findAll({ where: { id_user } });

    return res.json(cards);
  }

  async show(req, res) {
    const { card } = req;

    return res.json(card);
  }

  async update(req, res) {
    const { title, content } = req.body;
    const { card } = req;

    card.title = title;
    card.content = content;

    await card.save();
    return res.json(card);
  }

  async delete(req, res) {
    const { card } = req;

    await card.destroy();
    const cards = await Card.findAll();

    return res.json(cards);
  }
}

export default new CardController();
