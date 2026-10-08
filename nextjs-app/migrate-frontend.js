const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (content.includes('react-router-dom') || content.includes('useNavigate') || content.includes('useParams') || content.includes('react-redux')) {
    if (!content.includes('"use client"') && !content.includes("'use client'")) {
      content = '"use client";\n' + content;
    }
    changed = true;
  }

  if (content.includes('react-router-dom')) {
    content = content.replace(/useNavigate/g, 'useRouter');
    content = content.replace(/const navigate = useRouter\(\)/g, 'const router = useRouter()');
    content = content.replace(/navigate\(/g, 'router.push(');
    content = content.replace(/<Link to=/g, '<Link href=');
    
    content = content.replace(/import\s+{([^}]+)}\s+from\s+['"]react-router-dom['"];?/g, (match, imports) => {
        let newImports = [];
        const items = imports.split(',').map(i => i.trim());
        
        const navItems = items.filter(i => ['useRouter', 'useParams', 'usePathname', 'useSearchParams'].includes(i));
        if (navItems.length > 0) {
           newImports.push(`import { ${navItems.join(', ')} } from "next/navigation";`);
        }
        if (items.includes('Link')) {
           newImports.push(`import Link from "next/link";`);
        }
        return newImports.join('\n');
    });
    
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log("Updated", file);
  }
});
