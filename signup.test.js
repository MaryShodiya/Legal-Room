const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
const { default: test } = require("node:test");



test('name', ()=> {
    expect(validator.name).toBeDefined();
})