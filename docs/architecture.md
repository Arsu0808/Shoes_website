## Salon Web App Architecture Overview

### Tech Stack
- **Framework**: React 18 with Vite tooling.
- **Styling**: CSS Modules + global design tokens defined via CSS custom properties.
- **Routing**: `react-router-dom` for client-side navigation.
- **Animations**: `framer-motion`.
- **State Management**: React Context for theme + session mock (auth/loyalty placeholders).

### Directory Layout (`src`)
- `assets/`: imagery, icons, background videos.
- `components/`
  - `layout/`: `Navbar`, `Footer`, `PageShell`, `StickyBookButton`, `ThemeToggle`.
  - `sections/`: page-specific sections (Hero, ServicesGrid, Testimonials, etc.).
  - `cards/`: reusable card UI (ServiceCard, StaffCard, ReviewCard, OfferCard).
  - `forms/`: booking + auth form controls.
  - `common/`: buttons, chips, badge, rating, carousel wrapper.
- `context/`: `ThemeContext`, `SessionContext`.
- `data/`: JSON-like modules for services, staff, gallery, testimonials, offers.
- `hooks/`: custom hooks (e.g. `useMediaQuery`, `useCarousel`, `useBookingForm`).
- `pages/`: route-level components (Home, Services, Booking, About, Gallery, Contact, Auth, Profile).
- `styles/`: `globals.css`, `tokens.css`, animation helpers.
- `utils/`: helpers for formatting duration/currency, filtering services, mock API.

### Global Styling Strategy
- Define color palette (pastel primary, accent, neutrals) + typography scale in `tokens.css`.
- Use CSS variables for both light/dark, toggled in `body[data-theme]`.
- Apply `Poppins`, fallback to `Inter`/`Lato`; load via Google Fonts in `index.css`.
- Provide utility classes for grid layouts + responsive spacing system.

### Routing Flow
```
/
├─ /services
├─ /booking
├─ /about
├─ /gallery
├─ /contact
├─ /login
└─ /profile
```
- `PageShell` wraps all routes: handles `Navbar`, `Footer`, `Outlet`, theme toggle, sticky CTA.

### Data + State
- Static data modules supply content; can be replaced with API later.
- Booking flow managed by `useBookingForm` hook; final step shows confirmation.
- Session context mocks auth + loyalty data; store in `localStorage` for persistence.
- Dark/light preference saved in `localStorage`.

### Advanced Feature Placeholders
- **Auth**: simple form toggling login/signup, storing user profile in context.
- **Profile Page**: shows upcoming/past bookings, loyalty points, saved services from context.
- **Saved Services**: toggled via `ServiceCard` heart icon.

### Animation Guidelines
- Use `framer-motion` for hero reveals, section fade/slide, service card hover effects.
- Smooth scroll behavior for nav links; sticky booking button with subtle pulse on mobile.

### Responsive Considerations
- Mobile-first breakpoints at 640px, 768px, 1024px, 1280px.
- Sticky bottom bar on mobile with booking CTA + quick contact.
- Grid layouts collapse into swipeable carousels on small screens (via CSS scroll snap).

### Implementation Order
1. Global styles + theme context + layout shell.
2. Static data + common components (buttons/cards).
3. Home page sections.
4. Services filtering and details modals.
5. Booking flow + confirmation.
6. Remaining pages (About, Gallery, Contact).
7. Auth/profile + loyalty interactions.

