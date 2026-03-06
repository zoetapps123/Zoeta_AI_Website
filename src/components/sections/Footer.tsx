export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 md:px-12 lg:px-24 py-12 bg-surface-base">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="font-display font-bold text-lg tracking-[-0.03em] text-white/60">
          ZOETA<span className="text-gradient-cyan">.</span>
        </a>

        <div className="flex items-center gap-6 font-display text-sm text-white/30">
          <a
            href="mailto:zoetapps123@gmail.com"
            className="hover:text-cyan-400 transition-colors duration-300 focus-visible:outline-none focus-visible:text-cyan-400"
          >
            zoetapps123@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/piyushpps/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors duration-300 focus-visible:outline-none focus-visible:text-cyan-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>

        <p className="font-display text-xs text-white/20 tracking-wider">
          &copy; 2025 Zoeta AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
