window.FORGE_TEMPLATES = window.FORGE_TEMPLATES || {};

window.detectForgeTemplate = function(prompt) {
    if (!window.FORGE_TEMPLATES) return null;
    const lower = prompt.toLowerCase();
    for (const [key, tmpl] of Object.entries(window.FORGE_TEMPLATES)) {
        if (tmpl.keywords && tmpl.keywords.some(kw => {
            const regex = new RegExp(`\\b${kw}\\b`, 'i');
            return regex.test(lower);
        })) {
            return { key, ...tmpl };
        }
    }
    return null;
};

window.LARAVEL_ARCHITECTURE = `- NO TALKING. NO GUIDANCE. NO ROADMAPS. NO TUTORIALS.
- COMMAND: GENERATE [FILE: path] followed by FULL CODE content.
- CRITICAL: DO NOT GENERATE 'artisan' file (It causes server boot failures without vendor).
- STANDALONE MODE: Ensure 'public/index.php' works WITHOUT any dependencies.
- ARCHITECTURE: Laravel 10 + Blade + Tailwind.
- BEHAVIOR: DO NOT TALK. OUTPUT FILES WITH CODE ONLY.
- BEHAVIOR: DO NOT LIST DIRECTORIES. DO NOT TALK. OUTPUT FILES WITH CODE ONLY.
- MANDATORY: You MUST generate '.env.example', 'public/index.php', and 'routes/web.php' FIRST.
`;
