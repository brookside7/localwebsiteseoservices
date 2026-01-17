// Instant Local SEO Audit Tool

let currentStep = 1;
const totalSteps = 4;
let auditData = {};

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('auditForm');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (!form) return;

  nextBtn.addEventListener('click', function() {
    if (currentStep < totalSteps) {
      if (validateCurrentPanel()) {
        saveCurrentPanelData();
        currentStep++;
        updateWizard();

        if (currentStep === totalSteps) {
          calculateAndShowResults();
        }
      }
    }
  });

  prevBtn.addEventListener('click', function() {
    if (currentStep > 1) {
      currentStep--;
      updateWizard();
    }
  });

  document.getElementById('emailForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    console.log('Email report to:', email);

    const successMsg = document.createElement('div');
    successMsg.className = 'alert alert-success';
    successMsg.textContent = 'Report sent! Check your email.';
    this.insertAdjacentElement('afterend', successMsg);
    this.reset();

    setTimeout(() => successMsg.remove(), 5000);
  });

  document.getElementById('printReport')?.addEventListener('click', function() {
    window.print();
  });

  document.getElementById('downloadReport')?.addEventListener('click', function() {
    const reportHTML = generateReportHTML();
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `local-seo-audit-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  });
});

function updateWizard() {
  document.querySelectorAll('.wizard-step').forEach(step => {
    const stepNum = parseInt(step.dataset.step);
    step.classList.remove('active', 'completed');
    if (stepNum === currentStep) {
      step.classList.add('active');
    } else if (stepNum < currentStep) {
      step.classList.add('completed');
    }
  });

  document.querySelectorAll('.wizard-panel').forEach(panel => {
    const panelNum = parseInt(panel.dataset.panel);
    panel.classList.remove('active');
    if (panelNum === currentStep) {
      panel.classList.add('active');
    }
  });

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';

  if (currentStep === totalSteps) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = currentStep === totalSteps - 1 ? 'Calculate Score' : 'Next';
  }
}

function validateCurrentPanel() {
  const currentPanel = document.querySelector(`.wizard-panel[data-panel="${currentStep}"]`);
  const requiredFields = currentPanel.querySelectorAll('[required]');

  let allValid = true;

  requiredFields.forEach(field => {
    if (field.type === 'radio') {
      const radioGroup = currentPanel.querySelectorAll(`[name="${field.name}"]`);
      const checked = Array.from(radioGroup).some(radio => radio.checked);
      if (!checked) {
        allValid = false;
      }
    } else if (!field.value.trim()) {
      allValid = false;
      field.style.borderColor = 'var(--accent)';
    } else {
      field.style.borderColor = '';
    }
  });

  if (!allValid) {
    alert('Please fill in all required fields.');
  }

  return allValid;
}

function saveCurrentPanelData() {
  const currentPanel = document.querySelector(`.wizard-panel[data-panel="${currentStep}"]`);
  const inputs = currentPanel.querySelectorAll('input, select, textarea');

  inputs.forEach(input => {
    if (input.type === 'radio') {
      if (input.checked) {
        auditData[input.name] = input.value;
      }
    } else {
      auditData[input.name] = input.value;
    }
  });
}

function calculateAndShowResults() {
  document.getElementById('loadingState').style.display = 'block';
  document.getElementById('resultsState').classList.add('hidden');

  setTimeout(() => {
    const scores = calculateScores(auditData);
    displayResults(scores);

    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('resultsState').classList.remove('hidden');
  }, 1500);
}

function calculateScores(data) {
  const scores = {
    localEntityClarity: 0,
    websiteFundamentals: 0,
    contentCoverage: 0,
    gbpReadiness: 0,
    trustSignals: 0
  };

  scores.gbpReadiness += data.hasGBP === 'yes' ? 30 : (data.hasGBP === 'unverified' ? 15 : 0);

  const reviewCount = parseInt(data.reviewCount) || 0;
  if (reviewCount >= 100) scores.gbpReadiness += 20;
  else if (reviewCount >= 50) scores.gbpReadiness += 15;
  else if (reviewCount >= 25) scores.gbpReadiness += 10;
  else if (reviewCount >= 10) scores.gbpReadiness += 5;

  scores.localEntityClarity += data.napConsistency === 'yes' ? 30 : (data.napConsistency === 'mostly' ? 15 : 0);
  scores.localEntityClarity += data.hasLocationPages === 'yes' ? 20 : 0;

  scores.websiteFundamentals += data.hasHTTPS === 'yes' ? 20 : 0;
  scores.websiteFundamentals += data.mobileSpeed === 'fast' ? 20 : (data.mobileSpeed === 'medium' ? 10 : 0);
  scores.websiteFundamentals += data.hasMetaTags === 'yes' ? 20 : (data.hasMetaTags === 'some' ? 10 : 0);
  scores.websiteFundamentals += data.hasSchema === 'yes' ? 20 : 0;

  scores.contentCoverage += data.hasBlog === 'active' ? 30 : (data.hasBlog === 'inactive' ? 10 : 0);
  scores.contentCoverage += data.hasLocationPages === 'yes' ? 20 : 0;

  scores.trustSignals += reviewCount >= 50 ? 30 : (reviewCount >= 25 ? 20 : (reviewCount >= 10 ? 10 : 0));
  scores.trustSignals += data.napConsistency === 'yes' ? 20 : 0;

  const gbpNormalized = Math.min(100, (scores.gbpReadiness / 50) * 100);
  const localNormalized = Math.min(100, (scores.localEntityClarity / 50) * 100);
  const webNormalized = Math.min(100, (scores.websiteFundamentals / 80) * 100);
  const contentNormalized = Math.min(100, (scores.contentCoverage / 50) * 100);
  const trustNormalized = Math.min(100, (scores.trustSignals / 50) * 100);

  const overall = Math.round((gbpNormalized + localNormalized + webNormalized + contentNormalized + trustNormalized) / 5);

  return {
    overall,
    categories: {
      'GBP Readiness': Math.round(gbpNormalized),
      'Local Entity Clarity': Math.round(localNormalized),
      'Website Fundamentals': Math.round(webNormalized),
      'Content Coverage': Math.round(contentNormalized),
      'Trust Signals': Math.round(trustNormalized)
    },
    raw: scores
  };
}

function displayResults(scores) {
  const overallScoreEl = document.getElementById('overallScore');
  const scoreLabelEl = document.getElementById('scoreLabel');
  const scoreCircle = document.getElementById('scoreCircle');

  overallScoreEl.textContent = scores.overall;
  scoreCircle.style.setProperty('--score', scores.overall);

  if (scores.overall >= 80) {
    scoreLabelEl.textContent = 'Excellent Local SEO Foundation';
    scoreLabelEl.style.color = 'var(--secondary)';
  } else if (scores.overall >= 60) {
    scoreLabelEl.textContent = 'Good Foundation, Room for Improvement';
    scoreLabelEl.style.color = 'var(--primary)';
  } else if (scores.overall >= 40) {
    scoreLabelEl.textContent = 'Needs Improvement';
    scoreLabelEl.style.color = '#f39c12';
  } else {
    scoreLabelEl.textContent = 'Critical Issues to Address';
    scoreLabelEl.style.color = 'var(--accent)';
  }

  const categoryScoresEl = document.getElementById('categoryScores');
  categoryScoresEl.innerHTML = '';

  Object.entries(scores.categories).forEach(([category, score]) => {
    const categoryEl = document.createElement('div');
    categoryEl.className = 'score-category';
    categoryEl.innerHTML = `
      <strong>${category}</strong>
      <div style="font-size: 1.5rem; color: var(--primary); margin: 0.5rem 0;">${score}/100</div>
      <div class="score-bar">
        <div class="score-bar-fill" style="width: ${score}%;"></div>
      </div>
    `;
    categoryScoresEl.appendChild(categoryEl);
  });

  const topActions = generateTopActions(auditData, scores);
  const topActionsEl = document.getElementById('topActions');
  topActionsEl.innerHTML = '';

  topActions.forEach((action, index) => {
    const actionEl = document.createElement('div');
    actionEl.className = `card priority-${action.priority}`;
    actionEl.innerHTML = `
      <div class="priority-badge">${action.priority.toUpperCase()} PRIORITY</div>
      <h4>${index + 1}. ${action.title}</h4>
      <p>${action.description}</p>
      <p><strong>Expected Impact:</strong> ${action.impact}</p>
    `;
    topActionsEl.appendChild(actionEl);
  });
}

function generateTopActions(data, scores) {
  const actions = [];

  if (data.hasGBP !== 'yes') {
    actions.push({
      priority: 'high',
      title: 'Claim and Verify Your Google Business Profile',
      description: 'Your GBP is the single most important local SEO asset. Claim, verify, and fully optimize your profile immediately.',
      impact: '+30-40 points in Local SEO score, immediate Map Pack eligibility'
    });
  }

  const reviewCount = parseInt(data.reviewCount) || 0;
  if (reviewCount < 25) {
    actions.push({
      priority: 'high',
      title: 'Implement Review Generation System',
      description: 'You need more reviews to compete. Set up systematic review requests after service completion.',
      impact: '+20-30 points, higher Map Pack rankings, increased conversion'
    });
  }

  if (data.napConsistency !== 'yes') {
    actions.push({
      priority: 'high',
      title: 'Fix NAP Consistency',
      description: 'Inconsistent Name, Address, Phone data confuses search engines and hurts rankings. Audit and clean up all citations.',
      impact: '+15-25 points in Local Entity Clarity'
    });
  }

  if (data.hasLocationPages !== 'yes') {
    actions.push({
      priority: 'medium',
      title: 'Create Location/Service Area Pages',
      description: 'Build dedicated pages for each location or service area you target. Include local content and schema.',
      impact: '+10-20 points, better rankings for geo-specific searches'
    });
  }

  if (data.hasHTTPS !== 'yes') {
    actions.push({
      priority: 'high',
      title: 'Enable HTTPS',
      description: 'Google requires HTTPS. This is a ranking factor and trust signal.',
      impact: '+10-15 points, required for modern SEO'
    });
  }

  if (data.hasSchema !== 'yes') {
    actions.push({
      priority: 'medium',
      title: 'Add Schema Markup',
      description: 'Implement LocalBusiness and Service schema to help Google understand your business.',
      impact: '+10-15 points, rich results eligibility'
    });
  }

  if (data.mobileSpeed === 'slow') {
    actions.push({
      priority: 'high',
      title: 'Improve Mobile Site Speed',
      description: 'Most local searches happen on mobile. Slow sites lose rankings and customers.',
      impact: '+15-20 points in Website Fundamentals'
    });
  }

  if (data.hasBlog !== 'active') {
    actions.push({
      priority: 'low',
      title: 'Start Content Marketing',
      description: 'Regular content builds topical authority and creates opportunities for local keyword targeting.',
      impact: '+10-15 points over time, more traffic'
    });
  }

  actions.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return actions.slice(0, 3);
}

function generateReportHTML() {
  const scores = calculateScores(auditData);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Local SEO Audit Report - ${auditData.businessName}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
    h1 { color: #0066cc; }
    .score { font-size: 3rem; color: #0066cc; font-weight: bold; text-align: center; margin: 30px 0; }
    .category { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; }
    .action { margin: 20px 0; padding: 15px; border-left: 4px solid #ff6b35; background: #fff; }
    .high { border-left-color: #ff6b35; }
    .medium { border-left-color: #f39c12; }
    .low { border-left-color: #00a86b; }
  </style>
</head>
<body>
  <h1>Local SEO + AI Readiness Audit Report</h1>
  <p><strong>Business:</strong> ${auditData.businessName}</p>
  <p><strong>Website:</strong> ${auditData.domain}</p>
  <p><strong>Location:</strong> ${auditData.city}</p>
  <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>

  <div class="score">${scores.overall}/100</div>

  <h2>Category Scores</h2>
  ${Object.entries(scores.categories).map(([cat, score]) => `
    <div class="category">
      <strong>${cat}:</strong> ${score}/100
    </div>
  `).join('')}

  <h2>Top Priority Actions</h2>
  ${generateTopActions(auditData, scores).map(action => `
    <div class="action ${action.priority}">
      <h3>${action.title}</h3>
      <p>${action.description}</p>
      <p><strong>Expected Impact:</strong> ${action.impact}</p>
    </div>
  `).join('')}

  <hr>
  <p><small>Report generated by Local Website SEO Services | localwebsiteseoservices.com</small></p>
</body>
</html>
  `;
}
