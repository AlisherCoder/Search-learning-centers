import Center from "../models/center.model.js";
import User from "../models/user.model.js";
import queryValid from "../validations/query.valid.js";
import commentValid from "../validations/comment.valid.js";
import Comment from "../models/comment.model.js";

async function findAll(req, res) {
  try {
    let { error, value } = queryValid.validate(req.query);

    if (error) {
      return res.status(400).json({ data: error.details[0].message });
    }

    let page = value.page || 1;
    let limit = value.limit || 10;
    let offset = (page - 1) * limit;

    let allItems = await Comment.findAll({
      limit: limit,
      offset: offset,
      include: [User, Center],
    });

    let totalCount = await Comment.count();

    if (allItems) {
      res.status(200).json({ data: allItems, total: totalCount });
    } else {
      res.status(404).json({ message: "Comment not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req, res) {
  try {
    let { id } = req.params;
    let currentItem = await Comment.findByPk(id, {
      include: [User, Center],
    });

    if (currentItem) {
      res.status(200).json({ data: currentItem });
    } else {
      res.status(404).json({ message: "Comment not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function create(req, res) {
  try {
    let { error, value } = commentValid.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let currentItem = await Comment.create(value);
    res.status(201).json({ data: currentItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    let { error, value } = commentValid.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    let currentItem = await Comment.findByPk(id);

    if (!currentItem) {
      return res.status(404).json({ message: "Comment not found!" });
    }

    await currentItem.update(value);
    res.status(200).json({ data: currentItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    let currentItem = await Comment.findByPk(id);

    if (!currentItem) {
      return res.status(404).json({ message: "Comment not found!" });
    }

    await currentItem.destroy();
    res.status(200).json({ message: "Comment was deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, create, update, remove };
