/********************************************************************************
 *  WEB322 – Assignment 04
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Sujit Khadka Student ID: 137630232  Date: 07/03/2025
 *
 *  Published URL
 *
 ********************************************************************************/

const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, "/public")));

const projectData = require("./modules/projects");

app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;

  if (sector) {
    projectData
      .getProjectsBySector(sector)
      .then((projects) => {
        if (projects.length > 0) {
          res.render("projects", { projects: projects });
        } else {
          res.status(404).render("404", {
            message: `No projects found for the sector: "${sector}".`,
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching projects by sector:", err);
        res.status(404).render("404", {
          message:
            "An error occurred while retrieving projects for the specified sector.",
        });
      });
  } else {
    projectData
      .getAllProjects()
      .then((projects) => {
        if (projects.length > 0) {
          res.render("projects", { projects: projects });
        } else {
          res
            .status(404)
            .render("404", { message: "No projects found in the database." });
        }
      })
      .catch((err) => {
        console.error("Error fetching all projects:", err);
        res.status(404).render("404", {
          message: "An error occurred while retrieving all projects.",
        });
      });
  }
});

app.get("/solutions/projects/:id", (req, res) => {
  const id = parseInt(req.params.id);

  projectData
    .getProjectById(id)
    .then((project) => {
      res.render("project", { project: project });
    })
    .catch((err) => {
      res
        .status(404)
        .render("404", { message: "Project not found with the specified ID." });
    });
});

projectData
  .initialize()
  .then(() => {
    console.log("Project data initialized");
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Initialization Error", error);
    process.exit(1);
  });
