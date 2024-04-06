const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 5000;

// connecting to db
var db = mongoose.connect("mongodb://127.0.0.1:27017/expensemanager");
db.then(() => {
  console.log("connected to mongodb");
}).catch((err) => {
  console.log(err);
});

app.use(cors());
app.use(express.json());

// requiring all routes
const accountRoutes = require("./routes/AccountRoutes");
const userRoutes = require("./routes/UserRoutes");
const rolesRoutes = require("./routes/RolesRouts");
const categoryRoutes = require("./routes/CategoryRoutes");
const subcategoryRoutes = require("./routes/SubCategoryRoutes");
const payeeRoutes = require("./routes/PayeeRoutes");
const transcationRoutes = require("./routes/TransactionRoutes");
const goalRoutes = require("./routes/GoalRoutes");
const groupRoutes = require("./routes/GroupRoutes");
const groupExpenseRoutes = require("./routes/GroupExpenseRoutes");
const sharedCategoryRoutes= require("./routes/SharedCategoryRoutes");
const UserCategory = require("./routes/UserCategoryRoutes")


// providing to server all routes
app.use("/accounts", accountRoutes);
app.use("/users", userRoutes);
app.use("/roles", rolesRoutes);
app.use("/categories", categoryRoutes);
app.use("/categories", subcategoryRoutes);
app.use("/usercategory", UserCategory);
app.use("/payees", payeeRoutes);
app.use("/transactions", transcationRoutes);
app.use("/goals", goalRoutes);
app.use("/groups", groupRoutes);
app.use("/groupexp", groupExpenseRoutes);
app.use("/shared-category", sharedCategoryRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
