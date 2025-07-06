# Axiom UI

A modern user interface for the **Axiom** platform.

This project is built with **React**, **TypeScript**, and **Vite**.
We use [**shadcn/ui**](https://ui.shadcn.com/) as the component library and [**Lucide**](https://lucide.dev/) for icons.

---

## 🚀 Getting Started

First, install the project dependencies:

```bash
pnpm install
```

Then, start the development server:

```bash
npx vite --port=<port>
```

Replace `<port>` with your desired port number (e.g., `4000`).

---

## 🛠️ Environment Variables

To run the app correctly, create a `.env` file at the root of the project and define the following variables:

```env
VITE_GRAFANA_URL=https://grafana.example.com
VITE_OPENSHIFT_URL=https://console-openshift.example.com
```

> ⚠️ Vite requires all environment variables to be prefixed with `VITE_` in order to be exposed to the client-side code.
