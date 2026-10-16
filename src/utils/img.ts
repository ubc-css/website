// Every image under src/assets, keyed by its path, so pages can refer to one
// by path instead of adding an import line per photo. Vite still processes
// each file exactly as a normal import would (hashed filename, so a replaced
// graphic under the same name isn't served stale from cache).
//
// Glob patterns are case-sensitive, and phone photos often arrive as .JPG,
// hence the uppercase variants.
const images = import.meta.glob<string>(
    '../assets/**/*.{jpg,jpeg,png,webp,gif,avif,svg,JPG,JPEG,PNG,WEBP,GIF,AVIF,SVG}',
    { eager: true, import: 'default' },
)

// Lookup ignores upper/lowercase: macOS doesn't care, but the Linux machine
// that builds the deploy does, so a .JPG/.jpg slip used to work locally and
// then blank the page (or fail the deploy). Keys still come from the real
// filenames, so this resolves the same file everywhere.
const imagesByLowercasePath = new Map<string, string>()
for (const [key, src] of Object.entries(images)) {
    const lowercaseKey = key.toLowerCase()
    if (imagesByLowercasePath.has(lowercaseKey)) {
        throw new Error(`img(): two images differ only in upper/lowercase: ${key}`)
    }
    imagesByLowercasePath.set(lowercaseKey, src)
}

/**
 * The URL for an image in src/assets, given its path from that folder:
 * `img('events/2025.26/robotparty1.jpg')`. Upper/lowercase doesn't matter.
 *
 * Throws on a path that doesn't exist, so a typo breaks the page in dev
 * rather than quietly shipping a broken image.
 */
export function img(path: string): string {
    const src = imagesByLowercasePath.get(`../assets/${path}`.toLowerCase())
    if (!src) {
        throw new Error(`img(): no image at src/assets/${path}`)
    }
    return src
}
