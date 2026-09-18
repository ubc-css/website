// Every image under src/assets, keyed by its path, so pages can refer to one
// by path instead of adding an import line per photo. Vite still processes
// each file exactly as a normal import would (hashed filename, so a replaced
// graphic under the same name isn't served stale from cache).
//
// Glob patterns are case-sensitive, and phone photos often arrive as .JPG,
// hence the uppercase variants.
const images = import.meta.glob<string>(
    '../assets/**/*.{jpg,jpeg,png,webp,gif,avif,svg,JPG,JPEG,PNG}',
    { eager: true, import: 'default' },
)

/**
 * The URL for an image in src/assets, given its path from that folder:
 * `img('events/2025.26/robotparty1.jpg')`.
 *
 * Throws on a path that doesn't exist, so a typo breaks the page in dev
 * rather than quietly shipping a broken image.
 */
export function img(path: string): string {
    const src = images[`../assets/${path}`]
    if (!src) {
        throw new Error(`img(): no image at src/assets/${path}`)
    }
    return src
}
