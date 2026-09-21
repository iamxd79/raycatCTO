# Museum runtime

The Museum lives at `/museum`. The homepage is unchanged. Three.js is dynamically imported only by the Museum client component; React Three Fiber was not compatible with the installed React release.

## Collection

Run `node scripts/inventory-museum.cjs` after adding numbered artwork files to `public/image`. It preserves original files, hashes them for exact duplicates, extracts dimensions, generates 320px thumbnails and 1000px room WebPs, and writes `data/museumArtworks.json`. That file is the shared catalog for spatial and fallback modes. The inventory currently contains 100 distinct artworks. Dates are intentionally unknown; titles derive from filenames. Classification is provisional and can be refined using the registry generator.

## Controls

- Enter approaches the mansion, opens the doors, introduces RayCat, and proceeds into the hall.
- Scroll approaches artwork. Drag changes the viewing direction. Explore enables bounded WASD movement. Touch vertical dragging advances the camera.
- Rooms and the physical hall doors select wings. Collection locates all 100 works without loading their textures.
- Select artwork to inspect it. Arrow keys and Previous/Next navigate within its wing. Escape closes focus. View in Room returns to its wall.
- `/museum?room=digital` and `/museum?art=016` open shareable states.
- Three interactions with the owner's portrait reveal the treasury. The locked wing remains inaccessible. Clicking the Money Room wheel accelerates it briefly.
- Sound begins muted. Enabling it synthesizes a quiet mechanical hum.
- Settings selects auto/low/standard/cinematic render resolution and an accessible 2D mode. WebGL failure activates the fallback automatically. Add `&fallback=1` to a room URL to force it.

## Loading and cleanup

Only the current room's six works load. Low quality uses thumbnails; normal quality uses room derivatives. Focus uses the original through Next Image. Old room geometry, materials, and textures are disposed, including textures whose asynchronous loads finish after leaving the room. Surface textures are shared per color within each room. Reduced motion removes camera easing and entry animation.

## Validation

`node scripts/check-museum.cjs` uses installed Chrome to check entry, room navigation, focus navigation, direct links, catalog search, and mobile fallback. `npm run build` validates production compilation and TypeScript.

## Remaining visual work

The real-time interiors use procedural geometry and materials. They are a functional first implementation, not final art-direction quality: richer room-specific props, a proper animated RayCat cutout, bespoke sound effects, volumetric light and advanced shadows remain future refinements. The existing canonical PFP is used directly rather than inventing a new character.

The generated exterior is `public/museum/exterior.webp`, created with the built-in image generator from the brief: aged European collector's mansion at midnight, warm windows, dark oaks, damp approach, muted 35mm texture, no text or characters. Existing collection artwork was not regenerated.

## Hosting

The Sites project is registered in `.openai/hosting.json`. The local app remains standard Next.js with server-side StonkFun revalidation. Sites requires a Cloudflare-compatible server build; the normal `.next` output is not a deployable Sites artifact. Do not use a static export of the homepage, because that would freeze its live data.
