const app = require("./config/server");

// Defines the listening door
app.listen(process.env.PORT, () => {
  console.log(`SERVER ON! ON ${process.env.PORT}`);
});
