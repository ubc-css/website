// GitHub Pages answers any path without a matching file on disk with
// 404.html. The app renders fine from there, because the router reads the URL
// and shows the right page, but the response still carries a 404 status and
// search engines drop those pages. Only the homepage ends up indexed.
//
// Writing a real index.html at each route means Pages finds a file and
// answers 200, so /merch and friends can be indexed and linked normally.
//
// Routes are read out of App.tsx rather than listed here, so adding a page
// needs no change to this script.

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const source = await readFile(join(root, 'src', 'App.tsx'), 'utf8')
const paths = [...source.matchAll(/<Route\s[^>]*path="([^"]+)"/g)].map((m) => m[1])

// If the routes are ever restructured past what this pattern reads, fail the
// build rather than quietly shipping a site where nothing but / is indexable.
if (paths.length === 0) {
    throw new Error(
        'prerender: no <Route path="..."> found in src/App.tsx. If the routes ' +
            'moved, update this script — otherwise every page but the homepage ' +
            'deploys as a 404.',
    )
}

const html = await readFile(join(dist, 'index.html'), 'utf8')

// Still needed for paths that genuinely do not exist, and for any route added
// at runtime. The router shows whatever it resolves; only the status differs.
await writeFile(join(dist, '404.html'), html)

const written = []
for (const path of paths) {
    // '/' is already dist/index.html. Parameterised and wildcard routes cannot
    // be written out as fixed files.
    if (path === '/' || path.includes(':') || path.includes('*')) continue

    await mkdir(join(dist, path), { recursive: true })
    await writeFile(join(dist, path, 'index.html'), html)
    written.push(path)
}

console.log(`prerender: wrote 404.html and ${written.length} route(s): ${written.join(', ')}`)
