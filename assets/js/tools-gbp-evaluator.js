// GBP Evaluator Tool

const checklistData = [
  { id: 'verified', text: 'Profile is verified', priority: 'high', tooltip: 'Verified profiles rank higher and build more trust', points: 10 },
  { id: 'complete-name', text: 'Business name matches real signage exactly', priority: 'high', tooltip: 'NAP consistency is crucial for rankings', points: 5 },
  { id: 'primary-category', text: 'Primary category is optimized for your main service', priority: 'high', tooltip: 'Primary category is the most important ranking factor', points: 8 },
  { id: 'additional-categories', text: 'All relevant additional categories added', priority: 'medium', tooltip: 'Add categories you truly qualify for', points: 4 },
  { id: 'description', text: 'Business description includes local keywords', priority: 'high', tooltip: 'First 250 characters matter most', points: 6 },
  { id: 'address', text: 'Address is accurate and consistent', priority: 'high', tooltip: 'Must match citations and website', points: 7 },
  { id: 'phone', text: 'Local phone number (not tracking number)', priority: 'high', tooltip: 'Use your actual local number', points: 5 },
  { id: 'website', text: 'Website link is working and goes to your site', priority: 'medium', tooltip: 'Should go to your homepage or location page', points: 3 },
  { id: 'hours', text: 'Business hours are accurate and complete', priority: 'medium', tooltip: 'Include special hours for holidays', points: 4 },
  { id: 'attributes', text: 'All applicable attributes are selected', priority: 'low', tooltip: 'Attributes like "veteran-owned" or "accepts credit cards"', points: 3 },
  { id: 'services', text: 'Services list is complete with descriptions', priority: 'medium', tooltip: 'Add all services you offer', points: 5 },
  { id: 'photos-recent', text: 'Recent photos added (within last month)', priority: 'high', tooltip: 'Fresh photos signal activity', points: 6 },
  { id: 'photos-sufficient', text: 'At least 20 photos total', priority: 'medium', tooltip: 'More photos = more engagement', points: 4 },
  { id: 'cover-photo', text: 'Cover photo is professional and optimized', priority: 'medium', tooltip: 'First thing customers see', points: 4 },
  { id: 'posts', text: 'Regular posts (at least weekly)', priority: 'high', tooltip: 'Posts show activity and improve rankings', points: 7 },
  { id: 'reviews-response', text: 'All reviews have responses', priority: 'high', tooltip: 'Response rate affects rankings', points: 8 },
  { id: 'reviews-count', text: '25+ reviews', priority: 'high', tooltip: 'Review quantity is a major ranking factor', points: 8 },
  { id: 'qa', text: 'Q&A section has at least 5 questions seeded', priority: 'medium', tooltip: 'Control the narrative with seeded Q&A', points: 3 },
  { id: 'appointment', text: 'Booking/appointment link if applicable', priority: 'low', tooltip: 'Reduces friction for conversions', points: 3 },
  { id: 'messaging', text: 'Messaging enabled and monitored', priority: 'medium', tooltip: 'Another conversion path', points: 4 }
];

document.addEventListener('DOMContentLoaded', function() {
  const checklistItemsEl = document.getElementById('checklistItems');
  const form = document.getElementById('gbpForm');

  if (!checklistItemsEl || !form) return;

  checklistData.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'form-group';
    itemEl.style.borderLeft = `4px solid ${item.priority === 'high' ? 'var(--accent)' : item.priority === 'medium' ? '#f39c12' : 'var(--secondary)'}`;
    itemEl.style.paddingLeft = '1rem';
    itemEl.style.marginBottom = '1rem';

    itemEl.innerHTML = `
      <label style="display: flex; align-items: center; cursor: pointer;">
        <input type="checkbox" name="checklist" value="${item.id}" style="margin-right: 0.5rem; width: auto;">
        <span>${item.text}</span>
        <span style="margin-left: 0.5rem; color: var(--text-light); cursor: help;" title="${item.tooltip}">ⓘ</span>
      </label>
      <small style="color: var(--text-medium);">${item.priority.toUpperCase()} priority</small>
    `;

    checklistItemsEl.appendChild(itemEl);
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateGBPResults();
  });
});

function calculateGBPResults() {
  const checkedItems = Array.from(document.querySelectorAll('input[name="checklist"]:checked')).map(cb => cb.value);

  let totalPoints = 0;
  let earnedPoints = 0;

  checklistData.forEach(item => {
    totalPoints += item.points;
    if (checkedItems.includes(item.id)) {
      earnedPoints += item.points;
    }
  });

  const score = Math.round((earnedPoints / totalPoints) * 100);

  const missingItems = checklistData.filter(item => !checkedItems.includes(item.id));

  document.getElementById('checklistSection').classList.add('hidden');
  document.getElementById('resultsSection').classList.remove('hidden');

  displayGBPResults(score, missingItems);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function displayGBPResults(score, missingItems) {
  const scoreEl = document.getElementById('gbpScore');
  const scoreLabelEl = document.getElementById('gbpScoreLabel');
  const scoreCircle = document.getElementById('gbpScoreCircle');

  scoreEl.textContent = score;
  scoreCircle.style.setProperty('--score', score);

  if (score >= 90) {
    scoreLabelEl.textContent = 'Excellent! Your GBP is well-optimized';
    scoreLabelEl.style.color = 'var(--secondary)';
  } else if (score >= 70) {
    scoreLabelEl.textContent = 'Good, with room for improvement';
    scoreLabelEl.style.color = 'var(--primary)';
  } else if (score >= 50) {
    scoreLabelEl.textContent = 'Needs work to be competitive';
    scoreLabelEl.style.color = '#f39c12';
  } else {
    scoreLabelEl.textContent = 'Critical gaps to address';
    scoreLabelEl.style.color = 'var(--accent)';
  }

  const actionsEl = document.getElementById('gbpActions');
  actionsEl.innerHTML = '';

  const sortedByPriority = missingItems.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  if (sortedByPriority.length === 0) {
    actionsEl.innerHTML = '<p>Great job! You\'ve completed all checklist items.</p>';
  } else {
    sortedByPriority.forEach(item => {
      const actionEl = document.createElement('div');
      actionEl.className = `checklist-item priority-${item.priority}`;
      actionEl.innerHTML = `
        <div class="priority-badge">${item.priority.toUpperCase()}</div>
        <strong>${item.text}</strong>
        <p style="margin-top: 0.5rem; font-size: 0.9rem;">${item.tooltip}</p>
      `;
      actionsEl.appendChild(actionEl);
    });
  }

  const quickWinsEl = document.getElementById('quickWins');
  quickWinsEl.innerHTML = '';

  const quickWinItems = sortedByPriority.filter(item =>
    ['complete-name', 'hours', 'website', 'attributes', 'cover-photo'].includes(item.id)
  ).slice(0, 3);

  if (quickWinItems.length > 0) {
    quickWinItems.forEach((item, index) => {
      const winEl = document.createElement('div');
      winEl.className = 'card';
      winEl.innerHTML = `
        <h4>Day ${index + 1}-${index + 2}: ${item.text}</h4>
        <p>${item.tooltip}</p>
      `;
      quickWinsEl.appendChild(winEl);
    });
  } else {
    quickWinsEl.innerHTML = '<p>You\'ve completed all the quick wins! Focus on ongoing optimization.</p>';
  }

  const roadmapEl = document.getElementById('roadmap');
  roadmapEl.innerHTML = '';

  const roadmapPhases = [
    {
      title: 'Week 1: Foundation',
      items: missingItems.filter(item => ['verified', 'complete-name', 'primary-category', 'address', 'phone'].includes(item.id))
    },
    {
      title: 'Week 2: Content',
      items: missingItems.filter(item => ['description', 'services', 'photos-sufficient', 'cover-photo'].includes(item.id))
    },
    {
      title: 'Week 3: Engagement',
      items: missingItems.filter(item => ['posts', 'qa', 'reviews-response'].includes(item.id))
    },
    {
      title: 'Week 4: Optimization',
      items: missingItems.filter(item => ['additional-categories', 'attributes', 'messaging', 'photos-recent', 'appointment'].includes(item.id))
    }
  ];

  roadmapPhases.forEach(phase => {
    if (phase.items.length > 0) {
      const phaseEl = document.createElement('div');
      phaseEl.className = 'card';
      phaseEl.innerHTML = `
        <h4>${phase.title}</h4>
        <ul>
          ${phase.items.map(item => `<li>${item.text}</li>`).join('')}
        </ul>
      `;
      roadmapEl.appendChild(phaseEl);
    }
  });

  if (roadmapEl.children.length === 0) {
    roadmapEl.innerHTML = '<p>Excellent! Your GBP is complete. Focus on maintaining freshness with weekly posts and prompt review responses.</p>';
  }
}
