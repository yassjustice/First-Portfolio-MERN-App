export const funcNah = async (req, res) => {
  try {
    const lol = "Happy";
    if (!lol) {
      return res.status(404).json({ message: "Happy section not found" });
    }
    res.status(200).json(lol);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};