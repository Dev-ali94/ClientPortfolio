import Contact from "../models/ContactModel.js";

export const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!email || !name || !message) {
      return res.json({
        success: false,
        message: "Name, email and message are required",
      });
    }
    // Validate name
    if (name.length < 3 || name.length>30) {
      return res.json({
        success: false,
        message: "Name must be between 3 to 30 characters long",
      });
    }
    if (/(.)\1{4,}/.test(name)) {
      return res.json({
        success: false,
        message: "Name contains too many repeated characters",
      });
    }
    // Validate email (only Gmail)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    if (!emailRegex.test(email)) {
      return res.json({
        success: false,
        message: "Only Gmail addresses are allowed (must end with @gmail.com)",
      });
    }

    // Validate message
    if (message.length < 10 || message.length > 500 ) {
      return res.json({
        success: false,
        message: "Message must be between 10 to 500 characters long",
      });
    }
    if (/(.)\1{4,}/.test(message)) {
      return res.json({
        success: false,
        message: "Message contains too many repeated characters",
      });
    }
    // save user when no mistake
    const contact = new Contact({
       name, 
       email,
       message
       });
    await contact.save()
    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if contact exists
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.json({
        success: false,
        message: "Contact not found",
      });
    }
    // Delete contact
    await Contact.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Delete contact error:", error.message);
    res.json({
      success: false,
      message: "Error deleting contact",
    });
  }
};
export const getAllContact = async (req, res) => {
  try {
    const contact = await Contact.find().sort({ createdAt: -1 }); 
    res.json({
      success: true,
      count: contact.length,
      contactdata:contact,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};