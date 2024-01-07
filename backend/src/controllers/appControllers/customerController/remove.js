const mongoose = require('mongoose');

const remove = async (Model, req, res) => {
  const { id } = req.params;

  const result = await Model.findOneAndDelete({ _id: id, removed: false }).exec();
  if (!result) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No customer found by this id: ' + id,
    });
  }
  return res.status(200).json({
    success: true,
    result,
    message: 'Successfully Deleted the customer by id: ' + id,
  });
};
module.exports = remove;