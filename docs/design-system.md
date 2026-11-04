# Hommio Design System

## Visual direction

Inspired by the supplied Givingli business-gifting reference: warm paper surfaces, espresso ink, soft denim blue accents, rounded forms, generous whitespace, and friendly direct typography. This is an original Hommio token set and component implementation, not a copy of the reference site.

## Design tokens

Tokens are centralized in `src/styles/tokens.css` and should be used in components instead of raw repeated values.

| Category | Tokens |
| --- | --- |
| Color | `--color-canvas`, `--color-paper`, `--color-paper-soft`, `--color-ink`, `--color-muted`, `--color-line`, `--color-blue`, `--color-blue-light`, `--color-sage`, `--color-rose` |
| Typography | `--font-sans`, `--font-display`, `--font-mono`, `--text-xs` through `--text-3xl` |
| Spacing | `--space-1` through `--space-20` using a 4px base |
| Shape | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-pill` |
| Effect | `--shadow-soft`, `--shadow-raised`, `--focus-ring`, `--ease-standard` |

## Component conventions

- Every component has one folder in `components/ui/<ComponentName>/` with `index.jsx` and `style.css`.
- Shared component styles consume tokens; avoid local duplicate color, radius, spacing, and focus values.
- Components expose semantic props for variants and states, and keep content composable through children where appropriate.
- Interactive controls use native elements, labels, keyboard focus, and accessible state attributes.
- Import components from `components/ui` via the barrel file.

## Component catalog

| Component | Purpose / key props |
| --- | --- |
| Button | Primary, dark, secondary, and ghost actions; `variant`, `size` |
| Badge | Compact status or category; `tone` |
| Card | Content surface; `tone`, optional `hover` class |
| Avatar | Initials or image; `name`, `src`, `size` |
| Input | Labeled single-line field; `label`, `hint`, `error` |
| Select | Labeled native select; `label`, `options` |
| Textarea | Labeled, resizable multi-line input |
| Checkbox | Labeled native checkbox |
| Switch | Boolean preference control |
| Tabs | Pill tab navigation with selected state |
| SegmentedControl | Compact mutually exclusive choice |
| Progress | Bounded progress bar; `value`, `label` |
| Divider | Horizontal separator, optional label |
| SectionHeading | Eyebrow, title, and supporting copy; `align` |
| StatCard | Metric, optional trend, optional blue surface |
| GiftCard | Branded gift preview; `brand`, `amount`, `tone` |
| FeatureCard | Numbered feature with icon, description, link |
| TestimonialCard | Quote, rating, and person attribution |
| StepList | Ordered progress steps; `steps`, `current` |
| LogoCloud | Trusted-company wordmarks; `logos` |

## Preview

Run `npm install` and `npm run dev`, then open `/` for the Hommio homepage or `/playground` for the component library. The playground shows every exported component, variants, form states, token swatches, and type/spacing/radius references.
