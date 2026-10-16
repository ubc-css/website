// Shrinks oversized images in src/assets in place, so camera photos (often
// 5000px / 5-10 MB) don't make pages crawl. Run with `npm run compress-images`
// after adding new photos; images that are already small are left untouched,
// so it's safe to run any number of times.
//
// Each original is copied to ../website-original-images/ (next to the project
// folder, outside git) before it's overwritten, in case a full-size copy is
// ever needed again.
//
// Uses `sips`, the image tool built into macOS, so there's nothing to install.

import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readdirSync, renameSync, statSync, unlinkSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

// Same size as the 2025.26 photos: sharp on retina screens and in the
// full-size view, at roughly 300 KB a photo.
const MAX_EDGE = 1600
const JPEG_QUALITY = 80
// A JPEG already within MAX_EDGE but bigger than this still gets re-saved.
const MAX_JPEG_BYTES = 600 * 1024

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const assetsDir = join(root, 'src/assets')
const backupDir = join(root, '..', 'website-original-images')

if (process.platform !== 'darwin') {
    console.error('compress-images uses macOS\'s built-in `sips`, so it only runs on a Mac.')
    process.exit(1)
}

function* walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) yield* walk(path)
        else yield path
    }
}

function longEdge(path) {
    const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', path], { encoding: 'utf8' })
    const [width, height] = [...out.matchAll(/pixel(?:Width|Height): (\d+)/g)].map((m) => Number(m[1]))
    return Math.max(width, height)
}

const kb = (bytes) => `${Math.round(bytes / 1024).toLocaleString()} KB`

let before = 0
let after = 0
let count = 0

for (const path of walk(assetsDir)) {
    const isJpeg = /\.jpe?g$/i.test(path)
    const isPng = /\.png$/i.test(path)
    if (!isJpeg && !isPng) continue

    const size = statSync(path).size
    const edge = longEdge(path)
    const tooLarge = edge > MAX_EDGE
    // PNGs only get smaller by resizing; re-saving one at the same size
    // doesn't shrink it.
    if (!tooLarge && !(isJpeg && size > MAX_JPEG_BYTES)) continue

    const rel = relative(assetsDir, path)
    const backup = join(backupDir, rel)
    const backupExisted = existsSync(backup)
    if (!backupExisted) {
        mkdirSync(dirname(backup), { recursive: true })
        copyFileSync(path, backup)
    }

    // Write to a temp file and swap it in, so an interrupted run never
    // leaves a half-written image behind.
    const temp = `${path}.compressing`
    const args = []
    if (tooLarge) args.push('-Z', String(MAX_EDGE))
    if (isJpeg) args.push('-s', 'format', 'jpeg', '-s', 'formatOptions', String(JPEG_QUALITY))
    execFileSync('sips', [...args, path, '--out', temp], { stdio: 'ignore' })

    // An already well-optimized PNG can come out bigger once sips re-saves
    // it, so keep whichever file is smaller.
    const newSize = statSync(temp).size
    if (newSize >= size) {
        unlinkSync(temp)
        if (!backupExisted) unlinkSync(backup)
        continue
    }
    renameSync(temp, path)

    before += size
    after += newSize
    count++
    console.log(`${rel}: ${kb(size)} -> ${kb(newSize)}`)
}

if (count === 0) {
    console.log('All images are already compressed.')
} else {
    console.log(`\nCompressed ${count} image(s): ${kb(before)} -> ${kb(after)}`)
    console.log(`Originals saved in ${backupDir}`)
}
