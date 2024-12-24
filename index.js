const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/restaurants", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Referer: "https://www.swiggy.com/",
        },
        params: {
          lat: req.query.lat,
          lng: req.query.lng,
          page_type: "DESKTOP_WEB_LISTING",
        },
      }
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
