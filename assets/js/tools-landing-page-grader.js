// Landing Page Grader Tool

const essentialElements = [
  { value: 'clear-service', name: 'Clear service/value proposition', weight: 10 },
  { value: 'location-name', name: 'Location name in heading', weight: 10 },
  { value: 'nap-visible', name: 'Visible NAP', weight: 10 },
  { value: 'primary-cta', name: 'Primary CTA above fold', weight: 10 },
  { value: 'service-list', name: 'Service list', weight: 8 },
  { value: 'proof', name: 'Proof elements', weight: 9 },
  { value: 'faqs', name: 'FAQs section', weight: 7 },
  { value: 'nearby-areas', name: 'Nearby areas mentioned', weight: 8 },
  { value: 'internal-links', name: 'Internal links', weight: 7 },
  { value: 'schema', name: 'Schema markup', weight: 8 },
  { value: 'unique-content', name: 'Unique content', weight: 9 },
  { value: 'images', name: 'Local images', weight: 4 }
];

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('pageGraderForm');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    gradePage();
  });

  document.getElementById('copyOutline')?.addEventListener('click', function() {
    const outline = document.getElementById('recommendedOutline').innerText;
    navigator.clipboard.writeText(outline).then(() => {
      alert('Outline copied to clipboard!');
    });
  });
});

function gradePage() {
  const checkedElements = Array.from(document.querySelectorAll('input[name="element"]:checked')).map(cb => cb.value);

  let totalWeight = 0;
  let earnedWeight = 0;

  essentialElements.forEach(element => {
    totalWeight += element.weight;
    if (checkedElements.includes(element.value)) {
      earnedWeight += element.weight;
    }
  });

  const percentage = (earnedWeight / totalWeight) * 100;

  let grade, label, color;
  if (percentage >= 90) {
    grade = 'A';
    label = 'Excellent! Page is well-optimized for local search.';
    color = 'var(--secondary)';
  } else if (percentage >= 80) {
    grade = 'B';
    label = 'Good page with minor improvements needed.';
    color = 'var(--primary)';
  } else if (percentage >= 70) {
    grade = 'C';
    label = 'Decent but needs significant improvements.';
    color = '#f39c12';
  } else if (percentage >= 60) {
    grade = 'D';
    label = 'Page needs major optimization work.';
    color = 'var(--accent)';
  } else {
    grade = 'F';
    label = 'Page is missing critical elements.';
    color = '#dc3545';
  }

  document.getElementById('inputSection').classList.add('hidden');
  document.getElementById('resultsSection').classList.remove('hidden');

  const gradeEl = document.getElementById('pageGrade');
  gradeEl.textContent = grade;
  gradeEl.style.color = color;

  document.getElementById('gradeLabel').textContent = label;

  const missingElements = essentialElements.filter(el => !checkedElements.includes(el.value));

  const missingEl = document.getElementById('missingElements');
  missingEl.innerHTML = '';

  if (missingElements.length === 0) {
    missingEl.innerHTML = '<p>None! Your page has all essential elements.</p>';
  } else {
    missingElements.sort((a, b) => b.weight - a.weight).forEach(element => {
      const itemEl = document.createElement('div');
      itemEl.className = 'checklist-item';
      itemEl.innerHTML = `<strong>• ${element.name}</strong>`;
      missingEl.appendChild(itemEl);
    });
  }

  displayRecommendedOutline();
  displayCopySuggestions(checkedElements);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function displayRecommendedOutline() {
  const outline = `
<strong>Recommended Page Structure:</strong>

1. HERO SECTION (Above Fold)
   • H1: [Service] in [Location]
   • Value proposition (1-2 sentences)
   • Primary CTA (Call Now button + phone number)

2. SERVICE OVERVIEW
   • Brief introduction to services
   • Bullet list of services offered
   • Why choose us (2-3 key differentiators)

3. SERVICE AREA & COVERAGE
   • "[Location] and Surrounding Areas"
   • List nearby neighborhoods/cities served
   • Embedded Google Map (optional)

4. PROOF & TRUST
   • Customer reviews/testimonials
   • Years in business / credentials
   • Photos of work/team
   • Industry certifications

5. HOW IT WORKS / PROCESS
   • 3-4 step process
   • What customers can expect
   • Timeline if applicable

6. LOCAL FAQS
   • 5-8 common questions
   • Include location-specific questions
   • Schema markup for FAQs

7. CLOSING CTA
   • Strong call to action
   • Phone number
   • Contact form
   • Service area statement

8. FOOTER
   • NAP information
   • Links to other location pages
   • Links to service pages
  `;

  document.getElementById('recommendedOutline').innerHTML = `<pre style="white-space: pre-wrap; font-family: inherit;">${outline}</pre>`;
}

function displayCopySuggestions(checkedElements) {
  const suggestions = [];

  if (!checkedElements.includes('clear-service')) {
    suggestions.push({
      title: 'Add Clear Value Proposition',
      text: 'Start with a clear statement of what you do and for whom. Example: "Professional [Service] for [Location] homes and businesses since [Year]. Fast response, quality work, fair prices."'
    });
  }

  if (!checkedElements.includes('location-name')) {
    suggestions.push({
      title: 'Include Location in H1',
      text: 'Your H1 should include both your service and location. Example: "HVAC Repair in Corona, CA" or "Corona HVAC Services"'
    });
  }

  if (!checkedElements.includes('nearby-areas')) {
    suggestions.push({
      title: 'Add "Areas We Serve" Section',
      text: 'List nearby cities and neighborhoods. Example: "Proudly serving Corona, Norco, Eastvale, Temescal Valley, and surrounding Riverside County communities."'
    });
  }

  if (!checkedElements.includes('proof')) {
    suggestions.push({
      title: 'Add Social Proof',
      text: 'Include customer testimonials, review count, years in business, or credentials. Example: "500+ satisfied customers" or "Licensed, Bonded & Insured since 2010"'
    });
  }

  if (!checkedElements.includes('faqs')) {
    suggestions.push({
      title: 'Create Local FAQ Section',
      text: 'Answer common questions with local context. Example: "Do you serve my area in Corona?" or "What are typical response times in Riverside?"'
    });
  }

  const suggestionsEl = document.getElementById('copySuggestions');
  suggestionsEl.innerHTML = '';

  if (suggestions.length === 0) {
    suggestionsEl.innerHTML = '<p>Great job! Your page includes all key copy elements.</p>';
  } else {
    suggestions.forEach(suggestion => {
      const suggestionEl = document.createElement('div');
      suggestionEl.className = 'card';
      suggestionEl.innerHTML = `
        <h4>${suggestion.title}</h4>
        <p>${suggestion.text}</p>
      `;
      suggestionsEl.appendChild(suggestionEl);
    });
  }
}
