import Center from '../models/center.model.js';
import Major from '../models/major.model.js';
import MajorItem from '../models/majorItem.model.js';
import majorItemValid from '../validations/majorItem.valid.js';
import { Op } from 'sequelize';

export async function create(req, res) {
  try {
    let { error, value } = majorItemValid.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }
    let { majorItems, centerId } = value;

    let center = await Center.findByPk(centerId);
    if (!center) {
      return res.status(404).json({ message: 'Not found centerId.' });
    }

    if (center.seoId != req.user.id && req.user.role != 'ADMIN') {
      return res.status(401).json({ message: 'Not allowed.' });
    }

    for (let id of majorItems) {
      let major = await Major.findByPk(id);
      if (!major) {
        return res.status(400).json({ message: 'Not found major.' });
      }
    }

    for (let id of majorItems) {
      let majorItem = await MajorItem.findOne({
        where: { [Op.and]: [{ centerId }, { majorId: id }] },
      });
      if (majorItem) {
        return res.status(400).json({ message: 'This major already exists.' });
      }
    }

    for (let majorId of majorItems) {
      let majoritem = await MajorItem.create({ centerId, majorId });
    }

    res.status(201).json({ message: 'Created successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function remove(req, res) {
  try {
    let { error, value } = majorItemValid.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    let { centerId, majorItems } = req.body;

    let center = await Center.findByPk(centerId);
    if (!center) {
      return res.status(404).json({ message: 'Not found centerId.' });
    }

    if (
      center.seoId != req.user.id &&
      (req.user.role != 'ADMIN' || req.user.role != 'SUPERADMIN')
    ) {
      return res.status(401).json({ message: 'Not allowed.' });
    }

    for (let majorId of majorItems) {
      let del = await MajorItem.destroy({
        where: { [Op.and]: [{ centerId }, { majorId }] },
      });
      if (!del) {
        return res
          .status(404)
          .json({ message: 'Not found majorId in center.' });
      }
    }

    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
