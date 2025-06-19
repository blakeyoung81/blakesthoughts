#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get collection type (blog, poetry, projects)
const collectionType = process.argv[2];
if (!['blog', 'poetry', 'projects'].includes(collectionType)) {
  console.error('Error: First argument must be one of: blog, poetry, projects');
  console.log('Usage: npm run new blog "My Post Title"');
  process.exit(1);
}

// Get post title from command line arguments
const postTitle = process.argv[3];
if (!postTitle) {
  console.error('Error: Post title is required');
  console.log('Usage: npm run new blog "My Post Title"');
  process.exit(1);
}

// Create slug from title
const slug = postTitle
  .toLowerCase()
  .replace(/[^\w\s]/g, '')
  .replace(/\s+/g, '-');

// Get current date
const today = new Date();
const dateString = today.toISOString().split('T')[0];

// Create file path
const contentDir = path.join(process.cwd(), 'src', 'content', collectionType);
const filePath = path.join(contentDir, `${slug}.md`);

// Check if file already exists
if (fs.existsSync(filePath)) {
  console.error(`Error: File already exists: ${filePath}`);
  process.exit(1);
}

// Ask for description
rl.question('Enter a description (max 200 chars): ', (description) => {
  let frontmatter = `---
title: "${postTitle}"
description: "${description}"
pubDate: ${dateString}
`;

  // Add collection-specific frontmatter
  if (collectionType === 'projects') {
    rl.question('Enter repository URL: ', (repo) => {
      frontmatter += `repo: "${repo}"\n`;
      
      rl.question('Enter technologies (comma separated): ', (techString) => {
        const tech = techString.split(',').map(t => t.trim());
        frontmatter += `tech: ${JSON.stringify(tech)}\n`;
        
        rl.question('Enter live demo URL (optional): ', (liveDemo) => {
          if (liveDemo) {
            frontmatter += `liveDemo: "${liveDemo}"\n`;
          }
          
          finishCreatingFile(frontmatter);
        });
      });
    });
  } else {
    rl.question('Is this a draft? (y/N): ', (isDraft) => {
      if (isDraft.toLowerCase() === 'y') {
        frontmatter += 'draft: true\n';
      }
      finishCreatingFile(frontmatter);
    });
  }
  
  function finishCreatingFile(frontmatter) {
    // Complete the frontmatter
    frontmatter += '---\n\n';
    
    // Add template content based on collection type
    let content = '';
    if (collectionType === 'blog') {
      content = `# ${postTitle}\n\nWrite your blog post content here...\n`;
    } else if (collectionType === 'poetry') {
      content = `## ${postTitle}\n\nWrite your poem here...\n`;
    } else if (collectionType === 'projects') {
      content = `# ${postTitle}\n\n## Overview\n\nDescribe your project here...\n\n## Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n## Technical Details\n\nExplain the technical implementation...\n`;
    }
    
    // Write the file
    const fileContent = frontmatter + content;
    
    // Ensure directory exists
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, fileContent);
    console.log(`✅ Created new ${collectionType} post: ${filePath}`);
    rl.close();
  }
}); 