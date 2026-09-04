# Mustafa Tariq — Portfolio Direction

## Three directions considered

### Theme Name: Graphite Systems
Very dark, gallery-like interface with quiet technical diagrams, precise typography, and small electric lime signals. It feels like a private engineering studio rather than a public template.
**Probability:** 0.07

### Theme Name: Mineral Ledger
Warm paper, ink, oxidized copper, and architectural spacing. A tactile editorial resume that treats software systems as crafted infrastructure and lets content carry the authority.
**Probability:** 0.03

### Theme Name: Signal / Afterimage
A high-contrast charcoal canvas with amber highlights, soft scanline texture, and restrained motion that references observability dashboards without becoming cyberpunk. It feels modern, exact, and slightly cinematic.
**Probability:** 0.09

## Chosen direction: Mineral Ledger

### Design Movement
Contemporary Swiss editorialism blended with industrial design publishing: strong typographic hierarchy, asymmetric composition, material contrast, and information treated as an artifact.

### Core Principles
1. **Content earns the spotlight.** The resume is the product; decoration exists to frame the work, not compete with it.
2. **Warm precision.** Pair a mineral paper field with ink-black type and one ownable copper accent to feel expensive without feeling ornamental.
3. **Asymmetry creates confidence.** Use a persistent left rail, offset content blocks, and editorial breaks instead of centered marketing sections.
4. **Motion behaves like a physical object.** Reveal, hover, and scroll interactions should be short, tactile, and purposeful.

### Color Philosophy
The base is a sun-warmed mineral (#E8E4DC) rather than sterile white. Deep graphite (#171716) provides authority and reading contrast. A singular oxidized copper (#B56B46) marks active states, links, and the 3D object, giving the interface a recognizable signature without resorting to neon.

### Layout Paradigm
A fixed desktop left rail anchors navigation and availability while the main column behaves like a long-form case file. Hero copy sits beside a floating technical object, then sections alternate between wide narrative bands and compact data panels. On mobile, the rail becomes a thin utility header and the editorial flow remains intact.

### Signature Elements
- A copper wireframe orb / lattice that responds subtly to pointer movement and acts as a visual index of systems thinking.
- Small monospaced metadata labels with hairline rules, page markers, and “field notes” around primary content.
- Dark graphite project tiles that reveal an amber/copper edge on hover, like a folder being pulled from a shelf.

### Interaction Philosophy
Interactions should feel like handling a well-made instrument: clear hit areas, immediate press feedback, no gratuitous scroll hijacking, and motion that maintains spatial continuity. External links are explicit and keyboard focus remains visibly outlined.

### Animation
Use opacity and transforms only. Entrance reveals stagger by 45–70ms and remain under 280ms. The orb uses a gentle low-frequency drift and pointer parallax, disabled under reduced-motion preferences. Project rows lift by 4px with a copper rule transition; nav states snap quickly rather than easing slowly.

### Typography System
Display: **DM Serif Display** for section titles and the name, used sparingly with editorial scale. Body: **IBM Plex Sans** for readable paragraphs and UI. Metadata: **IBM Plex Mono** in uppercase with letter spacing. Use italic serif only for short emphasis, never for utility labels.

### Brand Essence
Mustafa Tariq turns complex product requirements into dependable full-stack systems, for teams that value rigor, speed, and clean ownership.
Personality: **exact, composed, resourceful**.

### Brand Voice
Headlines are declarative and specific. CTAs are invitations to inspect or connect, not hype. Microcopy is concise, calm, and evidence-led.

Example lines:
- “Systems that hold their shape under pressure.”
- “Inspect the work →”

### Wordmark & Logo
Use an abstract “MT” monogram built from two offset graphite strokes and one copper junction, suggesting a system diagram rather than a literal initial lockup. The mark should stand alone in the rail and favicon.

### Signature Brand Color
Oxidized Copper — `#B56B46`.

## Style Decisions
- Avoid default portfolio tropes: no purple gradients, no glassmorphism stacks, no oversized centered hero copy, no testimonial filler.
- Keep the page feeling like an editorial engineering dossier: asymmetric, tactile, restrained.
- Use the 3D accent as a compositional index, not as a full-screen gimmick.

## Style Decisions
- Desktop rail is the primary asymmetrical anchor; keep the MT mark, navigation, and availability metadata persistent in the live layout.
- Repeat the MT monogram in the hero or footer so identity is not carried by text alone.
- Treat project tiles as graphite dossier folders with stronger copper edge cues and metadata hierarchy.

## Revision: Signal / Afterimage

The Mineral Ledger direction is superseded for this revision. The new system references observability consoles, oscilloscope traces, and dark-room instrument panels without using a cyberpunk neon palette.

The canvas becomes ink-black with a faint blue-black field, warm white type, and a single amber signal color. Typography moves to a condensed grotesk for display labels paired with a humanist sans for reading. The hero is no longer a still object: it is a live Three.js field of nodes, signal paths, and afterimage trails that reacts to pointer movement, gently drifts on its own, and collapses to a static CSS fallback when motion is reduced.

The layout keeps the asymmetric rail but makes it feel like a monitoring console: section markers, live status, coordinate labels, and measured rules. Project cards become dark instrument panels with animated signal bars and a clear amber “inspect” state. Motion is the differentiator: fast hover responses, low-frequency ambient drift, and one memorable hero field rather than many unrelated effects.
