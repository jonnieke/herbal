const fs = require('fs');
const path = require('path');

// Files to fix with their specific issues
const filesToFix = [
  {
    file: 'client/src/pages/home.tsx',
    fixes: [
      { pattern: /{wellnessCategories\.map\(\(category, index\) => \{/, replacement: '{wellnessCategories.map((category) => {' }
    ]
  },
  {
    file: 'client/src/pages/mental-health.tsx',
    fixes: [
      { pattern: /import.*Badge.*from.*@\/components\/ui\/badge.*\n/, replacement: '' },
      { pattern: /import.*Button.*from.*@\/components\/ui\/button.*\n/, replacement: '' },
      { pattern: /import.*Users.*from.*lucide-react.*\n/, replacement: '' },
      { pattern: /import.*BookOpen.*from.*lucide-react.*\n/, replacement: '' },
      { pattern: /import.*Lightbulb.*from.*lucide-react.*\n/, replacement: '' }
    ]
  },
  {
    file: 'client/src/pages/sleep.tsx',
    fixes: [
      { pattern: /import.*Button.*from.*@\/components\/ui\/button.*\n/, replacement: '' },
      { pattern: /import.*BookOpen.*from.*lucide-react.*\n/, replacement: '' },
      { pattern: /import.*Lightbulb.*from.*lucide-react.*\n/, replacement: '' },
      { pattern: /import.*Clock.*from.*lucide-react.*\n/, replacement: '' }
    ]
  },
  {
    file: 'client/src/pages/weight-balance.tsx',
    fixes: [
      { pattern: /import.*CardTitle.*from.*@\/components\/ui\/card.*\n/, replacement: '' },
      { pattern: /import.*Button.*from.*@\/components\/ui\/button.*\n/, replacement: '' },
      { pattern: /import.*Activity.*from.*lucide-react.*\n/, replacement: '' },
      { pattern: /import.*Brain.*from.*lucide-react.*\n/, replacement: '' },
      { pattern: /import.*TrendingDown.*from.*lucide-react.*\n/, replacement: '' },
      { pattern: /import.*Info.*from.*lucide-react.*\n/, replacement: '' },
      { pattern: /import.*Lightbulb.*from.*lucide-react.*\n/, replacement: '' },
      { pattern: /import.*BookOpen.*from.*lucide-react.*\n/, replacement: '' }
    ]
  },
  {
    file: 'client/src/pages/wellbeing.tsx',
    fixes: [
      { pattern: /import.*CardContent.*from.*@\/components\/ui\/card.*\n/, replacement: '' }
    ]
  }
];

function fixFile(filePath, fixes) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  fixes.forEach(fix => {
    content = content.replace(fix.pattern, fix.replacement);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  } else {
    console.log(`No changes needed: ${filePath}`);
  }
}

// Apply fixes
filesToFix.forEach(({ file, fixes }) => {
  fixFile(file, fixes);
});

console.log('TypeScript fixes applied!');
