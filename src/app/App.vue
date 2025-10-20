<template>
  <main class="flex min-h-screen flex-col items-center justify-center px-6 py-16">
    <div
      class="w-full max-w-xl space-y-8 rounded-3xl border border-slate-800/80 bg-slate-900/40 p-10 shadow-[0_20px_60px_-30px_rgba(16,185,129,0.55)] backdrop-blur"
    >
      <header class="space-y-4 text-center">
        <p class="text-sm uppercase tracking-[0.4em] text-emerald-400/80">mr. meal check</p>
        <h1 class=" text-amber-200 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Monitor meals with clarity
        </h1>
        <p class="text-base text-slate-300/90">
          Build balanced menus, track nutritional targets, and collaborate with your crew using a modular
          Vue + Tailwind toolkit.
        </p>
      </header>

      <div class="flex flex-col gap-3 border-t border-slate-800/60 pt-6 sm:flex-row sm:items-center sm:justify-center">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        >
          Get started
        </button>

        <button
          type="button"
          class="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500/80 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200/60"
        >
          View docs
        </button>
      </div>
    </div>
  </main>
</template>
