# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CEMAJ (Comité Esperanza de Morena – Ciudad Juárez) is a static institutional one-page website for a political organization aligned with MORENA and Mexico's Fourth Transformation movement.

## Tech Stack

- **HTML5** semantic markup
- **CSS3** with custom properties (variables)
- **Vanilla JavaScript** (ES6+)
- **External CDNs**: Google Fonts (Playfair Display, Source Sans Pro), Font Awesome icons
- **No build tools or frameworks** - pure static files for easy hosting

## Project Structure

```
CEMAJ/
├── index.html          # Single-page structure with all sections
├── css/
│   └── styles.css      # All styles with CSS variables for theming
├── js/
│   └── main.js         # Interactivity (navbar, tabs, scroll animations)
└── assets/
    ├── logo-cemaj.png  # Logo with transparent background
    └── presidente.jpg  # President photo
```

## Development

Open `index.html` directly in a browser - no server required. For live reload during development, use any static server:

```bash
# Python
python -m http.server 8000

# Node.js (if npx available)
npx serve
```

## Color Palette (MORENA branding)

Defined as CSS variables in `styles.css`:
- `--color-guinda`: #8B1538 (primary)
- `--color-guinda-dark`: #6B102A
- `--color-dorado`: #C9A227 (accent gold)
- `--color-blanco`: #FFFFFF
- `--color-gris-claro`: #F5F5F5

## Key Sections in index.html

1. **Hero** - Split layout with logo left, content right, geometric background shapes
2. **¿Qué es CEMAJ?** - Description card with quote
3. **¿Qué hace CEMAJ?** - 6-card grid of activities
4. **Presidente** - Profile section with photo
5. **Misión/Visión/Valores** - Tabbed interface on dark background
6. **Redes Sociales** - Social media links (Facebook, Instagram, TikTok)
7. **Footer** - Links and branding

## Design Guidelines

This project uses the frontend-design skill. Key principles:
- **Aesthetic**: Refined institutional with modern touches
- **Typography**: Playfair Display (headings), Source Sans Pro (body)
- **Animations**: Intersection Observer for scroll reveals, CSS keyframes for floating/glow effects
- **Responsive**: CSS Grid/Flexbox, mobile-first breakpoints at 768px and 480px
