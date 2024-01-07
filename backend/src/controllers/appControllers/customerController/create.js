const mongoose = require('mongoose');

const Customer = mongoose.model('Customer');

const create = async (Model, req, res) => {
  // Creating a new document in the collection
  let { phone } = req.body;



  const existingPhone = await Customer.findOne({ phone: phone });

  if (!isVietnamPhoneNumber(phone)) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Số điện thoại không hợp lệ.',
    });
  }

  if (existingPhone) {
    return res.status(400).json({
      success: false,
      result: null,
      message: `Số điện thoại ${phone} đã tồn tại. Vui lòng nhập số điện thoại khác.`,
    });
  }

  req.body.removed = false;
  const result = await new Model(req.body).save();

  // Returning successfull response
  return res.status(200).json({
    success: true,
    result,
    message: 'Successfully Created the document in Model ',
  });
};

const isVietnamPhoneNumber = (phone) => {

  const regex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;

  return regex.test(phone);

}

module.exports = create;
