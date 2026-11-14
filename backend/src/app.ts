import { existsSync } from "node:fs";
import path from "node:path";
import cookieParser from "cookie-parser";
import express from "express";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { allergiesRoutes } from "./modules/allergies/allergies.routes.js";
import { animalsRoutes } from "./modules/animals/animals.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { healthRoutes } from "./modules/health/health.routes.js";
import {
  animalMedicalRecordsRoutes,
  medicalRecordsRoutes,
} from "./modules/medical-records/medical-records.routes.js";
import { usersRoutes } from "./modules/users/users.routes.js";
import {
  dueVaccinationsRoutes,
  vaccinationsRoutes,
} from "./modules/vaccinations/vaccinations.routes.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
// Before animalsRoutes, whose owner guard catches everything else under /api/animals
app.use("/api/animals/:id", vaccinationsRoutes);
app.use("/api/animals/:id", animalMedicalRecordsRoutes);
app.use("/api/animals/:id", allergiesRoutes);
app.use("/api/animals", animalsRoutes);
app.use("/api/medical-records", medicalRecordsRoutes);
app.use("/api/vaccinations", dueVaccinationsRoutes);


const publicDir = path.resolve(process.cwd(), "public");
const indexFile = path.join(publicDir, "index.html");

// Neznane API poti morajo vrniti 404.
app.use("/api", notFoundHandler);

// V produkciji Express streže tudi React aplikacijo.
if (existsSync(indexFile)) {
  app.use(express.static(publicDir));

  // React Router ureja poti na strani odjemalca.
  app.get("/{*splat}", (_req, res) => {
    res.sendFile(indexFile);
  });
}

app.use(notFoundHandler);
app.use(errorHandler);
