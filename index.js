const express = require("express");
const app = express();

app.use(express.json());

const API_KEY = "SECRET123";

const licenses = {
  "CLOUD-123": {
    placeId: 123456789,
    expires: "2027-01-01"
  }
};

app.post("/verify", (req, res) => {
  const clientKey = req.headers["x-api-key"];

  if (clientKey !== API_KEY) {
    return res.status(403).json({ valid: false });
  }

  const { key, placeId } = req.body;

  const license = licenses[key];

  if (!license) return res.json({ valid: false });
  if (license.placeId !== placeId) return res.json({ valid: false });
  if (new Date(license.expires) < new Date()) return res.json({ valid: false });

  res.json({ valid: true });
});

app.listen(10000, () => console.log("API running"));
