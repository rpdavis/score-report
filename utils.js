export function loadExternalScripts(scripts) {
    return Promise.all(scripts.map(src => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Failed to load script ${src}`));
            document.body.appendChild(script);
        });
    }));
}
