import supertest from "supertest";
import { app } from "../../../app";

export const apiClient = supertest(app);
