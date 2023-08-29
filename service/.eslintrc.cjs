/* eslint-env node */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ["eslint:recommended"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        allowImportExportEverywhere:true,
    }
};
