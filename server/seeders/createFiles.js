import fs from "fs";
import path from "path";

const filesToCreate = [
  "controllers/userController.js",
  "controllers/heroController.js",
  "controllers/aboutController.js",
  "controllers/interestController.js",
  "controllers/projectController.js",
  "controllers/contactController.js",

  "routes/userRoutes.js",
  "routes/heroRoutes.js",
  "routes/aboutRoutes.js",
  "routes/interestRoutes.js",
  "routes/projectRoutes.js",
  "routes/contactRoutes.js",

  "middleware/authenticate.js",
  "middleware/validateRequest.js",

  "config/db.js",

  "utils/hashPassword.js",
];

// Create each file if it does not exist
filesToCreate.forEach((filePath) => {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, ""); // Create empty file
    console.log(`Created: ${filePath}`);
  } else {
    console.log(`Already exists: ${filePath}`);
  }
});

console.log("✅ All required files are in place!");
