#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = __importDefault(require("../src/options"));
const setup_1 = __importDefault(require("../src/setup"));
(async () => {
    await (0, setup_1.default)();
    await (0, options_1.default)();
})();
