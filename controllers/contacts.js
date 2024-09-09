const Contact = require("../models/contacts");

const createContact = async (req, res) => {
  const { id } = req.user;
  try {
    const newContact = await Contact.create({ ...req.body, ownerId: id });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: newContact,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findOne({
      where: {
        id: id,
      },
    });
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

const getAllContacts = async (req, res) => {
  const { id } = req.user;
  try {
    const result = await Contact.findAll({
      where: {
        ownerId: id,
      },
    });
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const [updatedRows] = await Contact.update(body, {
      where: {
        id: id,
      },
    });

    if (!updatedRows) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found or not owned by user",
      });
    }
    const updatedContact = await Contact.findOne({
      where: { id: id },
    });

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        updatedContact,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Contact.destroy({
      where: {
        id: id,
      },
    });
    if (!deletedRows) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found or not owned by user",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
};

module.exports = {
  createContact,
  deleteContact,
  updateContact,
  getAllContacts,
  getContactById,
};
