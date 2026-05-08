import FlexSearch from 'flexsearch';

let index = null;
let documents = [];

export function initSearch(sections) {
    // Create index
    index = new FlexSearch.Document({
        document: {
            id: "id",
            index: ["title", "content"],
            store: ["title", "id"]
        },
        tokenize: "forward",
        context: true
    });

    // Populate index
    Object.entries(sections).forEach(([id, html]) => {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        const title = temp.querySelector('h1')?.innerText || id;
        const content = temp.innerText.replace(/\s+/g, ' ');
        
        const doc = { id, title, content };
        documents.push(doc);
        index.add(doc);
    });

    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            resultsContainer.classList.add('hidden');
            return;
        }

        const results = index.search(query, { limit: 5, enrich: true });
        displayResults(results, resultsContainer);
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.add('hidden');
        }
    });
}

function displayResults(results, container) {
    if (!results || results.length === 0 || results[0].result.length === 0) {
        container.innerHTML = '<div class="search-result-item">No matches found for architectural query.</div>';
        container.classList.remove('hidden');
        return;
    }

    container.innerHTML = '';
    container.classList.remove('hidden');

    // FlexSearch results are grouped by field
    const seenIds = new Set();
    
    results.forEach(fieldResult => {
        fieldResult.result.forEach(item => {
            if (seenIds.has(item.id)) return;
            seenIds.add(item.id);

            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.innerHTML = `
                <div class="search-result-title">${item.doc.title}</div>
                <div class="search-result-snippet">Navigate to section ${item.id.replace(/-/g, ' ')}</div>
            `;
            div.onclick = () => {
                window.showSection(item.id);
                document.getElementById('searchInput').value = '';
                container.classList.add('hidden');
            };
            container.appendChild(div);
        });
    });
}
