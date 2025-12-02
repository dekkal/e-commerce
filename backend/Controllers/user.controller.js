const User = require("./../models/user.model");




const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ message: "updated user", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find().sort({ createdAt: -1 });
    const filteredUsers = allUsers.filter((u) => u.role !== "admin");
    res.status(200).json(filteredUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { updateUser, deleteUser,getUserById ,getUsers};
