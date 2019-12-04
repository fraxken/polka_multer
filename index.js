"use strict";

require("make-promises-safe");

// Require Node.js Dependencies
const { randomBytes } = require("crypto");
const { unlink, readFile } = require("fs").promises;
const { join } = require("path");

// Require Third-party Dependencies
const polka = require("polka");
const multer = require("multer");
const send = require("@polka/send-type");
const mimeTypes = require("mime-types");
const sharp = require("sharp");

// CONSTANTS
const kAvatarDir = join(__dirname, "avatars");
const kTempDir = join(__dirname, "temp");

// Configure multer
const upload = multer({
    dest: kTempDir,
    limits: {
        fileSize: 1024
    }
});

function onError(error, req, res) {
    console.error(error);
    const message = error instanceof Error ? error.message : toString(error);

    send(res, 500, { error: message });
}

const app = polka({ onError });

const router = polka();

router.post("/avatar", upload.single("avatar"), async (req, res) => {
    try {
        if (!req.file) {
            return send(res, 401, { error: "Please provide an image!" });
        }
        const fileExt = mimeTypes.extension(req.file.mimetype);
        const fileName = `${randomBytes(8).toString("hex")}.${fileExt}`;

        try {
            const buf = await readFile(req.file.path);
            await sharp(buf).resize(88, 88).toFile(join(kAvatarDir, fileName));
        }
        finally {
            await unlink(req.file.path);
        }

        send(res, 201);
    }
    catch (error) {
        onError(error, req, res);
    }
});

app.use("/api", router);

app.listen(1337, () => {
    console.log("HTTP Server started on localhost:1337");
});
