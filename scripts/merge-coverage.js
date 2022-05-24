#!/usr/bin/env node

const fs = require("fs-extra");
const { execSync } = require("child_process");

const REPORTS_FOLDER = "coverage-report";
const FINAL_OUTPUT_FOLDER = "coverage";

const run = (commands) => {
    commands.forEach((command) => {
        execSync(command, { stdio: "inherit" });
    });
};

fs.emptyDirSync(REPORTS_FOLDER);
fs.copyFileSync(
    "cypress-coverage/coverage-final.json",
    `${REPORTS_FOLDER}/from-cypress.json`
);
fs.copyFileSync(
    "coverage/coverage-final.json",
    `${REPORTS_FOLDER}/from-jest.json`
);

fs.emptyDirSync(".nyc_output");
fs.emptyDirSync(FINAL_OUTPUT_FOLDER);

run([
    `nyc merge ${REPORTS_FOLDER} && mv coverage.json .nyc_output/out.json`,
    `nyc report --reporter lcov --report-dir ${FINAL_OUTPUT_FOLDER}`,
]);
